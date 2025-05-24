import { ConfigResults, goResult, QueryResult } from "../types/types";

const ABORT_TIME: number = 5000;

/**
 * Function for handling API queries. Throws error upon invalid query.
 * @param query Gene to be searched as HGNC symbol
 * @param configChoices ConfigResults object indicating user choices
 * @param addRecentQuery Adds query to recentQueries list
 * @param setLoading React setState function to indicate loading status
 * @param setIsError React setState function to indicate error
 * @param setQueryResult React setState function to set result of API call
 */
export async function onSearchPress(
  query: string,
  configChoices: ConfigResults,
  addRecentQuery: (query: string) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string | null>>,
  setQueryResult: React.Dispatch<React.SetStateAction<QueryResult>>
) {
  if (query) {
    setLoading(true);
    try {
      const fields = createQueryFields(configChoices);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), ABORT_TIME);

      const response = await fetch(
        `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      let data = await response.json();

      if (data.code && data.code === 400) {
        throw new Error("BAD_QUERY");
      }

      if (data.hits.length === 0) throw new Error("GENE_NOT_FOUND");

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("SERVER_ERROR");
        } else {
          throw new Error("UNKNOWN_ERROR");
        }
      }

      data = data.hits[0];

      let apiResult: QueryResult = {
        mirna: data.symbol.startsWith("MIR"),
        symbol: data.symbol,
      };

      Object.entries(configChoices).forEach(([key, value]) => {
        if (value) {
          // Handle result storage based on key
          switch (key) {
            case "symbol":
              const symbol: string = data?.symbol;
              apiResult.symbol = symbol ? symbol : "NOTFOUND";
              break;

            case "name":
              const name: string = data?.name;
              apiResult.name = ["Full gene name", name ? name : "NOTFOUND"];
              break;

            case "type":
              const type: string = data?.type_of_gene;
              apiResult.type = ["Gene type", type ? type : "NOTFOUND"];
              break;

            case "alternateNames":
              let alternateNames = data?.alias;
              if (alternateNames && !Array.isArray(alternateNames)) {
                alternateNames = [alternateNames];
              }
              apiResult.alternateNames = [
                "Aliases",
                alternateNames ? alternateNames.join(", ") : "NOTFOUND",
              ];
              break;

            case "ensemblID":
              const ensembl: string = data?.ensembl.gene;
              apiResult.ensemblID = [
                "Ensembl ID",
                ensembl ? ensembl : "NOTFOUND",
              ];
              break;

            case "summary":
              const summary: string = data?.summary;
              apiResult.summary = summary ? summary : "NOTFOUND";
              break;

            case "refseqGenomic":
              let refseqGenomic = data?.refseq?.genomic;
              if (refseqGenomic && !Array.isArray(refseqGenomic)) {
                refseqGenomic = [refseqGenomic];
              }
              apiResult.refseqGenomic = [
                "Refseq Genomic IDs",
                refseqGenomic ? refseqGenomic : null,
              ];
              break;

            case "refseqRNA":
              let refseqRNA = data?.refseq?.rna;
              if (refseqRNA && !Array.isArray(refseqRNA)) {
                refseqRNA = [refseqRNA];
              }
              apiResult.refseqRNA = [
                "Refseq RNA IDs",
                refseqRNA ? refseqRNA : null,
              ];
              break;

            case "refseqProtein":
              let refseqProtein = data?.refseq?.protein;
              if (refseqProtein && !Array.isArray(refseqProtein)) {
                refseqProtein = [refseqProtein];
              }
              apiResult.refseqProtein = [
                "Refseq Protein IDs",
                refseqProtein ? refseqProtein : null,
              ];
              break;

            case "goBP":
              let goBP: goResult[] = data.go?.BP;
              if (goBP) {
                if (!Array.isArray(goBP)) goBP = [goBP];
                const unique = new Set();
                const goDataUnique = goBP.filter((item) => {
                  if (unique.has(item.term)) return false;
                  unique.add(item.term);
                  return true;
                });
                apiResult.goBP = ["GO Biological Processes", goDataUnique];
              } else {
                apiResult.goBP = ["GO Biological Processes", []];
              }
              break;

            case "goCC":
              let goCC: goResult[] = data.go?.CC;
              if (goCC) {
                if (!Array.isArray(goCC)) goCC = [goCC];
                const unique = new Set();
                const goDataUnique = goCC.filter((item) => {
                  if (unique.has(item.term)) return false;
                  unique.add(item.term);
                  return true;
                });
                apiResult.goCC = ["GO Cellular Components", goDataUnique];
              } else {
                apiResult.goCC = ["GO Cellular Components", []];
              }
              break;

            case "goMF":
              let goMF: goResult[] = data.go?.MF;
              if (goMF) {
                if (!Array.isArray(goMF)) goMF = [goMF];
                const unique = new Set();
                const goDataUnique = goMF.filter((item) => {
                  if (unique.has(item.term)) return false;
                  unique.add(item.term);
                  return true;
                });

                // Need to rename "category" to "gocategory" to match CC and BP
                const renamed = goDataUnique.map(({ category, ...rest }) => ({
                  ...rest,
                  gocategory: category,
                }));

                apiResult.goMF = ["GO Molecular Functions", renamed];
              } else {
                apiResult.goMF = ["GO Molecular Functions", []];
              }
              break;
          }
        }
      });

      if (isBadResult(query, apiResult)) throw new Error("GENE_NOT_FOUND");
      addRecentQuery(query);
      setIsError(null);
      setQueryResult(apiResult);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setIsError(
            "Server is taking too long to respond. Please check your connection and try again. "
          );
        } else if (error.message === "GENE_NOT_FOUND") {
          setIsError(
            `Gene symbol ${query} was not found. Searches must be valid HGNC human gene symbols.`
          );
        } else if (error.message === "SERVER_ERROR") {
          setIsError("Server error. Please try again later.");
        } else if (error.message === "BAD_QUERY") {
          setIsError("Invalid query. Query cannot contain symbols.");
        } else {
          setIsError("Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  }
}

/**
 * Helper function used by API search to generate the fields
 * portion of the query by reading configChoices
 * @returns String for the fields portion of the URL
 */
function createQueryFields(configChoices: ConfigResults): string {
  let fields = "symbol,";
  let flag = true;
  Object.entries(configChoices).forEach(([key, value]) => {
    if (value) {
      if (["goBP", "goCC", "goMF"].includes(key) && flag) {
        fields += "go,";
        flag = false;
      } else {
        fields += `${fieldsForURL[key]},`;
      }
    }
  });
  fields = fields.slice(0, -1);
  return fields;
}

const fieldsForURL: { [key: string]: string } = {
  name: "name",
  type: "type_of_gene",
  alternateNames: "alias",
  ensemblID: "ensembl",
  summary: "summary",
  refseqGenomic: "refseq.genomic",
  refseqProtein: "refseq.protein",
  refseqRNA: "refseq.rna",
  goBP: "BP",
  goMF: "MF",
  goCC: "CC",
};

/**
 * Checks if the data returned for a query is actually the entry for query, or
 * was just returned by the API because it found the query somewhere in the
 * returned data. This happens when the searched query isn't a valid gene
 * symbol.
 * @param query
 * @param result
 * @returns
 */
function isBadResult(query: string, result: QueryResult): boolean {
  if (result.alternateNames) {
    return (
      result.symbol !== query.toUpperCase() &&
      !` ${result.alternateNames[1]},`.includes(` ${query.toUpperCase()},`)
    );
  } else {
    return result.symbol !== query;
  }
}

import { ConfigResults, goResult, QueryResult } from "../types/types";

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
    console.log(`Searching for ${query}`);
    setLoading(true);
    try {
      const fields = createQueryFields(configChoices);
      console.log(fields);
      console.log(
        `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`
      );
      const response = await fetch(
        `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      let data = await response.json();

      if (!response.ok) {
        console.log(response.status);
        if (response.status === 404) {
          throw new Error("GENE_NOT_FOUND");
        } else if (response.status >= 500) {
          throw new Error("SERVER_ERROR");
        } else {
          throw new Error("UNKNOWN_ERROR");
        }
      }
      console.log(data);
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
              apiResult.symbol = symbol ? symbol : "-";
              // console.log("SYMBOL: ", apiResult.symbol);
              break;

            case "name":
              const name: string = data?.name;
              apiResult.name = ["Full gene name", name ? name : "-"];
              // console.log("NAME: ", apiResult.name);
              break;

            case "type":
              const type: string = data?.type_of_gene;
              apiResult.type = ["Gene type", type ? type : "-"];
              // console.log("TYPE: ", apiResult.type);
              break;

            case "alternateNames":
              let alternateNames = data?.alias;
              if (alternateNames && !Array.isArray(alternateNames)) {
                alternateNames = [alternateNames];
              }
              apiResult.alternateNames = [
                "Aliases",
                alternateNames ? alternateNames.join(", ") : "-",
              ];
              // console.log("ALIAS: ", apiResult.alternateNames);
              break;

            case "ensembl":
              const ensembl: string = data?.ensembl.gene;
              apiResult.ensemblID = ["Ensembl ID", ensembl ? ensembl : "-"];
              // console.log("ENSEMBL: ", apiResult.ensemblID);
              break;

            case "summary":
              const summary: string = data?.summary;
              apiResult.summary = summary ? summary : "-";
              // console.log("SUMMARY: ");
              break;

            case "refseqGenomic":
              console.log("HERE");
              let refseqGenomic = data?.refseq?.genomic;
              if (refseqGenomic && !Array.isArray(refseqGenomic)) {
                refseqGenomic = [refseqGenomic];
              }
              apiResult.refseqGenomic = [
                "Refseq Genomic IDs",
                refseqGenomic ? refseqGenomic : null,
              ];
              // console.log("RSG: ", apiResult.refseqGenomic);
              break;

            case "refseqRNA":
              let refseqRNA = data?.refseq.rna;
              if (refseqRNA && !Array.isArray(refseqRNA)) {
                refseqRNA = [refseqRNA];
              }
              apiResult.refseqRNA = [
                "Refseq RNA IDs",
                refseqRNA ? refseqRNA : null,
              ];
              // console.log("RSR: ", apiResult.refseqRNA);
              break;

            case "refseqProtein":
              let refseqProtein = data?.refseq.protein;
              if (refseqProtein && !Array.isArray(refseqProtein)) {
                refseqProtein = [refseqProtein];
              }
              apiResult.refseqProtein = [
                "Refseq Protein IDs",
                refseqProtein ? refseqProtein : null,
              ];
              // console.log("RSP: ", apiResult.refseqProtein);
              break;

            case "goBP":
              let goBP: goResult[] = data.go?.BP;
              if (goBP) {
                const unique = new Set();
                const goDataUnique = goBP.filter((item) => {
                  if (unique.has(item.term)) return false;
                  unique.add(item.term);
                  return true;
                });
                apiResult.goBP = ["GO Biological Processes", goDataUnique];
                // console.log("GOBP: ", apiResult.goBP);
              } else {
                apiResult.goBP = ["NOTFOUND", []];
              }
              break;

            case "goCC":
              let goCC: goResult[] = data.go?.CC;
              if (goCC) {
                const unique = new Set();
                const goDataUnique = goCC.filter((item) => {
                  if (unique.has(item.term)) return false;
                  unique.add(item.term);
                  return true;
                });
                apiResult.goCC = ["GO Cellular Components", goDataUnique];
                // console.log("GOCC: ", apiResult.goCC);
              } else {
                apiResult.goCC = ["NOTFOUND", []];
              }
              break;

            case "goMF":
              let goMF: goResult[] = data.go?.MF;
              if (goMF) {
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
                // console.log("GOMF: ", apiResult.goMF);
              } else {
                apiResult.goMF = ["NOTFOUND", []];
              }
              break;
          }
        }
      });
      addRecentQuery(query);
      setIsError(null);
      setQueryResult(apiResult);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "GENE_NOT_FOUND") {
          setIsError("Gene not found. Please check the name and try again.");
        } else if (error.message === "SERVER_ERROR") {
          setIsError(
            "Server is currently unavailable. Please try again later."
          );
        } else if (error.message === "Network request failed") {
          setIsError("Network error. Check your internet connection.");
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

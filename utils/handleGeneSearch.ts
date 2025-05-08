import { ConfigResults, QueryResult } from "../types/types";

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
  setQueryResult: React.Dispatch<React.SetStateAction<QueryResult | null>>
) {
  if (query) {
    setLoading(true);
    try {
      const fields = createQueryFields(configChoices);
      console.log(fields);
      const response = await fetch(
        `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`
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

      data = data.hits[0];

      let apiResult: QueryResult = {
        symbol: data.symbol,
      };
      Object.entries(configChoices).forEach(([key, value]) => {
        if (value) {
          if (["goBP", "goCC", "goMF"].includes(key)) {
            apiResult[key] = data.go[fieldsForURL[key]];
          } else if (key === "ensemblID") {
            apiResult[key] = data.ensembl.gene;
          } else if (
            ["refseqGenomic", "refseqProtein", "refseqRNA"].includes(key)
          ) {
            const safeKey = key.slice(6).toLowerCase();
            let ids = data.refseq[safeKey];
            Array.isArray(ids)
              ? (apiResult[key] = ids)
              : (apiResult[key] = [ids]);
          } else if (
            key === "alternateNames" &&
            !Array.isArray(data[fieldsForURL[key]])
          ) {
            apiResult[key] = data[fieldsForURL[key]]
              ? [data[fieldsForURL[key]]]
              : ["No aliases"];
          } else {
            apiResult[key] = data[fieldsForURL[key]];
          }
        }
      });

      addRecentQuery(query);
      setIsError(null);
      setQueryResult(apiResult);
    } catch (error: unknown) {
      console.log("error");
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

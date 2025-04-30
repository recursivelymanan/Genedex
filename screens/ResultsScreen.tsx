import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";

import { QueryResult } from "../types/types";
import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRecentQueries } from "../context/RecentQueryContext";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { query } = route.params;
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { addRecentQuery } = useRecentQueries();

  /*-----
  Effects
  -----*/

  useEffect(() => {
    onSearchPress();
  }, [query]);

  /*---------------
  Handler Functions
  ---------------*/

  /**
   * Function for handling API queries. Throws error upon invalid query.
   */
  const onSearchPress = async () => {
    if (query) {
      setLoading(true);
      setTimeout(async () => {
        try {
          console.log("Hello");
          const response = await fetch(
            `https://mygene.info/v3/query?q=${query}&fields=symbol,alias,summary,name,ensembl.gene&species=human`
          );
          let data = await response.json();
          data = data.hits[0];

          const apiResult: QueryResult = {
            geneSymbol: data.symbol,
            geneName: data.name,
            geneAlternateNames: data.alias,
            geneEnsemblID: data.ensembl.gene,
            geneSummary: data.summary,
          };

          addRecentQuery(query);
          setError(null);
          setQueryResult(apiResult);
        } catch (error) {
          console.error("Error fetching gene data: ", error);
          setError("Invalid gene symbol, please try again.");
        } finally {
          setLoading(false);
        }
      }, 2000);
    }
  };

  /*----
  Render
  ----*/
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Text>{error as string}</Text>
  ) : queryResult ? (
    <SearchResults results={queryResult} />
  ) : null;
};

export default ResultsScreen;

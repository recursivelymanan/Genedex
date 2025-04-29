import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { QueryResult } from "./types/QueryResult";
import GeneSearch from "./components/GeneSearch/GeneSearch";
import SearchResults from "./components/SearchResults/SearchResults";

const App = () => {
  /*----
  States
  ----*/

  const [query, setQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /*------------
  Event Handlers
  ------------*/

  /**
   * Function for handling API queries. Throws error upon invalid query.
   */
  const onSearchPress = async () => {
    if (query) {
      try {
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

        setError(null);
        setQueryResult(apiResult);
      } catch (error) {
        console.error("Error fetching gene data: ", error);
        setError("Invalid gene symbol, please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <GeneSearch query={query} onChangeQuery={setQuery} />
      <Button onPress={onSearchPress} title="Search" />
      {error ? (
        <Text>{error as string}</Text>
      ) : queryResult ? (
        <SearchResults results={queryResult} />
      ) : null}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});

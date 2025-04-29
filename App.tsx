import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { QueryResult } from "./types/QueryResult";
import GeneSearch from "./components/GeneSearch/GeneSearch";
import SearchResults from "./components/SearchResults/SearchResults";

const App = () => {
  /*----
  States
  ----*/

  const [query, setQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<QueryResult>({
    geneName: "",
    geneAlternateNames: [],
    geneEnsemblID: "",
    geneSummary: "Hello",
  });

  /*------------
  Event Handlers
  ------------*/

  const onSearchPress = () => {
    // API call
  };

  return (
    <>
      <View style={styles.container}>
        <GeneSearch query={query} onChangeQuery={setQuery} />
        <Button onPress={onSearchPress} title="Search" />
        <SearchResults results={queryResult} />
      </View>
    </>
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

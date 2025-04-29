import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

interface GeneSearchProps {
  query: string;
  onChangeQuery: (query: string) => void;
}

const GeneSearch: React.FC<GeneSearchProps> = ({ query, onChangeQuery }) => {
  return (
    <TextInput
      style={styles.searchBar}
      onChangeText={onChangeQuery}
      value={query}
      placeholder="Search by Gene Symbol ..."
    />
  );
};

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    height: screenHeight * 0.1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: screenHeight * 0.25,
    fontSize: 25,
  },
});

export default GeneSearch;

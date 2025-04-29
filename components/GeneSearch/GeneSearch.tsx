import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

interface GeneSearchProps {
  query: string;
  onChangeQuery: (query: string) => void;
  onSearch: () => void;
}

const GeneSearch: React.FC<GeneSearchProps> = ({
  query,
  onChangeQuery,
  onSearch,
}) => {
  return (
    <TextInput
      style={styles.searchBar}
      onChangeText={onChangeQuery}
      value={query}
      placeholder="Search by Gene Symbol ..."
      returnKeyType="search"
      onSubmitEditing={onSearch}
      autoCapitalize="characters"
      autoFocus
    />
  );
};

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    height: screenHeight * 0.05,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    marginTop: screenHeight * 0.1,
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
  },
});

export default GeneSearch;

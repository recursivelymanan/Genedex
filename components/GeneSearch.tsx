import React from "react";
import { TextInput } from "react-native";
import { geneSearchStyles as styles } from "../styles/styles";

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
      accessibilityLabel="HGNC gene symbol search input"
      autoFocus
    />
  );
};

export default GeneSearch;

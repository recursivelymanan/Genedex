import React from "react";
import { View, Text } from "react-native";
import { QueryResult } from "../../types/QueryResult";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const displayQueryResult = (): string => {
    return "Sample Result";
  };
  return (
    <View>
      <Text>{displayQueryResult()}</Text>
    </View>
  );
};

export default SearchResults;

import React from "react";
import { View, Text } from "react-native";
import { QueryResult } from "../types/types";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <View>
      {Object.entries(results).map(([key, value], ind) => (
        <Text key={`${key}-${ind}`}>
          {key}: {Array.isArray(value) ? value.join(", ") : String(value)}
        </Text>
      ))}
    </View>
  );
};

export default SearchResults;

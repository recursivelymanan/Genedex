import React from "react";
import { View, Text } from "react-native";
import { QueryResult } from "../../types/QueryResult";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const displayQueryResult = (): string[][] => {
    return [
      [results.geneSymbol],
      [results.geneName],
      results.geneAlternateNames,
      [results.geneSummary],
    ];
  };
  return (
    <View>
      {displayQueryResult().map((field, i) => (
        <Text key={`${field}-${i}`}>{field}</Text>
      ))}
    </View>
  );
};

export default SearchResults;

// field.length > 1 ? (
//   field.map((alias, j) => <Text key={`${alias}-${j}`}>{alias}</Text>)
// ) : (

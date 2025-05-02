import React from "react";
import { View, Text, ScrollView } from "react-native";

import { QueryResult } from "../types/types";
import { styles } from "../styles/styles";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <View style={styles.hhContainer}>
          <Text style={styles.hhText}>{results.symbol}</Text>
        </View>

        {/* NAME FIELD */}

        {results.name ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText}>{results.name}</Text>
            </View>
          </View>
        ) : null}

        {/* ENSEMBL FIELD */}

        {results.ensemblID ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText}>{results.ensemblID}</Text>
            </View>
          </View>
        ) : null}

        {/* TYPE FIELD */}

        {results.type ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText}>{results.type}</Text>
            </View>
          </View>
        ) : null}

        {/* ALIASES FIELD */}

        {results.alternateNames ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 20 }}>
              <Text style={styles.hText}>Aliases</Text>
            </View>
            <View style={styles.bContainer}>
              <Text style={styles.bText}>
                {results.alternateNames.join(", ")}
              </Text>
            </View>
          </View>
        ) : null}

        {/* SUMMARY */}

        {results.summary ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, marginTop: 25 }}>
              <Text style={styles.bText}>{results.summary}</Text>
            </View>
          </View>
        ) : null}

        {Object.entries(results).map(([key, value], ind) => (
          <Text key={`${key}-${ind}`}>
            {key}: {Array.isArray(value) ? value.join(", ") : String(value)}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResults;

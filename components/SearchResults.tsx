import React from "react";
import { View, Text, ScrollView } from "react-native";

import { QueryResult } from "../types/types";
import { styles } from "../styles/styles";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { configChoices } = useResultsConfiguration();
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

        {/* GO BP  */}

        {configChoices.goBP && results.goBP ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.goBP.length} GO BP hits were found`}</Text>
            </View>
          </View>
        ) : null}

        {/* GO CC */}

        {configChoices.goCC && results.goCC ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.goCC.length} GO CC hits were found`}</Text>
            </View>
          </View>
        ) : null}

        {/* GO MF */}

        {configChoices.goMF && results.goMF ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.goMF.length} GO MF hits were found`}</Text>
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

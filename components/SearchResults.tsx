import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import { QueryResult } from "../types/types";
import { styles } from "../styles/styles";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { configChoices } = useResultsConfiguration();

  const onPress = () => {
    const url = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${results.symbol}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <TouchableOpacity onPress={() => onPress()}>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={styles.hhContainer}>
              <Text style={styles.hhText} selectable>
                {results.symbol}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* NAME FIELD */}

        {results.name ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText} selectable>
                {results.name}
              </Text>
            </View>
          </View>
        ) : null}

        {/* ENSEMBL FIELD */}

        {results.ensemblID ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText} selectable>
                {results.ensemblID}
              </Text>
            </View>
          </View>
        ) : null}

        {/* TYPE FIELD */}

        {results.type ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.bContainer, padding: 11 }}>
              <Text style={styles.bText} selectable>
                {results.type}
              </Text>
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
              <Text style={styles.bText} selectable>
                {results.alternateNames.join(", ")}
              </Text>
            </View>
          </View>
        ) : null}

        {/* SUMMARY */}

        {results.summary ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View
              style={{
                ...styles.bContainer,
                marginTop: 25,
                backgroundColor: "#b1c9f0",
              }}
            >
              <Text style={styles.bText} selectable>
                {results.summary}
              </Text>
            </View>
          </View>
        ) : null}

        {/* REFSEQ GENOMIC */}

        {results.refseqGenomic ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.refseqGenomic.length} RSG hits were found`}</Text>
            </View>
          </View>
        ) : null}

        {/* REFSEQ RNA */}

        {results.refseqRNA ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.refseqRNA.length} RSR hits were found`}</Text>
            </View>
          </View>
        ) : null}

        {/* REFSEQ PROT */}

        {results.refseqProtein ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`${results.refseqProtein.length} RSP hits were found`}</Text>
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
      </View>
    </ScrollView>
  );
};

export default SearchResults;

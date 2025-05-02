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
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SearchResultsProps {
  results: QueryResult;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { configChoices } = useResultsConfiguration();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressSymbol = () => {
    const url = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${results.symbol}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const onPressRSG = () => {
    nav.navigate("MoreData", { data: "rsG", refseqIDs: results.refseqGenomic });
  };

  const onPressRSR = () => {
    nav.navigate("MoreData", {
      data: "rsR",
      refseqIDs: results.refseqRNA,
    });
  };

  const onPressRSP = () => {
    nav.navigate("MoreData", { data: "rsP", refseqIDs: results.refseqProtein });
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <TouchableOpacity onPress={() => onPressSymbol()}>
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
          <TouchableOpacity onPress={onPressRSG}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <View style={{ ...styles.hContainer, marginTop: 25 }}>
                <Text
                  style={styles.hText}
                >{`Tap to see ${results.refseqGenomic.length} Refseq genomic IDs`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* REFSEQ RNA */}

        {results.refseqRNA ? (
          <TouchableOpacity onPress={onPressRSR}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <View
                style={{
                  ...styles.hContainer,
                  marginTop: 25,
                }}
              >
                <Text
                  style={styles.hText}
                >{`Tap to see ${results.refseqRNA.length} Refseq\u2002\u2002 RNA IDs`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* REFSEQ PROT */}

        {results.refseqProtein ? (
          <TouchableOpacity onPress={onPressRSP}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <View style={{ ...styles.hContainer, marginTop: 25 }}>
                <Text
                  style={styles.hText}
                >{`Tap to see ${results.refseqProtein.length} Refseq protein IDs`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* GO BP  */}

        {configChoices.goBP && results.goBP ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`Tap to see ${results.goBP.length} GO BPs`}</Text>
            </View>
          </View>
        ) : null}

        {/* GO CC */}

        {configChoices.goCC && results.goCC ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`Tap to see ${results.goCC.length} GO CCs`}</Text>
            </View>
          </View>
        ) : null}

        {/* GO MF */}

        {configChoices.goMF && results.goMF ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ ...styles.hContainer, marginTop: 25 }}>
              <Text
                style={styles.hText}
              >{`Tap to see ${results.goMF.length} GO MFs`}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default SearchResults;

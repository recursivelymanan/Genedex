import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";

import { ConfigResults, QueryResult } from "../types/types";
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

  console.log(results);

  const onPressSymbol = () => {
    const url = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${results.symbol}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View>
        <TouchableOpacity onPress={() => onPressSymbol()}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                ...styles.hhContainer,
                backgroundColor: "#b1c9f0",
                marginBottom: 20,
              }}
            >
              <Text style={styles.hhText} selectable>
                {results.symbol}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* NAME FIELD */}

        {configChoices.name && results.name ? (
          <View style={styles.resultsEntryContainer}>
            <View style={styles.resultsEntryLabelContainer}>
              <Text style={styles.resultsEntryLabelText}>Full gene name</Text>
            </View>
            <View style={styles.resultsEntryDataContainer}>
              <Text style={styles.resultsEntryDataText} selectable>
                {results.name}
              </Text>
            </View>
          </View>
        ) : null}

        {/* ENSEMBL FIELD */}

        {configChoices.ensemblID && results.ensemblID ? (
          <View style={styles.resultsEntryContainer}>
            <View style={styles.resultsEntryLabelContainer}>
              <Text style={styles.resultsEntryLabelText}>Ensembl ID</Text>
            </View>
            <View style={styles.resultsEntryDataContainer}>
              <Text style={styles.resultsEntryDataText} selectable>
                {results.ensemblID}
              </Text>
            </View>
          </View>
        ) : null}

        {/* TYPE FIELD */}

        {configChoices.type && results.type ? (
          <View style={styles.resultsEntryContainer}>
            <View style={styles.resultsEntryLabelContainer}>
              <Text style={styles.resultsEntryLabelText}>Gene type</Text>
            </View>
            <View style={styles.resultsEntryDataContainer}>
              <Text style={styles.resultsEntryDataText} selectable>
                {results.type}
              </Text>
            </View>
          </View>
        ) : null}

        {/* ALIASES FIELD */}

        {configChoices.alternateNames && results.alternateNames ? (
          <View style={styles.resultsEntryContainer}>
            <View style={styles.resultsEntryLabelContainer}>
              <Text style={styles.resultsEntryLabelText}>Aliases</Text>
            </View>
            <View style={styles.resultsEntryDataContainer}>
              <Text style={styles.resultsEntryDataText} selectable>
                {results.alternateNames.join(", ")}
              </Text>
            </View>
          </View>
        ) : null}

        {/* SUMMARY */}

        {configChoices.summary && results.summary ? (
          <View
            style={{
              ...styles.resultsEntryContainer,
              marginTop: 15,
              marginBottom: 23,
            }}
          >
            {/* <View style={{ ...styles.resultsEntryLabelContainer, width: 90 }}>
              <Text style={styles.resultsEntryLabelText}>Summary</Text>
            </View> */}
            <View
              style={{
                ...styles.resultsEntryDataContainer,
                paddingRight: 0,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ ...styles.resultsEntryDataText, textAlign: "auto" }}
                selectable
              >
                {results.summary}
              </Text>
            </View>
          </View>
        ) : null}

        {/* REFSEQ GENOMIC */}

        {configChoices.refseqGenomic && results.refseqGenomic ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "rsG",
                refseqIDs: results.refseqGenomic,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View
                style={{ ...styles.resultsEntryLabelContainer, width: 200 }}
              >
                <Text style={styles.resultsEntryLabelText}>
                  {`Refseq Genomic ID${
                    results.refseqGenomic.length > 1 ? "s" : ""
                  }`}
                </Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.refseqGenomic.length
                } Refseq genomic ID${
                  results.refseqGenomic.length > 1 ? "s" : ""
                }`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* REFSEQ RNA */}

        {configChoices.refseqRNA && results.refseqRNA ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "rsR",
                refseqIDs: results.refseqRNA,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View
                style={{ ...styles.resultsEntryLabelContainer, width: 200 }}
              >
                <Text style={styles.resultsEntryLabelText}>{`Refseq RNA ID${
                  results.refseqRNA.length > 1 ? "s" : ""
                }`}</Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.refseqRNA.length
                } Refseq RNA ID${
                  results.refseqRNA.length > 1 ? "s" : ""
                }`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* REFSEQ PROT */}

        {configChoices.refseqProtein && results.refseqProtein ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "rsP",
                refseqIDs: results.refseqProtein,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View
                style={{ ...styles.resultsEntryLabelContainer, width: 200 }}
              >
                <Text style={styles.resultsEntryLabelText}>
                  {`Refseq Protein ID${
                    results.refseqProtein.length > 1 ? "s" : ""
                  }`}
                </Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.refseqProtein.length
                } Refseq protein ID${
                  results.refseqProtein.length > 1 ? "s" : ""
                }`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* GO BP  */}

        {configChoices.goBP && results.goBP ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "goBP",
                goResults: results.goBP,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View style={styles.resultsEntryLabelContainer}>
                <Text style={styles.resultsEntryLabelText}>
                  {`GO Biological Process${
                    results.goBP.length > 1 ? "es" : ""
                  }`}
                </Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.goBP.length
                } GO BP${results.goBP.length > 1 ? "s" : ""}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* GO CC */}

        {configChoices.goCC && results.goCC ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "goCC",
                goResults: results.goCC,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View style={styles.resultsEntryLabelContainer}>
                <Text style={styles.resultsEntryLabelText}>
                  {`GO Cellular Component${results.goCC.length > 1 ? "s" : ""}`}
                </Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.goCC.length
                } GO CC${results.goCC.length > 1 ? "s" : ""}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* GO MF */}

        {configChoices.goMF && results.goMF ? (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MoreData", {
                data: "goMF",
                goResults: results.goMF,
              })
            }
          >
            <View style={styles.resultsEntryContainer}>
              <View style={styles.resultsEntryLabelContainer}>
                <Text style={styles.resultsEntryLabelText}>
                  {`GO Molecular Function${results.goMF.length > 1 ? "s" : ""}`}
                </Text>
              </View>
              <View style={styles.resultsEntryDataContainer}>
                <Text style={styles.resultsEntryDataText}>{`Tap to see ${
                  results.goMF.length
                } GO MF${results.goMF.length > 1 ? "s" : ""}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        <View>
          <Button
            onPress={() => nav.navigate("Config")}
            title="Configure which results you see"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchResults;

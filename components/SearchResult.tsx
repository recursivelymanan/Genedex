import React from "react";
import { goResult } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

interface SearchResultProps {
  title: string | false;
  result: string;
  go?: goResult[];
  refseq?: string[];
}

const SearchResult: React.FC<SearchResultProps> = ({
  title,
  result,
  go,
  refseq,
}) => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pressable: boolean = title
    ? title.slice(0, 2) === "GO" || title.slice(0, 6) === "Refseq"
      ? true
      : false
    : false;

  return pressable ? (
    <TouchableOpacity
      onPress={
        go
          ? () =>
              nav.navigate("MoreData", {
                goResults: go,
              })
          : refseq
          ? () =>
              nav.navigate("MoreData", {
                refseqIDs: refseq,
              })
          : () => null
      }
      disabled={go ? false : refseq ? false : true}
    >
      <View style={styles.resultsEntryContainer}>
        <View style={styles.resultsEntryLabelContainer}>
          <Text style={styles.resultsEntryLabelText}>{title}</Text>
        </View>
        <View style={styles.resultsEntryDataContainer}>
          <Text style={styles.resultsEntryDataText}>
            {go
              ? `Tap to see ${go.length} result${go.length > 1 ? "s" : ""}`
              : refseq
              ? `Tap to see ${refseq.length} result${
                  refseq.length > 1 ? "s" : ""
                }`
              : "No IDs found"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={
        title
          ? styles.resultsEntryContainer
          : styles.resultsEntryContainerSummary
      }
    >
      {title ? (
        <View style={styles.resultsEntryLabelContainer}>
          <Text style={styles.resultsEntryLabelText}>{title}</Text>
        </View>
      ) : null}
      <View
        style={
          title
            ? styles.resultsEntryDataContainer
            : styles.resultsEntryDataContainerSummary
        }
      >
        <Text
          style={
            title
              ? styles.resultsEntryDataText
              : styles.resultsEntryDataTextSummary
          }
          selectable
        >
          {result}
        </Text>
      </View>
    </View>
  );
};

export default SearchResult;

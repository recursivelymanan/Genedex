import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

import { useResultsConfiguration } from "../context/ResultsConfigurationContext";

const ConfigureResults = () => {
  const { configChoices, setConfigChoices } = useResultsConfiguration();

  const onCheckboxToggle = (key: string, value: boolean) => {
    setConfigChoices((prev) => ({
      ...prev,
      [key]: !value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      {Object.entries(configChoices).map(([key, value]) => (
        <View
          key={`${key}-view`}
          style={value ? styles.settingOn : styles.settingOff}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onCheckboxToggle(key, value)}
          >
            <Checkbox.Item
              key={key}
              label={prettyNames[key]}
              labelStyle={value ? null : { color: "#686a6e" }}
              status={value ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ConfigureResults;

const prettyNames: { [key: string]: string } = {
  name: "Full gene name",
  type: "Gene type",
  alternateNames: "Gene aliases",
  ensemblID: "Ensembl ID",
  summary: "Gene summary",
  refseqGenomic: "NCBI Genomic RefSeq ID",
  refseqProtein: "NCBI Protein RefSeq ID",
  refseqRNA: "NCBI RNA RefSeq ID",
  geneCard: "Genecard link",
  goBP: "Gene Ontology (BP)",
  goMF: "Gene Ontology (MF)",
  goCC: "Gene Ontology (CC",
};

const styles = StyleSheet.create({
  settingOn: {
    backgroundColor: "#b1c9f0",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    margin: 5,
  },
  settingOff: {
    backgroundColor: "#c7d7f0",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    margin: 5,
  },
});

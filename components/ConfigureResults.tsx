import React from "react";
import { View, ScrollView, TouchableOpacity, Button } from "react-native";
import { Checkbox } from "react-native-paper";

import {
  allTrueFields,
  defaultFields,
  useResultsConfiguration,
} from "../context/ResultsConfigurationContext";

import { configStyles as styles } from "../styles/styles";

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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button
          onPress={() => {
            setConfigChoices(allTrueFields);
          }}
          title="Select All"
        />
        <Button
          onPress={() => {
            setConfigChoices(defaultFields);
          }}
          title="Reset to default"
        />
      </View>
      {Object.entries(configChoices).map(([key, value]) => (
        <View
          key={`${key}-view`}
          style={value ? styles.settingOn : styles.settingOff}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onCheckboxToggle(key, value)}
            accessibilityRole="checkbox"
            accessibilityLabel={`${prettyNames[key]} ${
              value ? "checked" : "not checked"
            }`}
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
  goBP: "Gene Ontology (BP)",
  goMF: "Gene Ontology (MF)",
  goCC: "Gene Ontology (CC)",
};

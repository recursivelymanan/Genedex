import React from "react";
import { Text } from "react-native";
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

  return Object.entries(configChoices).map(([key, value]) => (
    <Checkbox.Item
      key={key}
      label={prettyNames[key]}
      status={value ? "checked" : "unchecked"}
      onPress={() => onCheckboxToggle(key, value)}
    />
  ));
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

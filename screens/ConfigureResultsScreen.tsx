import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ConfigureResults from "../components/ConfigureResults";

const CONFIG_SCREEN_MSG =
  "Select which fields you would like to see when searching for a gene.";

const ConfigureResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.helpText}>{CONFIG_SCREEN_MSG}</Text>
      <ConfigureResults />
    </View>
  );
};

export default ConfigureResultsScreen;

const styles = StyleSheet.create({
  container: { paddingTop: 15 },
  helpText: { textAlign: "center", fontSize: 20 },
});

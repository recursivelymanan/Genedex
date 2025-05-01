import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import ConfigureResults from "../components/ConfigureResults";
import Header from "../components/Header";

const ConfigureResultsScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title="Results Settings" />
        <ConfigureResults />
      </View>
    </SafeAreaView>
  );
};

export default ConfigureResultsScreen;

const styles = StyleSheet.create({
  container: { paddingTop: 15 },
  helpText: { textAlign: "center", fontSize: 20 },
});

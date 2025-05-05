import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import ConfigureResults from "../components/ConfigureResults";
import Header from "../components/Header";

const ConfigureResultsScreen = () => {
  /*----
  Render
  ----*/
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title="Results Settings" github={false} />
        <ConfigureResults />
      </View>
    </SafeAreaView>
  );
};

export default ConfigureResultsScreen;

/*----
Styles
----*/
const styles = StyleSheet.create({
  container: { paddingTop: 15 },
  helpText: { textAlign: "center", fontSize: 20 },
});

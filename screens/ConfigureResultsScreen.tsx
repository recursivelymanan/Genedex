import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ConfigureResults from "../components/ConfigureResults";
import BackToHomeButton from "../components/buttons/BackToHomeButton";
import InfoButton from "../components/buttons/InfoButton";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const CONFIG_SCREEN_MSG =
  "Select which fields you would like to see when searching for a gene.";

const ConfigureResultsScreen = () => {
  const nav = useNavigation();

  const onPress = () => {
    nav.goBack();
  };
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

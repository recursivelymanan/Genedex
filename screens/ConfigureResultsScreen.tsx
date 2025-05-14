import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import ConfigureResults from "../components/ConfigureResults";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const ConfigureResultsScreen = () => {
  const nav = useNavigation();
  /*----
  Render
  ----*/
  return (
    <SafeAreaView>
      <Header
        title="Results Settings"
        leftButton={
          <Button
            button={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
      />
      <ConfigureResults />
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

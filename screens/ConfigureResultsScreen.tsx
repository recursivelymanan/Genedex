import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import ResultsConfiguration from "../components/ResultsConfiguration";
import Header from "../components/Header";
import Button from "../components/Button";

const ConfigureResultsScreen = () => {
  const nav = useNavigation();

  return (
    <SafeAreaView>
      <Header
        title="Results Settings"
        leftButton={
          <Button
            children={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
      />
      <ResultsConfiguration />
    </SafeAreaView>
  );
};

export default ConfigureResultsScreen;

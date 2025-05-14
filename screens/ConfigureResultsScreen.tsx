import React from "react";
import { SafeAreaView } from "react-native";
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
            children={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
      />
      <ConfigureResults />
    </SafeAreaView>
  );
};

export default ConfigureResultsScreen;

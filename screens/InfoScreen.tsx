import React from "react";
import { Text } from "react-native";
import BackToHomeButton from "../components/buttons/BackToHomeButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoScreen = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView>
      <BackToHomeButton onPress={() => nav.goBack()} />
      <Text>Help message!</Text>
    </SafeAreaView>
  );
};

export default InfoScreen;

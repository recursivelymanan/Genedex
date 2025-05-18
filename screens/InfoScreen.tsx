import React from "react";
import { Linking, ScrollView, View, Text } from "react-native";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Header from "../components/Header";
import Button from "../components/Button";
import InfoSection from "../components/InfoSection";
import { infoTextList } from "../content/infoScreenText";
import { SafeAreaView } from "react-native-safe-area-context";

const version = Constants.expoConfig?.extra?.appVersion || "unknown";

const InfoScreen = () => {
  const nav = useNavigation();

  const onInfoPress = () => {
    const url = `https://github.com/recursivelymanan/PocketGene`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header
          title="Info"
          leftButton={
            <Button
              children={<AntDesign name="back" size={35} color="black" />}
              onPress={() => nav.goBack()}
            />
          }
          rightButton={
            <Button
              children={<AntDesign name="github" size={35} />}
              onPress={onInfoPress}
            />
          }
        />
        <Text
          style={{ alignSelf: "center", marginBottom: 10 }}
        >{`App version ${version}`}</Text>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200, marginBottom: 20 }}
        >
          <View style={{ justifyContent: "center" }}>
            {infoTextList.map((section) => (
              <InfoSection
                key={`is-${section.title}`}
                title={section.title}
                body={section.body}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

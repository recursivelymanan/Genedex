import React from "react";
import { Linking, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Header from "../components/Header";
import Button from "../components/Button";
import InfoSection from "../components/InfoSection";

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
          <InfoSection
            title={"Welcome to PocketGene!"}
            body={
              "To get started, head back to the home screen and type in a valid HGNC gene symbol. When you hit search, you'll see the results for that gene. If you want to configure what you see on the results page, tap on the wrench symbol above the search bar to customize your results.\n\nTo learn more about the app, tap on the headers below. "
            }
            startExpand={true}
          />
          <InfoSection
            title={"Managing favorites"}
            body={
              "To get started, head back to the home screen and type in a valid HGNC gene symbol. When you hit search, you'll see the results for that gene. If you want to configure what you see on the results page, tap on the wrench symbol above the search bar to customize your results."
            }
          />
          <InfoSection
            title={"Support"}
            body={
              "If you encounter any bugs or issues with the app, please report them by opening a new issue on this app's GitHub repo (link on the top right of this page) or by sending an email to pocketgene@gmail.com"
            }
          />
          <InfoSection
            title={"Data Sources"}
            body={
              "Gene annotations provided by MyGene.info, maintained by The Scripps Research Institute. Data is provided as-is. MyGene.info also pulls data from other third party sources. \n\nFor some genes, certain data points may be unavailable. You can always check the GeneCards page for a gene by tapping on the gene symbol."
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;

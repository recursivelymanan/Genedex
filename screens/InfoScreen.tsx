import React from "react";
import { Linking, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Header from "../components/Header";
import { infoScreenStyles as styles } from "../styles/styles";
import Button from "../components/Button";

const InfoScreen = () => {
  const nav = useNavigation();

  const onInfoPress = () => {
    const url = `https://github.com/recursivelymanan/PocketGene`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView>
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
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <View style={styles.infoHeaderContainer}>
          <Text style={styles.infoHeaderText}>Welcome to PocketGene!</Text>
        </View>
        <View style={{ ...styles.infoBodyContainer, marginBottom: 30 }}>
          <Text style={styles.infoBodyText}>
            To get started, head back to the home screen and type in a valid
            HGNC gene symbol. When you hit search, you'll see the results for
            that gene. If you want to configure what you see on the results
            page, tap on the wrench symbol above the search bar to customize
            your results.
          </Text>
        </View>
        <View style={styles.infoHeaderContainer}>
          <Text style={styles.infoHeaderText}>Managing favorites</Text>
        </View>
        <View style={{ ...styles.infoBodyContainer, marginBottom: 30 }}>
          <Text style={styles.infoBodyText}>
            Save your favorite genes by tapping the star above the search
            results. Favorited genes can be accessed from the home page to make
            searches quicker!
          </Text>
        </View>
        <View style={styles.infoHeaderContainer}>
          <Text style={styles.infoHeaderText}>About PocketGene</Text>
        </View>
        <View style={{ ...styles.infoBodyContainer, marginBottom: 30 }}>
          <Text style={styles.infoBodyText}>
            PocketGene was developed to make gene searches easier! Gene
            annotations provided by MyGene.info, maintained by The Scripps
            Research Institute. Data is provided as-is.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

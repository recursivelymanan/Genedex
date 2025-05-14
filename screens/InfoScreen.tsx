import React from "react";
import { Linking, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Header from "../components/Header";
import { styles } from "../styles/styles";
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
            button={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
        rightButton={
          <Button
            button={<AntDesign name="github" size={35} />}
            onPress={onInfoPress}
          />
        }
      />
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <View style={styles.hContainer}>
          <Text style={styles.hText}>Welcome to PocketGene!</Text>
        </View>
        <View style={{ ...styles.bContainer, marginBottom: 30 }}>
          <Text style={styles.bText}>
            To get started, head back to the home screen and type in a valid
            HGNC gene symbol. When you hit search, you'll see the results for
            that gene. If you want to configure what you see on the results
            page, tap on the wrench symbol above the search bar to customize
            your results.
          </Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.hText}>Managing favorites</Text>
        </View>
        <View style={{ ...styles.bContainer, marginBottom: 30 }}>
          <Text style={styles.bText}>
            Save your favorite genes by tapping the star above the search
            results. Favorited genes can be accessed from the home page to make
            searches quicker!
          </Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.hText}>About PocketGene</Text>
        </View>
        <View style={{ ...styles.bContainer, marginBottom: 30 }}>
          <Text style={styles.bText}>
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

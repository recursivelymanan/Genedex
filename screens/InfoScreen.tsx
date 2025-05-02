import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import { styles } from "../styles/styles";

const InfoScreen = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView>
      <Header title="Info" />
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
            PocketGene was developed by Manan Chopra to make gene searches
            easier! It is powered by the mygene.info API and written entirely in
            TypeScript with React-Native.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BackToHomeButton from "../components/buttons/BackToHomeButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const InfoScreen = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView>
      <Header title="Info" />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to PocketGene!</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            To get started, head back to the home screen and type in a valid
            HGNC gene symbol. When you hit search, you'll see the results for
            that gene. If you want to configure what you see on the results
            page, tap on the wrench symbol above the search bar to customize
            your results.
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Managing favorites</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Save your favorite genes by tapping the star above the search
            results. Favorited genes can be accessed from the home page to make
            searches quicker!
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>About PocketGene</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
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

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#b1c9f0",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: "70%",
    alignSelf: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    backgroundColor: "#c7d7f0",
    maxWidth: "85%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 18,
  },
});

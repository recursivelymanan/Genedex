import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import { useQuerySearchContext } from "../context/QuerySearchContext";

import GeneSearch from "../components/GeneSearch";
import ConfigButton from "../components/buttons/ConfigButton";
import FavoritesButton from "../components/buttons/FavoritesButton";
import InfoButton from "../components/buttons/InfoButton";
import RecentQueries from "../components/RecentQueries";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { query, setQuery, handleSearch } = useQuerySearchContext();

  /*----
  Render
  ----*/
  return (
    <View style={{ flex: 1, backgroundColor: "#b1c9f0" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>{"PocketGene"}</Text>
            <View style={styles.buttonContainer}>
              <ConfigButton onPress={() => navigation.navigate("Config")} />
              <FavoritesButton
                onPress={() => navigation.navigate("Favorites")}
              />
              <InfoButton onPress={() => navigation.navigate("Info")} />
            </View>
            <GeneSearch
              query={query}
              onChangeQuery={setQuery}
              onSearch={() => handleSearch()}
            />
            <RecentQueries />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

/*----
Styles
----*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1c9f0",
    alignItems: "center",
  },
  title: {
    color: "#0c3b87",
    fontWeight: "bold",
    fontFamily: "AmericanTypewriter-Bold",
    fontSize: 50,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: "center",
    width: "100%",
  },
});

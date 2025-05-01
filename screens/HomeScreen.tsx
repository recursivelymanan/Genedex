import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../App";
import GeneSearch from "../components/GeneSearch";
import { useRecentQueries } from "../context/RecentQueryContext";
import ConfigButton from "../components/buttons/ConfigButton";
import FavoritesButton from "../components/buttons/FavoritesButton";
import InfoButton from "../components/buttons/InfoButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  /*----------------
  States & Constants
  ----------------*/

  const [query, setQuery] = useState<string>("");
  const { recentQueries } = useRecentQueries();

  /*------------
  Event Handlers
  ------------*/

  /**
   * Upon search, navigate to ResultsScreen and provide the query.
   * @param searchQuery Optional parameter, when it is passed, pass this value
   *                    to ResultsScreen instead of the query state.
   * @returns
   */
  const handleSearch = (searchQuery?: string) => {
    if (searchQuery) {
      navigation.navigate("Results", {
        query: searchQuery,
      });
      return;
    }
    if (query) {
      navigation.navigate("Results", {
        query,
      });
    }
  };

  const onPressConfig = () => {
    navigation.navigate("Config");
  };

  const onPressFavorites = () => {
    navigation.navigate("Favorites");
  };

  const onPressInfo = () => {
    navigation.navigate("Info");
  };

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
              <ConfigButton onPress={onPressConfig} />
              <FavoritesButton onPress={onPressFavorites} />
              <InfoButton onPress={onPressInfo} />
            </View>
            <GeneSearch
              query={query}
              onChangeQuery={setQuery}
              onSearch={() => handleSearch()}
            />
            {recentQueries.length > 0 && (
              <View style={styles.recentsContainer}>
                <Text style={styles.recentsTitle}>{"Recent queries"}</Text>
                {recentQueries.map((recentQuery, ind) => (
                  <Text
                    key={recentQuery}
                    onPress={() => handleSearch(recentQuery)}
                    style={styles.recents}
                  >
                    {recentQuery}
                  </Text>
                ))}
              </View>
            )}
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
  recents: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 16,
    fontFamily: "Inter",
    color: "#0c3b87",
    fontWeight: "500",
    textAlign: "center",
  },
  recentsContainer: {
    padding: 20,
  },
  recentsTitle: {
    paddingBottom: 20,
    fontSize: 25,
    fontFamily: "Inter",
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

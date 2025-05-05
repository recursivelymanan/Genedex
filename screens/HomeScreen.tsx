import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import { useRecentQueries } from "../context/RecentQueryContext";
import { useQuerySearchContext } from "../context/QuerySearchContext";

import GeneSearch from "../components/GeneSearch";
import ConfigButton from "../components/buttons/ConfigButton";
import FavoritesButton from "../components/buttons/FavoritesButton";
import InfoButton from "../components/buttons/InfoButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { recentQueries, setRecentQueries } = useRecentQueries();
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
                <Button
                  onPress={() => {
                    setRecentQueries([]);
                  }}
                  title="Clear recents"
                />
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

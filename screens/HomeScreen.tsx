import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import GeneSearch from "../components/GeneSearch/GeneSearch";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecentQueries } from "../context/RecentQueryContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");
  const { recentQueries } = useRecentQueries();

  const MAX_RECENT_QUERIES: number = 8;

  const handleSearch = (searchQuery?: string) => {
    if (searchQuery) {
      console.log("Navigating with xquery: ", searchQuery);
      navigation.navigate("Results", {
        query: searchQuery,
      });
      return;
    }
    if (query) {
      console.log("Navigating with yquery: ", query);
      navigation.navigate("Results", {
        query,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#b1c9f0" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>{"PocketGene"}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1c9f0",
    alignItems: "center",
  },
  title: {
    color: "#0c3b87",
    fontWeight: "bold",
    fontFamily: "AmericanTypewriter-Bold", // try "Cochin", "Courier New", "Avenir", etc.
    fontSize: 50,
    marginTop: 20,
  },
  recents: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 16,
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
  },
});

{
}

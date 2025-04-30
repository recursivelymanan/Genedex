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

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const MAX_RECENT_QUERIES: number = 8;

  const handleSearch = (searchQuery?: string) => {
    if (query) {
      navigation.navigate("Results", {
        query,
        onValidResult: (validatedQuery: string) => {
          let arr = [...recentQueries];
          const index: number = arr.indexOf(validatedQuery);
          index !== -1 ? arr.splice(index, 1) : null;
          arr.length === MAX_RECENT_QUERIES ? arr.pop() : null;
          arr.unshift(validatedQuery);
          setRecentQueries(arr);
        },
      });
    }
  };

  const onRecentQueryPress = (recentQuery: string) => {
    setQuery(recentQuery);
    console.log(recentQuery);
    handleSearch(recentQuery);
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
              onSearch={handleSearch}
            />
            {recentQueries.length > 0 && (
              <View style={styles.recentsContainer}>
                <Text style={styles.recentsTitle}>{"Recent queries"}</Text>
                {recentQueries.map((recentQuery, ind) => (
                  <Text
                    key={recentQuery}
                    onPress={() => onRecentQueryPress(recentQuery)}
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

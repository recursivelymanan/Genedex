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

  const handleSearch = (searchQuery?: string) => {
    if (query) {
      navigation.navigate("Results", {
        query,
        onValidResult: (validatedQuery: string) => {
          let arr = [...recentQueries];
          const index: number = arr.indexOf(validatedQuery);
          index !== -1 ? arr.splice(index, 1) : null;
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
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{"PocketGene"}</Text>
          <GeneSearch
            query={query}
            onChangeQuery={setQuery}
            onSearch={handleSearch}
          />
          {recentQueries
            ? recentQueries.map((recentQuery, ind) => (
                <Text
                  key={recentQuery}
                  onPress={() => onRecentQueryPress(recentQuery)}
                  style={styles.recents}
                >
                  {recentQuery}
                </Text>
              ))
            : null}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    padding: 10,
  },
});

{
}

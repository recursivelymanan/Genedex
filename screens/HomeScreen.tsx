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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import GeneSearch from "../components/GeneSearch";
import RecentQueries from "../components/RecentQueries";
import Button from "../components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
              <Button
                button={
                  <FontAwesome6
                    name="screwdriver-wrench"
                    size={40}
                    color="black"
                  />
                }
                onPress={() => navigation.navigate("Config")}
              />
              <Button
                button={<FontAwesome name="star" size={40} color="black" />}
                onPress={() => navigation.navigate("Favorites")}
              />
              <Button
                button={
                  <FontAwesome6 name="circle-info" size={40} color="black" />
                }
                onPress={() => navigation.navigate("Info")}
              />
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

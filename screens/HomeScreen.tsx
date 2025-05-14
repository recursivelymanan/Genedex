import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";

import { SafeAreaView } from "react-native-safe-area-context";
import { useQuerySearchContext } from "../context/QuerySearchContext";

import GeneSearch from "../components/GeneSearch";
import RecentQueries from "../components/RecentQueries";
import Button from "../components/Button";

import { styles } from "../styles/styles";

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
          <View style={styles.homeContainer}>
            <Text style={styles.homeTitle}>{"PocketGene"}</Text>
            <View style={styles.homeButtonContainer}>
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

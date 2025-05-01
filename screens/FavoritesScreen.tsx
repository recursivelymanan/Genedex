import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import Header from "../components/Header";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

const FavoritesScreen: React.FC<Props> = ({ route }) => {
  const { favorites } = useFavoritesContext();
  const { handleSearch } = route.params;

  return (
    <SafeAreaView>
      <Header title="Favorites" />
      {favorites.length === 0 ? (
        <View style={styles.favorite}>
          <Text style={styles.text}>No favorites</Text>
        </View>
      ) : (
        favorites.map((string) => (
          <View style={styles.favorite}>
            <Text
              key={string}
              style={styles.text}
              onPress={() => handleSearch(string)}
            >
              {string}
            </Text>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  favorite: {
    backgroundColor: "#c7d7f0",
    borderRadius: 10,
    width: "auto",
    alignSelf: "center",
    margin: 5,
    padding: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 500,
  },
});

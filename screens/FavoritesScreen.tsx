import React from "react";
import { SafeAreaView, Text } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";

const FavoritesScreen = () => {
  const { favorites } = useFavoritesContext();
  return (
    <SafeAreaView>
      {favorites.map((string) => (
        <Text key={string}>{string}</Text>
      ))}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

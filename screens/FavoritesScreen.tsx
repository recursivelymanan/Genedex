import React from "react";
import { SafeAreaView, Text } from "react-native";

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
      {favorites.map((string) => (
        <Text key={string} onPress={() => handleSearch(string)}>
          {string}
        </Text>
      ))}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

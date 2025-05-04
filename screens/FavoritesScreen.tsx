import React from "react";
import { SafeAreaView } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import Header from "../components/Header";
import FavoritesList from "../components/FavoritesList";
import { useQuerySearchContext } from "../context/QuerySearchContext";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

const FavoritesScreen: React.FC<Props> = ({ route }) => {
  const { handleSearch } = useQuerySearchContext();

  return (
    <SafeAreaView>
      <Header title="Favorites" github={false} />
      <FavoritesList handleSearch={handleSearch} />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

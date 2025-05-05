import React from "react";
import { SafeAreaView } from "react-native";

import { useQuerySearchContext } from "../context/QuerySearchContext";

import Header from "../components/Header";
import FavoritesList from "../components/FavoritesList";

const FavoritesScreen = () => {
  const { handleSearch } = useQuerySearchContext();

  return (
    <SafeAreaView>
      <Header title="Favorites" github={false} />
      <FavoritesList handleSearch={handleSearch} />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

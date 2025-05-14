import React from "react";
import { SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useQuerySearchContext } from "../context/QuerySearchContext";

import Header from "../components/Header";
import FavoritesList from "../components/FavoritesList";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const { handleSearch } = useQuerySearchContext();
  const nav = useNavigation();

  return (
    <SafeAreaView>
      <Header
        title="Favorites"
        leftButton={
          <Button
            button={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
      />
      <FavoritesList handleSearch={handleSearch} />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

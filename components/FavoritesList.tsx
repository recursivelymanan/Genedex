import React from "react";
import { Text, View, ScrollView, Button } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";
import { styles } from "../styles/styles";

interface FavoritesListProps {
  handleSearch: (query: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ handleSearch }) => {
  const { favorites, setFavorites } = useFavoritesContext();

  return favorites.length === 0 ? (
    <View
      style={{
        ...styles.bContainer,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text style={{ ...styles.bText, fontSize: 25 }}>No favorites</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        {favorites.map((string) => (
          <View
            key={`${string}-view0`}
            style={{ justifyContent: "center", alignSelf: "center" }}
          >
            <View key={`${string}-view1`} style={styles.bContainer}>
              <Text
                key={string}
                style={{ ...styles.bText, fontSize: 25 }}
                onPress={() => handleSearch(string)}
              >
                {string}
              </Text>
            </View>
            <Button
              onPress={() => {
                setFavorites([]);
              }}
              title="Clear favorites"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FavoritesList;

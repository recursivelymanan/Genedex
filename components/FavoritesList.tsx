import React from "react";
import { Text, View, ScrollView, Button, TouchableOpacity } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";
import { infoScreenStyles, resultScreenStyles } from "../styles/styles";

const styles = {
  ...infoScreenStyles,
  ...resultScreenStyles,
};

interface FavoritesListProps {
  handleSearch: (query: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ handleSearch }) => {
  const { favorites, setFavorites } = useFavoritesContext();

  return favorites.length === 0 ? (
    <View
      style={{
        ...styles.infoBodyContainer,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text style={{ ...styles.infoBodyText, fontSize: 25 }}>No favorites</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        {favorites.map((string) => (
          <View
            key={`${string}-view0`}
            style={{ justifyContent: "center", alignSelf: "center" }}
          >
            <TouchableOpacity
              onPress={() => handleSearch(string)}
              style={styles.infoBodyContainer}
            >
              <View key={`${string}-view1`}>
                <Text key={string} style={{ ...styles.infoBodyText, fontSize: 25 }}>
                  {string}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <Button
          onPress={() => {
            setFavorites([]);
          }}
          title="Clear favorites"
        />
      </View>
    </ScrollView>
  );
};

export default FavoritesList;

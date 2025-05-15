import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";
import Button from "./Button";
import {
  infoScreenStyles,
  resultScreenStyles,
  buttonStyles,
} from "../styles/styles";

import Octicons from "@expo/vector-icons/Octicons";

const styles = {
  ...infoScreenStyles,
  ...resultScreenStyles,
  ...buttonStyles,
};

interface FavoritesListProps {
  handleSearch: (query: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ handleSearch }) => {
  const { favorites, setFavorites } = useFavoritesContext();

  const removeFavorite = (favorite: string) => {
    setFavorites(favorites.filter((item) => item !== favorite));
  };

  return favorites.length === 0 ? (
    <View
      style={{
        ...styles.infoBodyContainer,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text style={{ ...styles.infoBodyText, fontSize: 25 }}>
        No favorites! Add genes to your favorites by tapping the star icon after
        searching for a gene.
      </Text>
    </View>
  ) : (
    <View>
      <Button
        children={<Text style={styles.buttonText}>Clear favorites</Text>}
        onPress={() => {
          setFavorites([]);
        }}
        style={styles.button}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View>
          {favorites.sort().map((string) => (
            <View key={`${string}-view0`}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSearch(string)}
                  style={{
                    ...styles.resultsEntryContainer,
                    width: "80%",
                    marginRight: 5,
                  }}
                >
                  <View key={`${string}-view1`}>
                    <Text
                      key={string}
                      style={{ ...styles.resultsEntryDataText, fontSize: 25 }}
                    >
                      {string}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    ...styles.resultsEntryContainer,
                    marginLeft: 5,
                    backgroundColor: "#d16f6f",
                  }}
                >
                  <Button
                    children={<Octicons name="trash" size={25} />}
                    onPress={() => removeFavorite(string)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesList;

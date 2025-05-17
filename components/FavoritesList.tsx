import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";

import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

import { useFavoritesContext } from "../context/FavoritesContext";
import Button from "./Button";
import {
  infoScreenStyles,
  resultScreenStyles,
  buttonStyles,
  containerStyles,
} from "../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";

const styles = {
  ...infoScreenStyles,
  ...resultScreenStyles,
  ...buttonStyles,
  ...containerStyles,
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
          Alert.alert(
            "Clear All Favorites",
            "Are you sure you want to remove all favorited genes?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete All",
                onPress: () => setFavorites([]),
                style: "destructive",
              },
            ]
          );
        }}
        style={styles.button}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={{ flex: 1 }}>
          {favorites.sort().map((string) => (
            <Animated.View
              key={`${string}-view0`}
              entering={FadeIn}
              exiting={FadeOut}
              layout={LinearTransition}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  width: "85%",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSearch(string)}
                  style={{
                    ...styles.entryContainer,
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
                    ...styles.entryContainer,
                    marginLeft: 5,
                    backgroundColor: "#d16f6f",
                  }}
                >
                  <Button
                    children={<Ionicons name="trash-outline" size={26} />}
                    onPress={() => removeFavorite(string)}
                  />
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesList;

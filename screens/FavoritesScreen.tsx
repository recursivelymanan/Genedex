import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import { useFavoritesContext } from "../context/FavoritesContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import Header from "../components/Header";
import { styles } from "./../styles/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

const FavoritesScreen: React.FC<Props> = ({ route }) => {
  const { favorites } = useFavoritesContext();
  const { handleSearch } = route.params;

  return (
    <SafeAreaView>
      <Header title="Favorites" />
      {favorites.length === 0 ? (
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
        <View style={{ justifyContent: "center", alignSelf: "center" }}>
          {favorites.map((string) => (
            <View style={styles.bContainer}>
              <Text
                key={string}
                style={{ ...styles.bText, fontSize: 25 }}
                onPress={() => handleSearch(string)}
              >
                {string}
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

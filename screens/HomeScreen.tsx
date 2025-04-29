import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import GeneSearch from "../components/GeneSearch/GeneSearch";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query) {
      navigation.navigate("Results", { query });
    }
  };

  return (
    <View style={styles.container}>
      <GeneSearch query={query} onChangeQuery={setQuery} />
      <Button onPress={handleSearch} title="Search" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});

{
  /* <Button onPress={onSearchPress} title="Search" />
      {error ? (
        <Text>{error as string}</Text>
      ) : queryResult ? (
        <SearchResults results={queryResult} />
      ) : null} */
}

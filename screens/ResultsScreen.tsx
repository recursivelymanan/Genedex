import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { RootStackParamList } from "../App";

import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import FavoriteIndicatorButton from "../components/FavoriteIndicatorButton";

import { useRecentQueries } from "../context/RecentQueryContext";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";

import { resultScreenStyles as styles } from "../styles/styles";

import { onSearchPress } from "../utils/handleGeneSearch";
import { useQuerySearchContext } from "../context/QuerySearchContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<Props> = ({ route }) => {
  /*----------------
  States & Constants
  ----------------*/
  const [isError, setIsError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { queryResult, setQueryResult } = useQuerySearchContext();
  const { addRecentQuery } = useRecentQueries();
  const { configChoices } = useResultsConfiguration();

  const { query } = route.params;
  const nav = useNavigation();

  /*-----
  Effects
  -----*/
  useEffect(() => {
    onSearchPress(
      query,
      configChoices,
      addRecentQuery,
      setLoading,
      setIsError,
      setQueryResult
    );
  }, [query, configChoices]);

  /*----
  Render
  ----*/
  return loading ? (
    <LoadingSpinner />
  ) : isError ? (
    <>
      <Header
        title="Results"
        leftButton={
          <Button
            children={<AntDesign name="back" size={35} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
      />
      <View
        style={{
          ...styles.resultsEntryContainer,
          flexDirection: "column",
          backgroundColor: "#d1d9e3",
        }}
      >
        <MaterialIcons name="error" size={30} style={{ paddingBottom: 15 }} />
        <Text style={{ textAlign: "center", fontSize: 20 }}>{isError}</Text>
      </View>
    </>
  ) : queryResult ? (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={
          <Button
            children={<AntDesign name="back" size={40} color="black" />}
            onPress={() => nav.goBack()}
          />
        }
        rightButton={<FavoriteIndicatorButton query={query} />}
        title="Results"
      />
      <SearchResults />
    </View>
  ) : null;
};

export default ResultsScreen;

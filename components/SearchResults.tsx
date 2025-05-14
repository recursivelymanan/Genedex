import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
  SafeAreaView,
} from "react-native";

import { ConfigResults, QueryResult } from "../types/types";
import { styles } from "../styles/styles";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SearchResult from "./SearchResult";
import { useQuerySearchContext } from "../context/QuerySearchContext";

const SearchResults = () => {
  /*----------------
  States & Constants
  ----------------*/
  const { configChoices } = useResultsConfiguration();
  const { queryResult } = useQuerySearchContext();

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { symbol, mirna, ...otherResults } = queryResult;

  const [choices, setChoices] = useState<ConfigResults>(configChoices);

  /*-----
  Effects
  -----*/
  useEffect(() => {
    setChoices(configChoices);
  }, [configChoices]);

  /*------------
  Event Handlers
  ------------*/
  const onPressSymbol = () => {
    const url = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${queryResult.symbol}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View>
        <TouchableOpacity onPress={() => onPressSymbol()}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                ...styles.hhContainer,
                backgroundColor: "#b1c9f0",
                marginBottom: 20,
              }}
            >
              <Text style={styles.hhText} selectable>
                {symbol}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {Object.entries(otherResults).map(([key, value]) => {
          console.log("KEY", key, "VALUE", value);
          return (
            <SearchResult
              title={key !== "summary" ? value[0] : false}
              result={key !== "summary" ? value[1] : value}
              go={key.startsWith("go") ? value[1] : null}
              refseq={key.startsWith("refseq") ? value[1] : null}
              key={key}
            />
          );
        })}

        <View>
          <Button
            onPress={() => nav.navigate("Config")}
            title="Configure which results you see"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchResults;

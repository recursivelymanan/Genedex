import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";

import { searchResultsStyles as styles } from "../styles/styles";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SearchResult from "./SearchResult";
import { useQuerySearchContext } from "../context/QuerySearchContext";

const SearchResults = () => {
  /*----------------
  States & Constants
  ----------------*/
  const { queryResult } = useQuerySearchContext();

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { symbol, mirna, badResult, ...otherResults } = queryResult;

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
              marginBottom: 5,
            }}
          >
            <Text style={styles.hhText} selectable>
              {symbol}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ marginBottom: 10 }}>
        <Button
          onPress={() => nav.navigate("Config")}
          title="Configure which results you see"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 400 }}>
        <View>
          {Object.entries(otherResults).map(([key, value]) => {
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
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchResults;

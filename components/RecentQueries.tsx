import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import { useQuerySearchContext } from "../context/QuerySearchContext";
import { useRecentQueries } from "../context/RecentQueryContext";

import { recentQueriesStyles as styles } from "../styles/styles";

const RecentQueries = () => {
  /*----------------
  States & Constants
  ----------------*/
  const { recentQueries, setRecentQueries } = useRecentQueries();
  const { handleSearch } = useQuerySearchContext();

  /*----
  Render
  ----*/
  return (
    recentQueries.length > 0 && (
      <View style={styles.recentsContainer}>
        <Text style={styles.recentsTitle}>{"Recent queries"}</Text>
        {recentQueries.map((recentQuery) => (
          <Text
            key={recentQuery}
            onPress={() => handleSearch(recentQuery)}
            style={styles.recents}
          >
            {recentQuery}
          </Text>
        ))}
        <Button
          onPress={() => {
            setRecentQueries([]);
          }}
          title="Clear recents"
        />
      </View>
    )
  );
};

export default RecentQueries;

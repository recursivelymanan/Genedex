import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import { useQuerySearchContext } from "../context/QuerySearchContext";
import { useRecentQueries } from "../context/RecentQueryContext";

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

const styles = StyleSheet.create({
  recents: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 16,
    fontFamily: "Inter",
    color: "#0c3b87",
    fontWeight: "500",
    textAlign: "center",
  },
  recentsContainer: {
    padding: 20,
  },
  recentsTitle: {
    paddingBottom: 20,
    fontSize: 25,
    fontFamily: "Inter",
  },
});

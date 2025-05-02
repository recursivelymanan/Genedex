import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  hhContainer: {
    backgroundColor: "#7ba7ed",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: "70%",
    alignSelf: "center",
  },
  hhText: { textAlign: "center", fontSize: 27, fontWeight: "bold" },
  hContainer: {
    backgroundColor: "#b1c9f0",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    maxWidth: "70%",
    alignSelf: "center",
  },
  hText: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
  bContainer: {
    backgroundColor: "#c7d7f0",
    maxWidth: "85%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  bText: { textAlign: "center", fontSize: 18 },
  resultsEntryContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#d1d9e3",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: "100%",
    marginBottom: 8,
  },
  resultsEntryDataContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  resultsEntryDataText: {
    textAlign: "right",
    fontSize: 18,
  },
  resultsEntryLabelContainer: {
    paddingRight: 10,
    width: 120,
  },
  resultsEntryLabelText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: 700,
  },
});

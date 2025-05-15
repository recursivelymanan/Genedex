import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const homeScreenStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#b1c9f0",
    alignItems: "center",
  },
  homeTitle: {
    color: "#0c3b87",
    fontWeight: "bold",
    fontFamily: "AmericanTypewriter-Bold",
    fontSize: 50,
    marginTop: 10,
  },
  homeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: "center",
    width: "100%",
  },
});

export const infoScreenStyles = StyleSheet.create({
  infoHeaderContainer: {
    backgroundColor: "#b1c9f0",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    maxWidth: "70%",
    alignSelf: "center",
  },
  infoHeaderText: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
  infoBodyContainer: {
    backgroundColor: "#c7d7f0",
    maxWidth: "85%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  infoBodyText: { textAlign: "center", fontSize: 18 },
});

export const resultScreenStyles = StyleSheet.create({
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
  resultsEntryContainerSummary: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#d1d9e3",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: "100%",
    marginBottom: 23,
    marginTop: 15,
  },
  resultsEntryDataContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  resultsEntryDataContainerSummary: {
    paddingLeft: 10,
    flex: 1,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
  },
  resultsEntryDataText: {
    textAlign: "right",
    fontSize: 18,
  },
  resultsEntryLabelContainer: {
    paddingRight: 10,
    width: 120,
  },
  resultsEntryDataTextSummary: {
    textAlign: "auto",
    fontSize: 18,
  },
  resultsEntryLabelText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: 700,
  },
});

export const headerStyles = StyleSheet.create({
  rightButton: {
    position: "absolute",
    right: 16,
    top: 5,
  },
  leftButton: {
    position: "absolute",
    left: 16,
    top: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 60,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    top: -7,
  },
});

export const geneSearchStyles = StyleSheet.create({
  searchBar: {
    width: "80%",
    height: screenHeight * 0.05,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
  },
});

export const searchResultsStyles = StyleSheet.create({
  hhContainer: {
    backgroundColor: "#7ba7ed",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: "70%",
    alignSelf: "center",
  },
  hhText: { textAlign: "center", fontSize: 27, fontWeight: "bold" },
});

export const recentQueriesStyles = StyleSheet.create({
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

export const loadingSpinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const configStyles = StyleSheet.create({
  settingOn: {
    borderRadius: 10,
    backgroundColor: "#cfdee8",
    width: "80%",
    alignSelf: "center",
    margin: 5,
  },
  settingOff: {
    backgroundColor: "#cfdee8",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    margin: 5,
  },
});

export const buttonStyles = StyleSheet.create({
  button: {
    paddingBottom: 15,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "#007AFF",
  },
});

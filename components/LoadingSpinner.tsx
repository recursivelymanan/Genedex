import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/results_loading.json")}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
        speed={1.5}
      />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

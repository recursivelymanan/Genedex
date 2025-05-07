import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import BackToHomeButton from "./buttons/BackToHomeButton";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  rightButton?: React.ComponentType<any>;
  rightButtonProps?: any;
  github: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  rightButton: RightButton,
  rightButtonProps,
  github,
  title,
}) => {
  const nav = useNavigation();
  const onInfoPress = () => {
    const url = `https://github.com/recursivelymanan/PocketGene`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackToHomeButton size={30} onPress={() => nav.goBack()} />
        <Text style={styles.title}>{title}</Text>
        {github ? (
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 5 }}
            onPress={onInfoPress}
          >
            <AntDesign name="github" size={30} />
          </TouchableOpacity>
        ) : RightButton ? (
          <RightButton {...rightButtonProps} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    top: -10,
  },
});

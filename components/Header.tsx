import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import BackToHomeButton from "./buttons/BackToHomeButton";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  rightButton: React.ComponentType<any>;
  rightButtonProps?: any;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  rightButton: RightButton,
  rightButtonProps,
  title,
}) => {
  const nav = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackToHomeButton onPress={() => nav.goBack()} />
        <Text>{title}</Text>
        <RightButton {...rightButtonProps} />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

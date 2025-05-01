import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

interface HeaderProps {
  leftButton: React.ComponentType<any>;
  rightButton: React.ComponentType<any>;
  rightButtonProps?: any;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  leftButton: LeftButton,
  rightButton: RightButton,
  rightButtonProps,
  title,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <LeftButton />
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
  },
});

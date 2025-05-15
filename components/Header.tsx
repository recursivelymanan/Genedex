import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { headerStyles as styles } from "../styles/styles";

interface HeaderProps {
  leftButton?: React.ReactElement;
  rightButton?: React.ReactElement;
  title: string;
  titleSize?: number;
}

const Header: React.FC<HeaderProps> = ({
  leftButton,
  rightButton,
  title,
  titleSize,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.leftButton}>{leftButton}</View>
        <Text
          style={
            titleSize
              ? { ...styles.headerTitle, fontSize: titleSize }
              : styles.headerTitle
          }
        >
          {title}
        </Text>
        <View style={styles.rightButton}>{rightButton}</View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

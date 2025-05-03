import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackToHomeButton from "./buttons/BackToHomeButton";
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
  let style = null;
  let onPress = undefined;
  let rest = [null];
  if (github) {
    const { style, onPress, ...rest } = rightButtonProps;
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackToHomeButton size={30} onPress={() => nav.goBack()} />
        <Text style={styles.title}>{title}</Text>
        {RightButton && github ? (
          <TouchableOpacity style={style} onPress={onPress}>
            <RightButton {...rest} />
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

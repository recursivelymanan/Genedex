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
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  rightButton: RightButton,
  rightButtonProps,
  title,
}) => {
  const nav = useNavigation();
  const { onPress, style, ...rest } = rightButtonProps;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackToHomeButton size={30} onPress={() => nav.goBack()} />
        <Text style={styles.title}>{title}</Text>
        {RightButton ? (
          <TouchableOpacity style={style} onPress={onPress}>
            <RightButton {...rest} />
          </TouchableOpacity>
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

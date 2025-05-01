import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";

interface InfoButtonProps {
  onPress: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome6 name="circle-info" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default InfoButton;

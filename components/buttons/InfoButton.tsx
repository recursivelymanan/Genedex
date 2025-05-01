import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface InfoButtonProps {
  onPress: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
  return (
    <FontAwesome6
      name="circle-info"
      size={40}
      color="black"
      onPress={onPress}
    />
  );
};

export default InfoButton;

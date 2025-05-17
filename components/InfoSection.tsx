import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  LinearTransition,
  FadeIn,
  FadeInLeft,
  FadeOut,
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
} from "react-native-reanimated";

import {
  containerStyles,
  infoScreenStyles,
  resultScreenStyles,
} from "../styles/styles";

const styles = {
  ...containerStyles,
  ...infoScreenStyles,
  ...resultScreenStyles,
};

interface InfoSectionProp {
  title: string;
  body: string;
  startExpand?: boolean;
}

const InfoSection: React.FC<InfoSectionProp> = ({
  title,
  body,
  startExpand,
}) => {
  const [expand, setExpand] = useState<boolean>(startExpand || false);
  const rotation = useSharedValue(startExpand ? 90 : 0);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
    rotation.value = withTiming(expand ? 0 : 90, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  };

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
    marginLeft: 8,
  }));

  return (
    <View>
      <Animated.View key={`av-${title}`} layout={LinearTransition}>
        <TouchableOpacity onPress={toggleExpand}>
          <View
            style={{
              ...styles.entryContainer,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoHeaderText}>{title}</Text>

            <Animated.Text
              style={[
                { ...styles.resultsEntryDataText, color: "#4a4a4a" },
                chevronStyle,
              ]}
            >
              ▶
            </Animated.Text>
          </View>
        </TouchableOpacity>
        {expand ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <View
              style={{
                ...styles.entryContainer,
                backgroundColor: "#d1d9e3",
                marginBottom: 25,
              }}
            >
              <Text style={styles.resultsEntryDataTextSummary}>{body}</Text>
            </View>
          </Animated.View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default InfoSection;

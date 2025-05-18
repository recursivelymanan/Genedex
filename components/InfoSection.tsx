import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  LinearTransition,
  FadeIn,
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
}

const InfoSection: React.FC<InfoSectionProp> = ({ title, body }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const rotation = useSharedValue(expand ? 90 : 0);

  useEffect(() => {
    console.log("hello", title, expand);
    rotation.value = withTiming(expand ? 90 : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [expand]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
    marginLeft: 8,
  }));

  return (
    <View>
      <Animated.View key={`av-${title}`} layout={LinearTransition}>
        <TouchableOpacity onPress={() => setExpand((prev) => !prev)}>
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
              <Text
                style={{
                  ...styles.resultsEntryDataTextSummary,
                  lineHeight: 23,
                }}
              >
                {body}
              </Text>
            </View>
          </Animated.View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default InfoSection;

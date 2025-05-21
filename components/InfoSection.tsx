import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
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
  link: [string, string] | false; // [text, url]
}

const InfoSection: React.FC<InfoSectionProp> = ({ title, body, link }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const rotation = useSharedValue(expand ? 90 : 0);

  useEffect(() => {
    rotation.value = withTiming(expand ? 90 : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [expand]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
    marginLeft: 8,
  }));

  let bodyLeft = "";
  let bodyRight = "";
  let text = "";
  let url = "";
  if (link) {
    [text, url] = link;
    [bodyLeft, bodyRight] = body.split(text, 2);
  }

  return (
    <View>
      <Animated.View
        key={`av-${title}`}
        layout={LinearTransition.duration(200)}
      >
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
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(100)}
          >
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
                {link ? (
                  <>
                    {bodyLeft}
                    <Text
                      style={{
                        ...styles.resultsEntryDataTextSummary,
                        lineHeight: 23,
                        color: "#007AFF",
                      }}
                      onPress={() => Linking.openURL(url)}
                    >
                      {text}
                    </Text>
                    {bodyRight}
                  </>
                ) : (
                  body
                )}
              </Text>
            </View>
          </Animated.View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default InfoSection;

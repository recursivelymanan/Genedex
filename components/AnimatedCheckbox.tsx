import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Checkbox } from "react-native-paper";
import { configStyles as styles } from "../styles/styles";

interface AnimatedCheckboxProps {
  keyName: string;
  value: boolean;
  onToggle: (key: string, value: boolean) => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  keyName,
  value,
  onToggle,
}: {
  keyName: string;
  value: boolean;
  onToggle: (key: string, value: boolean) => void;
}) => {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    opacity: progress.value,
  }));

  return (
    <View>
      <View style={value ? styles.settingOn : styles.settingOff}>
        <Animated.View
          style={[
            {
              position: "absolute",
              borderRadius: 10,
              height: "100%",
              backgroundColor: "#b1c9f0",
              left: 0,
              top: 0,
              zIndex: 0,
            },
            animatedStyle,
          ]}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onToggle(keyName, value)}
          accessibilityRole="checkbox"
          accessibilityLabel={`${prettyNames[keyName]} ${
            value ? "checked" : "not checked"
          }`}
        >
          <Checkbox.Item
            key={keyName}
            label={prettyNames[keyName]}
            status={value ? "checked" : "unchecked"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimatedCheckbox;

const prettyNames: { [key: string]: string } = {
  name: "Full gene name",
  type: "Gene type",
  alternateNames: "Gene aliases",
  ensemblID: "Ensembl ID",
  summary: "Gene summary",
  refseqGenomic: "NCBI Genomic RefSeq ID",
  refseqProtein: "NCBI Protein RefSeq ID",
  refseqRNA: "NCBI RNA RefSeq ID",
  goBP: "Gene Ontology (BP)",
  goMF: "Gene Ontology (MF)",
  goCC: "Gene Ontology (CC)",
};

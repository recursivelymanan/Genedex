import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

import { styles } from "../styles/styles";
import { goResult } from "../types/types";

interface GOResultDisplayProps {
  goResults: goResult[];
}

const onPressRSID = (id: string) => {
  const url = `https://amigo.geneontology.org/amigo/term/${id}`;
  Linking.openURL(url).catch((err) =>
    console.error("Failed to open URL:", err)
  );
};

const GOResultDisplay: React.FC<GOResultDisplayProps> = ({ goResults }) => {
  console.log("hello");
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      {goResults.map((result) => (
        <TouchableOpacity
          key={`${result.id}-to`}
          onPress={() => onPressRSID(result.id)}
        >
          <View
            key={`${result}-v0`}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              key={`${result}-v1`}
              style={{ ...styles.bContainer, marginBottom: 10 }}
            >
              <Text key={`${result}`} style={styles.bText}>
                {result.term}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GOResultDisplay;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

import { styles } from "../styles/styles";

interface RefseqDisplayProps {
  ids: string[];
}

const onPressRSID = (id: string) => {
  const url = `https://www.ncbi.nlm.nih.gov/nuccore/${id}`;
  Linking.openURL(url).catch((err) =>
    console.error("Failed to open URL:", err)
  );
};

const RefseqDisplay: React.FC<RefseqDisplayProps> = ({ ids }) => {
  console.log("hello");
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      {ids.map((id) => (
        <TouchableOpacity key={`${id}-to`} onPress={() => onPressRSID(id)}>
          <View
            key={`${id}-v0`}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              key={`${id}-v1`}
              style={{ ...styles.bContainer, marginBottom: 10 }}
            >
              <Text key={`${id}`} style={styles.bText}>
                {id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RefseqDisplay;

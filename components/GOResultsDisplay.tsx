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
import { SafeAreaView } from "react-native-safe-area-context";

interface GOResultDisplayProps {
  goResults: goResult[];
}

const GOResultDisplay: React.FC<GOResultDisplayProps> = ({ goResults }) => {
  let uniqueGoResults = new Map<string, goResult>();
  goResults.forEach((result) => {
    uniqueGoResults.set(result.term, result);
  });

  const onPressRSID = (id: string) => {
    const url = `https://amigo.geneontology.org/amigo/term/${id}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      <Text style={{ ...styles.bText, paddingBottom: 10 }}>
        Tap on a row to open its Gene Ontology page.
      </Text>
      {Array.from(uniqueGoResults).map(([term, result]) => (
        <TouchableOpacity
          key={`to-${term}`}
          onPress={() => onPressRSID(result.id)}
        >
          <View key={`v0-${term}`} style={styles.resultsEntryContainer}>
            <View
              key={`v1-${term}`}
              style={{ ...styles.resultsEntryLabelContainer, width: 200 }}
            >
              <Text key={`t1-${term}`} style={styles.resultsEntryLabelText}>
                {term}
              </Text>
            </View>
            <View key={`v3-${term}`} style={styles.resultsEntryDataContainer}>
              <Text key={`t2-${term}`} style={styles.resultsEntryDataText}>
                {result.id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  // <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
  //   {goResults.map((result) => (
  //     <TouchableOpacity
  //       key={`${result.id}-to`}
  //       onPress={() => onPressRSID(result.id)}
  //     >
  //       <View
  //         key={`${result}-v0`}
  //         style={{ justifyContent: "center", alignItems: "center" }}
  //       >
  //         <View
  //           key={`${result}-v1`}
  //           style={{ ...styles.bContainer, marginBottom: 10 }}
  //         >
  //           <Text key={`${result}`} style={styles.bText}>
  //             {result.term}
  //           </Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   ))}
  // </ScrollView>
};

export default GOResultDisplay;

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

const RefseqDisplay: React.FC<RefseqDisplayProps> = ({ ids }) => {
  // Genomic types
  let NC: string[] = ["Complete Genomic Molecules"];
  let NG: string[] = ["Incomplete Genomic Regions"];
  let NT: string[] = ["Contigs or Scaffolds"];
  let NZ: string[] = ["Complete Genomes"];

  // RNA types
  let NM: string[] = ["Protein-Coding Transcripts"];
  let NR: string[] = ["Non-Protein-Coding Transcripts"];
  let XM: string[] = ["Predicted Protein-Coding Transcripts"];
  let XR: string[] = ["Predicted Non-Protein-Coding Transcripts"];

  // Protein types
  let AP: string[] = ["Associated with AP_, NM_ or NC_ Accession"];
  let YP: string[] = ["Lacking Instantiated Transcript Record"];
  let XP: string[] = ["Associated with XM_ Accession"];
  let WP: string[] = ["Non-Redundant Sequences Across Species"];

  ids.forEach((id) => {
    const type = id.slice(0, 2);
    type === "NC" || type === "AC"
      ? NC.push(id)
      : type === "NG"
      ? NG.push(id)
      : type === "NT" || type === "NW"
      ? NT.push(id)
      : type === "NZ"
      ? NZ.push(id)
      : type === "NM"
      ? NM.push(id)
      : type === "NR"
      ? NR.push(id)
      : type === "XM"
      ? XM.push(id)
      : type === "XR"
      ? XR.push(id)
      : type === "AP" || type === "NP"
      ? AP.push(id)
      : type === "YP"
      ? YP.push(id)
      : type === "XP"
      ? XP.push(id)
      : type === "WP"
      ? WP.push(id)
      : null;
  });

  const types: string[][] = [
    NC,
    NG,
    NT,
    NZ,
    NM,
    NR,
    XM,
    XR,
    AP,
    YP,
    XP,
    WP,
  ].filter((arr) => arr.length > 1);

  const onPressRSID = (id: string) => {
    const url = `https://www.ncbi.nlm.nih.gov/nuccore/${id}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      <Text style={{ ...styles.bText, paddingBottom: 10 }}>
        Tap on an accession to open its NCBI page.
      </Text>
      {types.map((type) => (
        <View key={`v0-${type}`} style={styles.resultsEntryContainer}>
          <View key={`v1-${type}`} style={styles.resultsEntryLabelContainer}>
            <Text key={`t1-${type}`} style={styles.resultsEntryLabelText}>
              {type[0]}
            </Text>
          </View>
          <View
            key={`v2-${type}`}
            style={{ ...styles.resultsEntryDataContainer, width: 20 }}
          >
            {type.slice(1).map((id) => (
              <TouchableOpacity
                key={`to-${id}`}
                onPress={() => onPressRSID(id)}
              >
                <Text
                  key={id}
                  style={{ ...styles.resultsEntryDataText, padding: 5 }}
                >
                  {id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RefseqDisplay;

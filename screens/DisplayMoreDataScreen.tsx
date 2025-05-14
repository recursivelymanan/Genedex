import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";

import RefseqDisplay from "../components/RefseqDisplay";
import Header from "../components/Header";
import GOResultDisplay from "../components/GOResultsDisplay";

type Props = NativeStackScreenProps<RootStackParamList, "MoreData">;

const DisplayMoreDataScreen: React.FC<Props> = ({ route }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { refseqIDs, goResults } = route.params;
  let title: string = "";
  if (refseqIDs) {
    const sample = refseqIDs[0].slice(0, 2);
    switch (sample) {
      case "NC":
      case "NG":
      case "NT":
      case "NW":
      case "NZ":
        title = "Refseq Genomic IDs";
        break;

      case "NM":
      case "NR":
      case "XM":
      case "XR":
        title = "Refseq RNA IDs";
        break;

      case "AP":
      case "NP":
      case "YP":
      case "XP":
      case "WP":
        title = "Refseq Protein IDs";
        break;
    }
  } else if (goResults) {
    const sample = goResults[0].gocategory;
    switch (sample) {
      case "BP":
        title = "Biological Processes";
        break;

      case "CC":
        title = "Cellular Components";
        break;

      case "MF":
        title = "Molecular Functions";
        break;
    }
  }

  /*----
  Render
  ----*/
  return (
    <SafeAreaView>
      <Header title={title} github={false} />
      {refseqIDs ? (
        <RefseqDisplay ids={refseqIDs} />
      ) : goResults ? (
        <GOResultDisplay goResults={goResults} />
      ) : null}
    </SafeAreaView>
  );
};

export default DisplayMoreDataScreen;

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
  const { data, refseqIDs, goResults } = route.params;
  const title =
    data === "rsG"
      ? "Refseq Genomic IDs"
      : data === "rsR"
      ? "Refseq RNA IDs"
      : data === "rsP"
      ? "Refseq Protein IDs"
      : data === "goBP"
      ? "GO BPs"
      : data === "goCC"
      ? "GO CCs"
      : data === "goMF"
      ? "GO MFs"
      : "";

  /*----
  Render
  ----*/
  return (
    <SafeAreaView>
      <Header title={title} github={false} />
      {refseqIDs ? (
        <RefseqDisplay ids={refseqIDs} dtype={data} />
      ) : goResults ? (
        <GOResultDisplay goResults={goResults} />
      ) : null}
    </SafeAreaView>
  );
};

export default DisplayMoreDataScreen;

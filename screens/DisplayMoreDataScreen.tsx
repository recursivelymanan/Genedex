import React from "react";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RefseqDisplay from "../components/RefseqDisplay";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

type Props = NativeStackScreenProps<RootStackParamList, "MoreData">;

const DisplayMoreDataScreen: React.FC<Props> = ({ route }) => {
  const { data, refseqIDs } = route.params;
  const title =
    data === "rsG"
      ? "Refseq Genomic IDs"
      : data === "rsR"
      ? "Refseq RNA IDs"
      : data === "rsP"
      ? "Refseq Protein IDs"
      : "";

  return (
    <SafeAreaView>
      <Header title={title} />
      {refseqIDs ? <RefseqDisplay ids={refseqIDs} /> : null}
    </SafeAreaView>
  );
};

export default DisplayMoreDataScreen;

import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";

import { QueryResult } from "../types/types";
import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { useRecentQueries } from "../context/RecentQueryContext";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";
import BackToHomeButton from "../components/buttons/BackToHomeButton";
import FavoriteIndicatorButton from "../components/buttons/FavoriteIndicatorButton";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

const GENE_CARDS_URL = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=";

const ResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { query } = route.params;
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { addRecentQuery } = useRecentQueries();
  const { configChoices } = useResultsConfiguration();

  /*-----
  Effects
  -----*/

  useEffect(() => {
    onSearchPress();
  }, [query]);

  /*---------------
  Handler Functions
  ---------------*/

  /**
   * Function for handling API queries. Throws error upon invalid query.
   */
  const onSearchPress = async () => {
    if (query) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const fields = createQueryFields();
          console.log(fields);
          const response = await fetch(
            `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`
          );
          let data = await response.json();
          data = data.hits[0];

          let apiResult: QueryResult = {
            symbol: data.symbol,
          };

          Object.entries(configChoices).forEach(([key, value]) => {
            if (value) {
              if (key === "geneCard") {
                apiResult.geneCard = `${GENE_CARDS_URL}${query}`;
              } else {
                apiResult[key] = data[fieldsForURL[key]];
              }
            }
          });

          // {
          //   symbol: data.symbol,
          //   name: data.name,
          //   alternateNames: data.alias,
          //   ensemblID: data.ensembl.gene,
          //   summary: data.summary,
          // };

          addRecentQuery(query);
          setError(null);
          setQueryResult(apiResult);
        } catch (error) {
          console.error("Error fetching gene data: ", error);
          setError("Invalid gene symbol, please try again.");
        } finally {
          setLoading(false);
        }
      }, 2000);
    }
  };

  /*-------------
  Other Functions
  -------------*/

  function createQueryFields(): string {
    let fields = "symbol,";
    Object.entries(configChoices).forEach(([key, value]) => {
      if (value && key !== "geneCard") {
        fields += `${fieldsForURL[key]},`;
      }
    });
    fields = fields.slice(0, -1);
    return fields;
  }

  /*----
  Render
  ----*/
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftButton={BackToHomeButton}
        rightButton={FavoriteIndicatorButton}
        rightButtonProps={{ query }}
        title="Results"
      />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Text>{error as string}</Text>
      ) : queryResult ? (
        <SearchResults results={queryResult} />
      ) : null}
    </SafeAreaView>
  );
};

export default ResultsScreen;

const fieldsForURL: { [key: string]: string } = {
  name: "name",
  type: "type_of_gene",
  alternateNames: "alias",
  ensemblID: "ensembl.gene",
  summary: "summary",
  refseqGenomic: "refseq.genomic",
  refseqProtein: "refseq.protein",
  refseqRNA: "refseq.rna",
  goBP: "go.BP",
  goMF: "go.MF",
  goCC: "go.CC",
};

import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { RootStackParamList } from "../App";

import { QueryResult } from "../types/types";
import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { useRecentQueries } from "../context/RecentQueryContext";
import { useResultsConfiguration } from "../context/ResultsConfigurationContext";
import FavoriteIndicatorButton from "../components/buttons/FavoriteIndicatorButton";
import { styles } from "../styles/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<Props> = ({ route }) => {
  /*----------------
  States & Constants
  ----------------*/
  const { query } = route.params;
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
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
      try {
        const fields = createQueryFields();
        console.log(fields);
        const response = await fetch(
          `https://mygene.info/v3/query?q=${query}&fields=${fields}&species=human`
        );
        let data = await response.json();

        if (!response.ok) {
          console.log(response.status);
          if (response.status === 404) {
            throw new Error("GENE_NOT_FOUND");
          } else if (response.status >= 500) {
            throw new Error("SERVER_ERROR");
          } else {
            throw new Error("UNKNOWN_ERROR");
          }
        }

        data = data.hits[0];

        let apiResult: QueryResult = {
          symbol: data.symbol,
        };
        Object.entries(configChoices).forEach(([key, value]) => {
          if (value) {
            if (["goBP", "goCC", "goMF"].includes(key)) {
              apiResult[key] = data.go[fieldsForURL[key]];
            } else if (key === "ensemblID") {
              apiResult[key] = data.ensembl.gene;
            } else if (
              ["refseqGenomic", "refseqProtein", "refseqRNA"].includes(key)
            ) {
              const safeKey = key.slice(6).toLowerCase();
              let ids = data.refseq[safeKey];
              Array.isArray(ids)
                ? (apiResult[key] = ids)
                : (apiResult[key] = [ids]);
            } else {
              apiResult[key] = data[fieldsForURL[key]];
            }
          }
        });

        addRecentQuery(query);
        setIsError(null);
        setQueryResult(apiResult);
      } catch (error: unknown) {
        console.log("error");
        if (error instanceof Error) {
          if (error.message === "GENE_NOT_FOUND") {
            setIsError("Gene not found. Please check the name and try again.");
          } else if (error.message === "SERVER_ERROR") {
            setIsError(
              "Server is currently unavailable. Please try again later."
            );
          } else if (error.message === "Network request failed") {
            setIsError("Network error. Check your internet connection.");
          } else {
            setIsError("Something went wrong. Please try again.");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  /*-------------
  Other Functions
  -------------*/
  /**
   * Helper function used by API search to generate the fields
   * portion of the query by reading configChoices
   * @returns String for the fields portion of the URL
   */
  function createQueryFields(): string {
    let fields = "symbol,";
    let flag = true;
    Object.entries(configChoices).forEach(([key, value]) => {
      if (value) {
        if (["goBP", "goCC", "goMF"].includes(key) && flag) {
          fields += "go,";
          flag = false;
        } else {
          fields += `${fieldsForURL[key]},`;
        }
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
      {loading ? (
        <LoadingSpinner />
      ) : isError ? (
        <>
          <Header title="Results" github={false} />
          <View
            style={{ ...styles.resultsEntryContainer, flexDirection: "column" }}
          >
            <MaterialIcons
              name="error"
              size={30}
              style={{ paddingBottom: 15 }}
            />
            <Text style={styles.resultsEntryDataText}>{isError}</Text>
          </View>
        </>
      ) : queryResult ? (
        <>
          <Header
            rightButton={FavoriteIndicatorButton}
            rightButtonProps={{ query }}
            title="Results"
            github={false}
          />
          <SearchResults results={queryResult} />
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default ResultsScreen;

const fieldsForURL: { [key: string]: string } = {
  name: "name",
  type: "type_of_gene",
  alternateNames: "alias",
  ensemblID: "ensembl",
  summary: "summary",
  refseqGenomic: "refseq.genomic",
  refseqProtein: "refseq.protein",
  refseqRNA: "refseq.rna",
  goBP: "BP",
  goMF: "MF",
  goCC: "CC",
};

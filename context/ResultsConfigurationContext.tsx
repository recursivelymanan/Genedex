import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ConfigResults } from "../types/types";

const STORAGE_KEY = "configChoices";

export const defaultFields: ConfigResults = {
  name: true,
  type: true,
  alternateNames: true,
  ensemblID: false,
  summary: true,
  refseqGenomic: false,
  refseqProtein: false,
  refseqRNA: false,
  goBP: false,
  goMF: false,
  goCC: false,
};

export const allTrueFields: ConfigResults = {
  name: true,
  type: true,
  alternateNames: true,
  ensemblID: true,
  summary: true,
  refseqGenomic: true,
  refseqProtein: true,
  refseqRNA: true,
  goBP: true,
  goMF: true,
  goCC: true,
};

interface ResultsConfigurationContextType {
  configChoices: ConfigResults;
  setConfigChoices: React.Dispatch<React.SetStateAction<ConfigResults>>;
}

const ResultsConfigurationContext = createContext<
  ResultsConfigurationContextType | undefined
>(undefined);

export const useResultsConfiguration = () => {
  const context = useContext(ResultsConfigurationContext);
  if (!context)
    throw new Error(
      "useResultsConfiguration must be used within ResultsConfigurationProvider"
    );
  return context;
};

export const ResultsConfigurationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /*----
  States
  ----*/
  const [configChoices, setConfigChoices] =
    useState<ConfigResults>(defaultFields);

  /*-----
  Effects
  -----*/

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setConfigChoices(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load stored config choices", error);
        setConfigChoices(defaultFields);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const saveConfig = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(configChoices));
      } catch (error) {
        console.log("Failed to save config choices", error);
      }
    };
    saveConfig();
  }, [configChoices]);

  return (
    <ResultsConfigurationContext.Provider
      value={{ configChoices, setConfigChoices }}
    >
      {children}
    </ResultsConfigurationContext.Provider>
  );
};

import React from "react";
import { View, ScrollView, Button } from "react-native";

import {
  allTrueFields,
  defaultFields,
  useResultsConfiguration,
} from "../context/ResultsConfigurationContext";

import AnimatedCheckbox from "./AnimatedCheckbox";

const ResultsConfiguration = () => {
  const { configChoices, setConfigChoices } = useResultsConfiguration();

  const onCheckboxToggle = (key: string, value: boolean) => {
    setConfigChoices((prev) => ({
      ...prev,
      [key]: !value,
    }));
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button
          onPress={() => {
            setConfigChoices(allTrueFields);
          }}
          title="Select All"
        />
        <Button
          onPress={() => {
            setConfigChoices(defaultFields);
          }}
          title="Reset to default"
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
        {Object.entries(configChoices).map(([key, value]) => (
          <AnimatedCheckbox
            key={key}
            keyName={key}
            value={value}
            onToggle={onCheckboxToggle}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ResultsConfiguration;

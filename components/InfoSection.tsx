import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { infoScreenStyles as styles } from "../styles/styles";

interface InfoSectionProp {
  title: string;
  body: string;
  startExpand?: boolean;
}

const InfoSection: React.FC<InfoSectionProp> = ({
  title,
  body,
  startExpand,
}) => {
  const [expand, setExpand] = useState<boolean>(startExpand || false);

  return (
    <View>
      <TouchableOpacity onPress={() => setExpand(!expand)}>
        <View
          style={{
            ...styles.infoHeaderContainer,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.infoHeaderText}>{title}</Text>
        </View>
      </TouchableOpacity>
      {expand ? (
        <View style={{ ...styles.infoBodyContainer, marginBottom: 30 }}>
          <Text style={styles.infoBodyText}>{body}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InfoSection;

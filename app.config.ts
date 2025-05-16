import dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "PocketGene",
  slug: "pocketgene",
  version: "1.0.0",
  icon: "./assets/images/icon.png",
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mananchopra.pocketgene",
  },
  android: {
    package: "com.mananchopra.pocketgene",
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
    appVersion: "1.0.0",
  },
});

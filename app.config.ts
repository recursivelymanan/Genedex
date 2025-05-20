import dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Genedex",
  slug: "genedex",
  version: "1.0.0",
  icon: "./assets/images/icon.png",
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mananchopra.genedex",
  },
  android: {
    package: "com.mananchopra.genedex",
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
    appVersion: "1.0.0",
  },
});

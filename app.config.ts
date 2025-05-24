import dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Genedex",
  slug: "genedex",
  splash: {
    backgroundColor: "#b1c9f0",
    image: "./assets/images/splash_icon.png",
  },
  version: "1.0.0",
  icon: "./assets/images/icon.png",
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  plugins: ["expo-font"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mananchopra.genedex",
    buildNumber: "1",
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

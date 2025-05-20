<img src="./assets/images/icon.png" width="200" alt="Genedex Logo" />

# Gendex

Mobile app that enables users to quickly retrieve common info on human genes. Written in Typescript with react-native and managed with Expo.

## Motivation

During my three years of research at UCSD, we were frequently dealing with a mess of genes during literature searches and data analysis. Though tools for gene look up exist online (and are more robust) there were times where it would have been nice to have something quick and easy on my phone.

I also developed this app to further my experience in React, specifically with react-native and mobile development as well as Typescript.

## Using the App

The app is currently in development and will be available on the App store and Google Play store soon. For now, if you want to try it out you can follow the steps below to run the app locally.

### Setting up the Expo Project

The recommended way to get the app up and running is using Expo.

1. Install Expo CLI

   ```
   # Install globally with -g flag
   npm install -g expo-cli
   ```

2. Clone this repository and install dependencies

   ```
   git clone https://github.com/recursivelymanan/Genedex
   cd Genedex
   npm install
   ```

3. Run the project

   ```
   npx expo start
   ```

4. Install Expo Go on your phone to use the app (iOS or Android) and scan the QR code shown by the previous command. If you are having trouble connecting, try using `npx expo start -- --tunnel` instead.

## Data Disclaimer

Gene annotations provided by MyGene.info, maintained by The Scripps Research Institute. Data is provided as-is.

## Contact

Please feel free to report bugs and other issues with the app in this repository's issues.

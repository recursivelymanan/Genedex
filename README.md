<img src="./assets/images/icon.png" width="200" alt="Genedex Logo" />

# Genedex

Mobile app that enables users to quickly retrieve common info on human genes. Written in Typescript with react-native and managed with Expo.

## Motivation

During my three years of research at UCSD, we were frequently dealing with a mess of genes during literature searches and data analysis. Though tools for gene look up exist online (and are more robust) there were times where it would have been nice to have something quick and easy on my phone.

I also developed this app to further my experience in React, specifically with react-native and mobile development as well as Typescript.

## Download now on the Apple App Store

You can download the app now on the Apple app store in most countries. Android coming soon! 

<a href="https://apps.apple.com/us/app/genedex/id6746354391?itscg=30200&itsct=apps_box_badge&mttnsubad=6746354391" style="display: inline-block;">
<img src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1748304000" alt="Download on the App Store" style="width: 123px; height: 41px; vertical-align: middle; object-fit: contain;" />
</a>

## Run Genedex Locally with Expo

If you are interested in running the app locally, the recommended way to get the app up and running is using Expo. You will need either an iOS device (iPhone or iPad) or an iOS simulator using Xcode.

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

4. Install Expo Go on your phone to use the app and scan the QR code shown by the previous command. If you are having trouble connecting, try using `npx expo start -- --tunnel` instead.

## Data Disclaimer

Gene annotations provided by MyGene.info, maintained by The Scripps Research Institute. Data is provided as-is.

## Contact

Please feel free to report bugs and other issues with the app in this repository's issues.

import { infoText } from "../types/types";

export const infoTextList: infoText[] = [
  {
    title: "Welcome to PocketGene!",
    body: "Thanks for using PocketGene! Get started by heading back to the home screen and searching for any valid human HGNC gene symbol.\n\n You can also check out the sections below for more helpful information. Happy searching!",
  },
  {
    title: "Managing favorites",
    body: "You can add genes to your favorites list by searching for the gene and then tapping the star on the top right of the results screen. To access your favorite genes list, just tap the star icon on the home screen.",
  },
  {
    title: "Support",
    body: "If you encounter any bugs or issues with the app, please report them by opening a new issue on this app's GitHub repo (link on the top right of this page) or by sending an email to pocketgene@gmail.com .\n\nIf you would like to run the app locally with Expo or an emulator, refer to the GitHub repository for instructions.",
  },
  {
    title: "Data Sources",
    body: "Gene annotations provided by MyGene.info, maintained by The Scripps Research Institute. Data is provided as-is. MyGene.info also pulls data from other third party sources. \n\nFor some genes, certain data points may be unavailable. You can always check the GeneCards page for a gene by tapping on the gene symbol.",
  },
  {
    title: "Data and Privacy",
    body: "PocketGene doesn't collect any information from you, and any data collected is stored locally on your device and never shared with external servers. Please refer to our privacy policy for more detail.",
  },
  {
    title: "Acknowledgements",
    body: "PocketGene would not be possible without the help of many open-source libraries.",
  },
];

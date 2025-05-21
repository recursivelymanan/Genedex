import { infoText } from "../types/types";

export const infoTextList: infoText[] = [
  {
    title: "Welcome to Genedex!",
    body: "Thanks for using Genedex! Get started by heading back to the home screen and searching for any official human gene symbol (HGNC).\n\nYou can also check out the sections below for more helpful information. Happy searching!",
    link: ["HGNC", "https://genenames.org/"],
  },
  {
    title: "Managing favorites",
    body: "You can add genes to your favorites list by searching for the gene and then tapping the star on the top right of the results screen. To access your favorite genes list, just tap the star icon on the home screen.",
    link: false,
  },
  {
    title: "Support",
    body: "If you encounter any bugs or issues with the app, please report them by opening a new issue on this app's GitHub repo (link on the top right of this page) or by sending an email to genedex@gmail.com .\n\nIf you are a developer, or just interested in running locally, you can do so with Expo or an emulator. Refer to the GitHub repository for instructions.",
    link: ["GitHub repository", "https://github.com/recursivelymanan/Genedex"],
  },
  {
    title: "Data Sources",
    body: "Gene annotations provided by MyGene.info, a widely used biomedical data service maintained by The Scripps Research Institute. Data is provided as-is. MyGene.info also pulls data from other third party sources. \n\nFor some genes, certain data points may be unavailable. You can always check the GeneCards page for a gene by tapping on the gene symbol.",
    link: ["MyGene.info", "https://mygene.info"],
  },
  {
    title: "Data and Privacy",
    body: "Genedex doesn't collect any information from you, and any data collected is stored locally on your device and never shared with external servers. Please refer to our privacy policy for more detail.",
    link: [
      "privacy policy",
      "https://recursivelymanan.github.io/Genedex-Info/privacy-policy.html",
    ],
  },
  {
    title: "Acknowledgements",
    body: "Genedex would not be possible without the help of many open-source libraries. Please refer to our acknowledgements page for a full list of libraries used in Genedex.",
    link: [
      "acknowledgements page",
      "https://recursivelymanan.github.io/Genedex-Info/acknowledgements.html",
    ],
  },
];

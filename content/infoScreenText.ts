import { infoText } from "../types/types";

export const infoTextList: infoText[] = [
  {
    title: "Welcome to PocketGene!",
    body: "To get started, head back to the home screen and type in a valid HGNC gene symbol. When you hit search, you'll see the results for that gene. If you want to configure what you see on the results page, tap on the wrench symbol above the search bar to customize your results.\n\nTo learn more about the app, tap on the headers below.",
    startExpand: true,
  },
  {
    title: "Managing favorites",
    body: "To get started, head back to the home screen and type in a valid HGNC gene symbol. When you hit search, you'll see the results for that gene. If you want to configure what you see on the results page, tap on the wrench symbol above the search bar to customize your results.",
  },
  {
    title: "Support",
    body: "If you encounter any bugs or issues with the app, please report them by opening a new issue on this app's GitHub repo (link on the top right of this page) or by sending an email to pocketgene@gmail.com",
  },
  {
    title: "Data Sources",
    body: "Gene annotations provided by MyGene.info, maintained by The Scripps Research Institute. Data is provided as-is. MyGene.info also pulls data from other third party sources. \n\nFor some genes, certain data points may be unavailable. You can always check the GeneCards page for a gene by tapping on the gene symbol.",
  },
];

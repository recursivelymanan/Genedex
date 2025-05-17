/*
Type for storing results from API calls
*/
export type QueryResult = {
  mirna: boolean;
  symbol: string;
  name?: [string, string];
  type?: [string, string];
  alternateNames?: [string, string];
  ensemblID?: [string, string];
  summary?: string;
  refseqGenomic?: [string, string[]];
  refseqProtein?: [string, string[]];
  refseqRNA?: [string, string[]];
  goBP?: [string, goResult[]];
  goMF?: [string, goResult[]];
  goCC?: [string, goResult[]];
  [key: string]: any;
};

/*
Type for configuring API call results
*/
export type ConfigResults = {
  name: boolean;
  type: boolean;
  alternateNames: boolean;
  ensemblID: boolean;
  summary: boolean;
  refseqGenomic: boolean;
  refseqProtein: boolean;
  refseqRNA: boolean;
  goBP: boolean;
  goMF: boolean;
  goCC: boolean;
};

export type goResult = {
  evidence: string | string[];
  gocategory?: string;
  category?: string;
  id: string;
  pubmed: number;
  qualifier: string;
  term: string;
};

export type infoText = {
  title: string;
  body: string;
  startExpand?: boolean;
};

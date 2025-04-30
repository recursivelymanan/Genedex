/*
Type for storing results from API calls
*/
export type QueryResult = {
  symbol: string;
  name?: string;
  type?: string;
  alternateNames?: string[];
  ensemblID?: string;
  summary?: string;
  refseqGenomic?: string;
  refseqProtein?: string;
  refseqRNA?: string;
  geneCard?: string;
  goBP?: goResult[];
  goMF?: goResult[];
  goCC?: goResult[];
};

/*
Type for configuring API call results
*/
export type ConfigResults = {
  geneName: boolean;
  geneAlternateNames: boolean;
  geneSummary: boolean;
};

export type goResult = {
  evidence: string;
  gocategory: string;
  id: string;
  pubmed: number;
  qualifier: string;
  term: string;
};

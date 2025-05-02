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
  goBP?: any;
  goMF?: any;
  goCC?: any;
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
  geneCard: boolean;
  goBP: boolean;
  goMF: boolean;
  goCC: boolean;
};

export type goResult = {
  evidence: string;
  gocategory: string;
  id: string;
  pubmed: number;
  qualifier: string;
  term: string;
};

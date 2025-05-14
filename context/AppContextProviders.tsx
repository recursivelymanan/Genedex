import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { FavoritesProvider } from "./FavoritesContext";
import { QuerySearchProvider } from "./QuerySearchContext";
import { RecentQueriesProvider } from "./RecentQueryContext";
import { ResultsConfigurationProvider } from "./ResultsConfigurationContext";

const AppContextProviders = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider>
    <PaperProvider>
      <RecentQueriesProvider>
        <ResultsConfigurationProvider>
          <FavoritesProvider>
            <QuerySearchProvider>{children}</QuerySearchProvider>
          </FavoritesProvider>
        </ResultsConfigurationProvider>
      </RecentQueriesProvider>
    </PaperProvider>
  </SafeAreaProvider>
);

export default AppContextProviders;

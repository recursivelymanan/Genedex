import React, { createContext, useContext, useState } from "react";

const MAX_RECENT_QUERIES = 6;

interface RecentQueriesContextType {
  recentQueries: string[];
  addRecentQuery: (query: string) => void;
}

const RecentQueriesContext = createContext<
  RecentQueriesContextType | undefined
>(undefined);

export const useRecentQueries = () => {
  const context = useContext(RecentQueriesContext);
  if (!context)
    throw new Error(
      "useRecentQueries must be used within RecentQueriesProvider"
    );
  return context;
};

export const RecentQueriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const addRecentQuery = (query: string) => {
    let arr = [...recentQueries];
    const index: number = arr.indexOf(query);
    index !== -1 ? arr.splice(index, 1) : null;
    arr.length === MAX_RECENT_QUERIES ? arr.pop() : null;
    arr.unshift(query);
    setRecentQueries(arr);
  };

  return (
    <RecentQueriesContext.Provider value={{ recentQueries, addRecentQuery }}>
      {children}
    </RecentQueriesContext.Provider>
  );
};

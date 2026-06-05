"use client";
import { useState, createContext, useContext, type ReactNode } from "react";

interface SearchCtx {
  search: string;
  setSearch: (v: string) => void;
}

const SearchContext = createContext<SearchCtx>({ search: "", setSearch: () => {} });

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

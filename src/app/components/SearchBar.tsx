"use client";
import { useState } from "react";
import { useSearch } from "./SearchProvider";

interface SearchBarProps {
  lang?: string;
}

const PLACEHOLDERS: Record<string, string> = {
  ar: "ابحث عن أداة... (مثال: QR، قرض، PDF)",
  en: "Search tools... (e.g. QR, loan, PDF)",
  tr: "Araç ara... (örn: QR, kredi, PDF)",
  id: "Cari alat... (mis: QR, pinjaman, PDF)",
};

const SEARCH_LABELS: Record<string, string> = {
  ar: "بحث",
  en: "Search",
  tr: "Ara",
  id: "Cari",
};

export default function SearchBar({ lang = "ar" }: SearchBarProps) {
  const { setSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const placeholder = PLACEHOLDERS[lang] || PLACEHOLDERS.en;
  const searchLabel = SEARCH_LABELS[lang] || SEARCH_LABELS.en;

  const handleSearch = () => {
    setSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-inner">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input-field"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="search-clear-btn"
            aria-label={lang === "ar" ? "مسح البحث" : "Clear search"}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <button
          onClick={handleSearch}
          className="search-submit-btn"
          aria-label={searchLabel}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}

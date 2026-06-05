"use client";
import { useSearch } from "./SearchProvider";

export default function AllToolsHeader() {
  const { search } = useSearch();
  const isSearching = search.trim().length > 0;

  if (isSearching) return null;

  return (
    <div className="section-header scroll-fade-in" style={{ marginTop: "56px", marginBottom: "4px" }}>
      <h2 className="section-title">
        <span className="s-icon">🗂️</span>
        كل الأدوات
      </h2>
    </div>
  );
}

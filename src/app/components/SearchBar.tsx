"use client";
import { useSearch } from "./SearchProvider";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="max-w-[520px] mx-auto relative">
      <input
        type="text"
        placeholder="ابحث عن أداة... (مثال: QR، قرض، PDF)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input-enhanced"
      />
    </div>
  );
}

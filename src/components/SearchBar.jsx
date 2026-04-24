import { Search, X, Filter } from "lucide-react";

const CATS = [
  { id: "all", label: "ALL" },
  { id: "array", label: "ARRAY/STR" },
  { id: "graph", label: "GRAPH/TREE" },
  { id: "dp", label: "DP/RECUR" },
];

export default function SearchBar({
  search,
  onSearch,
  filter,
  onFilter,
  counts,
}) {
  return (
    <div className="mb-5 space-y-2">
      {/* Search input */}
      <div className="flex border border-mid bg-surface rounded-sm overflow-hidden focus-within:border-amber transition-colors">
        <div className="flex items-center px-3 border-r border-dim text-muted">
          <Search size={13} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="search pattern, keyword, problem name..."
          className="flex-1 bg-transparent px-3 py-2.5 font-mono text-[12px] text-primary placeholder-muted outline-none"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="flex items-center px-3 text-muted hover:text-primary border-l border-dim transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="flex items-center gap-1 text-muted mr-1">
          <Filter size={10} />
          <span className="font-mono text-[9px] tracking-wider">FILTER</span>
        </div>
        {CATS.map((c) => {
          const cnt =
            c.id === "all"
              ? Object.values(counts).reduce((a, b) => a + b, 0)
              : counts[c.id] || 0;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onFilter(c.id)}
              className={`font-mono text-[9px] tracking-wider px-3 py-1.5 border rounded-sm transition-all ${
                active
                  ? "border-amber text-void bg-amber font-semibold"
                  : "border-dim text-muted hover:border-bright hover:text-secondary bg-surface"
              }`}
            >
              {c.label}
              <span
                className={`ml-1.5 ${active ? "text-void/70" : "text-muted"}`}
              >
                {cnt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

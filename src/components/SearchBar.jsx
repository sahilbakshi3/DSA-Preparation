const CATS = [
  { id: "all", label: "All" },
  { id: "array", label: "Array/String" },
  { id: "graph", label: "Graph/Tree" },
  { id: "dp", label: "DP/Recursion" },
];

export default function SearchBar({
  search,
  onSearch,
  filter,
  onFilter,
  counts,
}) {
  return (
    <div className="mb-5 space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search patterns, keywords, signals, problems..."
        className="w-full rounded-lg border border-border2 bg-bg2 px-4 py-2.5 font-mono text-sm text-tx1 placeholder-tx3 outline-none transition focus:border-accent"
      />
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => {
          const cnt =
            c.id === "all"
              ? Object.values(counts).reduce((a, b) => a + b, 0)
              : counts[c.id] || 0;
          return (
            <button
              key={c.id}
              onClick={() => onFilter(c.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap
                ${
                  filter === c.id
                    ? "border-border2 bg-bg4 text-tx1"
                    : "border-border1 bg-bg2 text-tx3 hover:bg-bg3 hover:text-tx2"
                }`}
            >
              {c.label} ({cnt})
            </button>
          );
        })}
      </div>
    </div>
  );
}

const CATS = [
  { id: "all", label: "ALL" },
  { id: "array", label: "ARRAY/STRING" },
  { id: "graph", label: "GRAPH/TREE" },
  { id: "dp", label: "DP/RECURSION" },
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
      <div className="flex border border-wire2 bg-bg2">
        <span className="hidden border-r border-wire px-3 py-2.5 font-mono text-[10px] text-tx3 sm:flex items-center">
          SEARCH
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search pattern, keyword..."
          className="flex-1 bg-transparent px-3 py-2.5 font-mono text-sm text-tx1 placeholder-tx3 outline-none"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="px-3 font-mono text-[10px] text-tx3 hover:text-accent border-l border-wire transition-colors"
          >
            CLR
          </button>
        )}
      </div>

      <div className="flex gap-px flex-wrap">
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
              className={`font-mono text-[9px] tracking-[0.1em] px-3 py-1.5 border transition-all
                ${
                  active
                    ? "border-accent text-accent bg-accent/10"
                    : "border-wire text-tx3 hover:border-wire2 hover:text-tx2 bg-bg2"
                }`}
            >
              {c.label} <span className="ml-1 opacity-60">{cnt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

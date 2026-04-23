export default function TOC({ patterns, onJump }) {
  return (
    <div className="mb-5 border border-wire2 bg-bg2">
      <div className="border-b border-wire px-4 py-2 flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.15em] text-tx3">
          QUICK_JUMP
        </span>
        <span className="flex-1 h-px bg-wire" />
        <span className="font-mono text-[9px] text-tx3">
          {patterns.length} entries
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 divide-x divide-y divide-wire">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => onJump(p.id)}
            className="flex items-center gap-2 px-3 py-2 text-left hover:bg-bg3 transition-colors group"
          >
            <span
              className="w-1.5 h-1.5 flex-shrink-0"
              style={{ background: p.color }}
            />
            <span className="font-mono text-[10px] text-tx3 group-hover:text-tx1 transition-colors truncate">
              {p.label.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

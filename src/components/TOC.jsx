export default function TOC({ patterns, onJump }) {
  return (
    <div className="mb-6 rounded-xl border border-border1 bg-bg2 px-5 py-4">
      <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
        Quick Jump
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3 md:grid-cols-4">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => onJump(p.id)}
            className="flex items-center gap-2 rounded py-1 text-left text-xs text-tx2 transition hover:text-tx1"
          >
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: p.color }}
            />
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

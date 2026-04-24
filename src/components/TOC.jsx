import { Hash, ChevronRight } from "lucide-react";

export default function TOC({ patterns, onJump }) {
  return (
    <div className="mb-5 border border-mid bg-surface rounded-sm overflow-hidden">
      <div className="border-b border-dim px-4 py-2 flex items-center justify-between bg-raised">
        <div className="flex items-center gap-2">
          <Hash size={10} className="text-amber" />
          <span className="font-mono text-[9px] text-muted tracking-[0.18em]">
            QUICK_JUMP
          </span>
        </div>
        <span className="font-mono text-[9px] text-muted">
          {patterns.length} entries
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-dim">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => onJump(p.id)}
            className="flex items-center gap-2 px-3 py-2 text-left hover:bg-raised transition-colors group"
          >
            <span
              className="w-1.5 h-1.5 flex-shrink-0 rounded-full"
              style={{ background: p.color }}
            />
            <span className="font-mono text-[9px] text-muted group-hover:text-primary transition-colors truncate leading-tight">
              {p.label.toUpperCase()}
            </span>
            <ChevronRight
              size={8}
              className="flex-shrink-0 text-muted opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

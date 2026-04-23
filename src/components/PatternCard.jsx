import { useState } from "react";

const DIFF_STYLES = {
  easy: { color: "#1D9E75", bg: "#1D9E7520", border: "#1D9E7540" },
  medium: { color: "#c9963a", bg: "#c9963a20", border: "#c9963a40" },
  hard: { color: "#D4537E", bg: "#D4537E20", border: "#D4537E40" },
};

function FlowBox({ text }) {
  const parts = text.split(/(YES|NO(?! result)|→|WRONG|FAILS)/g);
  return (
    <pre className="whitespace-pre-wrap rounded-lg border border-border1 bg-bg2 px-4 py-3 font-mono text-[11.5px] leading-relaxed text-tx2">
      {parts.map((part, i) => {
        if (part === "YES" || part === "NO")
          return (
            <span key={i} className="font-semibold text-tx1">
              {part}
            </span>
          );
        if (part === "→")
          return (
            <span key={i} className="text-blue">
              {part}
            </span>
          );
        if (part === "WRONG" || part === "FAILS")
          return (
            <span key={i} className="text-pink">
              {part}
            </span>
          );
        return part;
      })}
    </pre>
  );
}

export default function PatternCard({ pattern, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const p = pattern;
  const diff = DIFF_STYLES[p.diff] || DIFF_STYLES.medium;

  return (
    <div
      id={`card-${p.id}`}
      className="mb-2.5 overflow-hidden rounded-xl border border-border1 transition-colors hover:border-border2"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 sm:gap-3 bg-bg2 px-3 sm:px-4 py-3.5 text-left transition hover:bg-bg3"
      >
        <span
          className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
          style={{ background: p.color }}
        />
        <span className="min-w-0 flex-1 text-sm font-medium text-tx1">
          {p.label}
        </span>
        <div className="hidden items-center gap-2 sm:flex">
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              color: p.tagColor,
              borderColor: p.tagColor + "50",
              background: p.color + "18",
            }}
          >
            {p.tag}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              color: diff.color,
              background: diff.bg,
              borderColor: diff.border,
            }}
          >
            {p.diff}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:hidden">
          <span
            className="rounded-full border px-1.5 py-0.5 font-mono text-[9px] font-semibold"
            style={{
              color: p.tagColor,
              borderColor: p.tagColor + "50",
              background: p.color + "18",
            }}
          >
            {p.tag}
          </span>
        </div>
        <span
          className="ml-1 text-[10px] text-tx3 transition-transform duration-200"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▶
        </span>
      </button>

      {open && (
        <div className="bg-bg px-4 pb-5">
          <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Complexity
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Time", p.complexity.time],
              ["Space", p.complexity.space],
            ].map(([k, v]) => (
              <span
                key={k}
                className="rounded-full border border-border2 bg-bg2 px-3 py-0.5 font-mono text-[11px] text-tx2"
              >
                {k}: <span className="font-semibold text-tx1">{v}</span>
              </span>
            ))}
          </div>

          <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Signals — use this when:
          </p>
          <div className="space-y-1.5">
            {p.signals.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-tx2">
                <span className="mt-px flex-shrink-0 font-mono text-tx3">
                  →
                </span>
                {s}
              </div>
            ))}
          </div>

          <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Trigger Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {p.keywords.map((k) => (
              <span
                key={k}
                className="rounded border border-border1 bg-bg3 px-2 py-0.5 font-mono text-[11px] text-tx2"
              >
                {k}
              </span>
            ))}
          </div>

          {p.problems?.length > 0 && (
            <>
              <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
                Example LeetCode Problems
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.problems.map((pr) => {
                  const ds = DIFF_STYLES[pr.diff] || DIFF_STYLES.medium;
                  return (
                    <span
                      key={pr.name}
                      className="rounded border px-2 py-0.5 font-mono text-[11px]"
                      style={{
                        color: ds.color,
                        borderColor: ds.border,
                        background: ds.bg,
                      }}
                    >
                      {pr.name}
                    </span>
                  );
                })}
              </div>
            </>
          )}

          <hr className="my-4 border-border1" />

          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Decision Flow
          </p>
          <FlowBox text={p.flow} />

          <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Common Traps
          </p>
          <div className="space-y-2">
            {p.traps.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[12px] text-tx2"
              >
                <span className="flex-shrink-0 text-[11px]">⚠</span>
                {t}
              </div>
            ))}
          </div>

          <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            vs. What It's Confused With
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div
              className="rounded-lg border p-3"
              style={{
                borderColor: p.color + "40",
                background: p.color + "08",
              }}
            >
              <p
                className="mb-1 text-[12px] font-semibold"
                style={{ color: p.color }}
              >
                {p.vs.a.label}
              </p>
              <p className="text-[12px] text-tx2">{p.vs.a.desc}</p>
            </div>
            <div className="rounded-lg border border-border2 bg-bg2 p-3">
              <p className="mb-1 text-[12px] font-semibold text-tx2">
                {p.vs.b.label}
              </p>
              <p className="text-[12px] text-tx2">{p.vs.b.desc}</p>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-pink/20 bg-pink/5 px-3 py-2">
            <span className="text-[11px] font-semibold text-pink">
              NOT this pattern:{" "}
            </span>
            <span className="text-[12px] text-tx2">{p.notThis}</span>
          </div>

          {p.failFast?.length > 0 && (
            <>
              <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
                Instant Rejection Rules
              </p>
              <div className="space-y-1.5">
                {p.failFast.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-0 overflow-hidden rounded-lg border border-border1"
                  >
                    <div className="flex-shrink-0 border-r border-border1 bg-bg3 px-3 py-2 text-[11px] font-medium text-yellow">
                      ✗
                    </div>
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 px-3 py-2">
                      <span className="text-[12px] text-tx2">{f.rule}</span>
                      <span className="font-mono text-[11px] font-semibold text-pink">
                        → {f.verdict}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

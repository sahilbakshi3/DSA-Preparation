import { useState, useMemo } from "react";
import { Shuffle, Eye, CheckCircle, XCircle, Zap, Filter } from "lucide-react";
import { DRILLS } from "../data/drills";

const DIFF = {
  easy: {
    color: "#00ff88",
    bg: "rgba(0,255,136,0.08)",
    border: "rgba(0,255,136,0.25)",
  },
  medium: {
    color: "#f5a623",
    bg: "rgba(245,166,35,0.08)",
    border: "rgba(245,166,35,0.25)",
  },
  hard: {
    color: "#ff3366",
    bg: "rgba(255,51,102,0.08)",
    border: "rgba(255,51,102,0.25)",
  },
};

function DrillCard({ drill, index }) {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState(null);
  const ds = DIFF[drill.diff] || DIFF.medium;

  return (
    <div
      className={`mb-1.5 border rounded-sm transition-colors ${
        rated === "yes"
          ? "border-electric/40"
          : rated === "no"
            ? "border-crimson/40"
            : "border-dim"
      }`}
    >
      <div className="px-4 py-3 bg-surface">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-mono text-[9px] text-muted">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-mono text-[8px] tracking-wider border px-2 py-0.5 rounded-sm"
            style={{
              color: ds.color,
              background: ds.bg,
              borderColor: ds.border,
            }}
          >
            {drill.diff.toUpperCase()}
          </span>
          <span className="font-mono text-[8px] text-muted tracking-wider ml-auto uppercase">
            {drill.category}
          </span>
        </div>

        <p className="text-[13px] text-primary mb-3 leading-relaxed">
          {drill.problem}
        </p>

        <div className="flex flex-wrap gap-1">
          {drill.clues.map((c) => (
            <span
              key={c}
              className="font-mono text-[9px] border border-plasma/30 bg-plasma/10 text-plasma px-2 py-0.5 rounded-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {!revealed ? (
        <div className="border-t border-dim px-4 py-2.5 bg-deep">
          <button
            onClick={() => setRevealed(true)}
            className="btn btn-amber flex items-center gap-2"
          >
            <Eye size={11} />
            REVEAL PATTERN
          </button>
        </div>
      ) : (
        <div className="border-t border-dim bg-deep px-4 py-3">
          <div className="font-mono text-[9px] text-muted tracking-[0.15em] mb-1">
            PATTERN
          </div>
          <p className="font-body text-base font-semibold text-amber mb-1">
            {drill.answer}
          </p>
          <p className="text-[12px] text-secondary mb-3 leading-relaxed">
            {drill.why}
          </p>

          {!rated ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted mr-1">
                GOT IT?
              </span>
              <button
                onClick={() => setRated("yes")}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider border border-electric/40 bg-electric/10 text-electric px-3 py-1.5 rounded-sm hover:bg-electric/20 transition-colors"
              >
                <CheckCircle size={10} /> YES
              </button>
              <button
                onClick={() => setRated("no")}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider border border-crimson/40 bg-crimson/10 text-crimson px-3 py-1.5 rounded-sm hover:bg-crimson/20 transition-colors"
              >
                <XCircle size={10} /> NO — REVIEW
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] font-semibold flex items-center gap-1 ${rated === "yes" ? "text-electric" : "text-crimson"}`}
              >
                {rated === "yes" ? (
                  <CheckCircle size={10} />
                ) : (
                  <XCircle size={10} />
                )}
                {rated === "yes" ? "MARKED KNOWN" : "NEEDS REVIEW"}
              </span>
              <button
                onClick={() => {
                  setRated(null);
                  setRevealed(false);
                }}
                className="font-mono text-[9px] text-muted underline hover:text-secondary"
              >
                reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DrillMode() {
  const [filter, setFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [shuffled, setShuffled] = useState(false);

  const filtered = useMemo(() => {
    let list = DRILLS.filter((d) => {
      const matchCat = filter === "all" || d.category === filter;
      const matchDiff = diffFilter === "all" || d.diff === diffFilter;
      return matchCat && matchDiff;
    });
    if (shuffled) list = [...list].sort(() => Math.random() - 0.5);
    return list;
  }, [filter, diffFilter, shuffled]);

  const CATS = [
    { id: "all", label: "ALL" },
    { id: "array", label: "ARRAY" },
    { id: "graph", label: "GRAPH" },
    { id: "dp", label: "DP" },
  ];
  const DIFFS = ["all", "easy", "medium", "hard"];

  return (
    <div>
      {/* Banner */}
      <div className="mb-4 border border-cyan/30 bg-cyan/5 rounded-sm flex items-start overflow-hidden">
        <div className="border-r border-cyan/20 px-3 py-3 flex-shrink-0 flex items-center">
          <Zap size={14} className="text-cyan" />
        </div>
        <div className="px-4 py-3">
          <p className="font-mono text-[9px] text-cyan tracking-[0.15em] mb-1">
            PATTERN_RECOGNITION_DRILLS
          </p>
          <p className="text-[12px] text-secondary">
            Read problem + clues. Think 5 seconds. Reveal. Trains instinct, not
            knowledge. Goal: instant recognition under pressure.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-1 text-muted">
          <Filter size={10} />
          <span className="font-mono text-[9px] tracking-wider">CAT</span>
        </div>
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`font-mono text-[9px] tracking-wider border px-3 py-1.5 rounded-sm transition-all ${
              filter === c.id
                ? "border-amber text-void bg-amber font-semibold"
                : "border-dim text-muted hover:border-bright hover:text-secondary bg-surface"
            }`}
          >
            {c.label}
          </button>
        ))}

        <div className="w-px h-4 bg-mid mx-1" />

        {DIFFS.map((d) => {
          const ds = DIFF[d];
          const active = diffFilter === d;
          return (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className="font-mono text-[9px] tracking-wider border px-3 py-1.5 rounded-sm transition-all capitalize"
              style={
                active && d !== "all"
                  ? {
                      color: ds.color,
                      background: ds.bg,
                      borderColor: ds.border,
                    }
                  : active
                    ? {
                        color: "#e8e8f0",
                        background: "#12121a",
                        borderColor: "#2a2a3e",
                      }
                    : {
                        color: "#50506a",
                        background: "#0d0d14",
                        borderColor: "#1e1e2e",
                      }
              }
            >
              {d.toUpperCase()}
            </button>
          );
        })}

        <button
          onClick={() => setShuffled((s) => !s)}
          className={`flex items-center gap-1.5 font-mono text-[9px] tracking-wider border px-3 py-1.5 rounded-sm transition-all ml-auto ${
            shuffled
              ? "border-plasma/40 bg-plasma/10 text-plasma"
              : "border-dim text-muted hover:border-bright hover:text-secondary bg-surface"
          }`}
        >
          <Shuffle size={10} />
          {shuffled ? "SHUFFLE ON" : "SHUFFLE"}
        </button>
      </div>

      <p className="font-mono text-[9px] text-muted tracking-wider mb-3">
        {filtered.length} DRILLS
      </p>

      {filtered.map((d, i) => (
        <DrillCard key={`${d.problem}-${i}`} drill={d} index={i} />
      ))}
    </div>
  );
}

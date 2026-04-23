import { useState, useMemo } from "react";
import { DRILLS } from "../data/drills";

const DIFF_COLORS = {
  easy: { color: "#00cc88", bg: "#00cc8815", border: "#00cc8840" },
  medium: { color: "#ffaa00", bg: "#ffaa0015", border: "#ffaa0040" },
  hard: { color: "#ff4488", bg: "#ff448815", border: "#ff448840" },
};

function DrillCard({ drill, index }) {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState(null);
  const ds = DIFF_COLORS[drill.diff] || DIFF_COLORS.medium;

  function reset() {
    setRevealed(false);
    setRated(null);
  }

  return (
    <div
      className={`mb-px border transition-colors ${
        rated === "yes"
          ? "border-green/40"
          : rated === "no"
            ? "border-pink/40"
            : "border-wire2"
      }`}
    >
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[9px] text-tx3">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-mono text-[8px] tracking-wider border px-2 py-0.5"
            style={{
              color: ds.color,
              background: ds.bg,
              borderColor: ds.border,
            }}
          >
            {drill.diff.toUpperCase()}
          </span>
          <span className="font-mono text-[8px] text-tx3 tracking-wider ml-auto">
            {drill.category.toUpperCase()}
          </span>
        </div>
        <p className="font-sans text-sm text-tx1 mb-2">{drill.problem}</p>
        <div className="flex flex-wrap gap-1">
          {drill.clues.map((c) => (
            <span
              key={c}
              className="font-mono text-[9px] border border-blue/30 bg-blue/10 text-blue px-2 py-0.5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {!revealed ? (
        <div className="border-t border-wire px-4 py-2.5">
          <button
            onClick={() => setRevealed(true)}
            className="font-mono text-[9px] tracking-wider border border-wire2 bg-bg2 hover:border-accent hover:text-accent px-4 py-2 transition-all text-tx2"
          >
            REVEAL PATTERN →
          </button>
        </div>
      ) : (
        <div className="border-t border-wire bg-bg2 px-4 py-3">
          <div className="font-mono text-[9px] tracking-[0.15em] text-tx3 mb-1">
            PATTERN
          </div>
          <p className="font-sans text-base font-bold text-accent mb-1">
            {drill.answer}
          </p>
          <p className="font-sans text-[12px] text-tx2 mb-3 leading-relaxed">
            {drill.why}
          </p>

          {!rated ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-tx3 mr-1">
                GOT IT?
              </span>
              <button
                onClick={() => setRated("yes")}
                className="font-mono text-[9px] tracking-wider border border-green/40 bg-green/10 text-green px-3 py-1.5 hover:bg-green/20 transition-colors"
              >
                ✓ YES
              </button>
              <button
                onClick={() => setRated("no")}
                className="font-mono text-[9px] tracking-wider border border-pink/40 bg-pink/10 text-pink px-3 py-1.5 hover:bg-pink/20 transition-colors"
              >
                ✗ NO — REVIEW
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] font-semibold ${rated === "yes" ? "text-green" : "text-pink"}`}
              >
                {rated === "yes" ? "✓ MARKED KNOWN" : "✗ NEEDS REVIEW"}
              </span>
              <button
                onClick={reset}
                className="font-mono text-[9px] text-tx3 underline hover:text-tx2"
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
      <div className="mb-4 border border-blue/30 bg-blue/5 flex items-start gap-0">
        <span className="font-mono text-[9px] text-blue tracking-[0.15em] px-3 py-3 border-r border-blue/20 flex-shrink-0">
          MODE
        </span>
        <div className="px-4 py-3">
          <p className="font-mono text-[10px] text-blue tracking-wider mb-1">
            PATTERN_RECOGNITION_DRILLS
          </p>
          <p className="font-sans text-[12px] text-tx2">
            Read problem + clues. Think 5 seconds. Reveal. This trains instinct,
            not just knowledge. Mark each. Goal: instant recognition under
            pressure.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-px mb-4">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`font-mono text-[9px] tracking-wider border px-3 py-2 transition-all ${
              filter === c.id
                ? "border-accent text-accent bg-accent/10"
                : "border-wire text-tx3 hover:border-wire2 hover:text-tx2 bg-bg2"
            }`}
          >
            {c.label}
          </button>
        ))}
        <div className="w-px h-6 bg-wire mx-2" />
        {DIFFS.map((d) => {
          const ds = DIFF_COLORS[d];
          const active = diffFilter === d;
          return (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className="font-mono text-[9px] tracking-wider border px-3 py-2 transition-all capitalize"
              style={
                active && d !== "all"
                  ? {
                      color: ds.color,
                      background: ds.bg,
                      borderColor: ds.border,
                    }
                  : active
                    ? {
                        color: "#f0f0f0",
                        background: "#1a1a1a",
                        borderColor: "#333",
                      }
                    : {
                        color: "#555",
                        background: "#111",
                        borderColor: "#2a2a2a",
                      }
              }
            >
              {d.toUpperCase()}
            </button>
          );
        })}
        <button
          onClick={() => setShuffled((s) => !s)}
          className={`font-mono text-[9px] tracking-wider border px-3 py-2 transition-all ml-auto ${
            shuffled
              ? "border-purple/40 bg-purple/10 text-purple"
              : "border-wire text-tx3 hover:border-wire2 hover:text-tx2 bg-bg2"
          }`}
        >
          {shuffled ? "SHUFFLE ON" : "SHUFFLE"}
        </button>
      </div>

      <p className="font-mono text-[9px] text-tx3 tracking-wider mb-3">
        {filtered.length} DRILLS
      </p>

      {filtered.map((d, i) => (
        <DrillCard key={`${d.problem}-${i}`} drill={d} index={i} />
      ))}
    </div>
  );
}

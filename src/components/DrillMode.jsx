import { useState, useMemo } from "react";
import { DRILLS } from "../data/drills";

const DIFF_STYLES = {
  easy: { color: "#1D9E75", bg: "#1D9E7520", border: "#1D9E7540" },
  medium: { color: "#c9963a", bg: "#c9963a20", border: "#c9963a40" },
  hard: { color: "#D4537E", bg: "#D4537E20", border: "#D4537E40" },
};

function DrillCard({ drill, index }) {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState(null);
  const ds = DIFF_STYLES[drill.diff] || DIFF_STYLES.medium;

  function reset() {
    setRevealed(false);
    setRated(null);
  }

  return (
    <div
      className={`mb-3 overflow-hidden rounded-xl border transition-all ${
        rated === "yes"
          ? "border-green/40 bg-green/5"
          : rated === "no"
            ? "border-pink/40 bg-pink/5"
            : "border-border1 bg-bg2"
      }`}
    >
      <div className="px-5 py-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-tx3">
            #{index + 1}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              color: ds.color,
              background: ds.bg,
              borderColor: ds.border,
            }}
          >
            {drill.diff}
          </span>
        </div>
        <p className="text-sm font-medium text-tx1">{drill.problem}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {drill.clues.map((c) => (
            <span
              key={c}
              className="rounded border border-blue/30 bg-blue/10 px-2 py-0.5 font-mono text-[10px] text-blue"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {!revealed ? (
        <div className="border-t border-border1 px-5 py-3">
          <button
            onClick={() => setRevealed(true)}
            className="rounded-lg border border-border2 bg-bg3 px-4 py-2 font-mono text-xs font-semibold text-tx2 transition hover:border-accent hover:text-accent"
          >
            Reveal Pattern →
          </button>
        </div>
      ) : (
        <div className="border-t border-border1 px-5 py-4 bg-bg3">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-tx3">
            Pattern
          </div>
          <p className="mb-1 text-base font-bold text-accent">{drill.answer}</p>
          <p className="mb-4 text-xs text-tx2 leading-relaxed">{drill.why}</p>

          {!rated ? (
            <div className="flex gap-2">
              <span className="mr-1 text-xs text-tx3">Got it?</span>
              <button
                onClick={() => setRated("yes")}
                className="rounded-lg border border-green/40 bg-green/10 px-3 py-1.5 font-mono text-xs font-semibold text-green transition hover:bg-green/20"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => setRated("no")}
                className="rounded-lg border border-pink/40 bg-pink/10 px-3 py-1.5 font-mono text-xs font-semibold text-pink transition hover:bg-pink/20"
              >
                ✗ No — review it
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xs font-semibold ${rated === "yes" ? "text-green" : "text-pink"}`}
              >
                {rated === "yes" ? "✓ Marked as known" : "✗ Needs review"}
              </span>
              <button
                onClick={reset}
                className="font-mono text-[11px] text-tx3 underline hover:text-tx2"
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
    { id: "all", label: "All" },
    { id: "array", label: "Array/String" },
    { id: "graph", label: "Graph/Tree" },
    { id: "dp", label: "DP/Misc" },
  ];
  const DIFFS = ["all", "easy", "medium", "hard"];

  return (
    <div>
      <div className="mb-5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
        <p className="text-sm font-semibold text-accent">
          🧠 Pattern Recognition Drills
        </p>
        <p className="mt-1 text-xs text-tx2">
          Read the problem + clues. Think for 5 seconds. Then reveal. This
          trains the instinct, not just knowledge. Mark each as known or needing
          review. The goal: instant recognition under pressure.
        </p>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              filter === c.id
                ? "border-border2 bg-bg4 text-tx1"
                : "border-border1 bg-bg2 text-tx3 hover:text-tx2"
            }`}
          >
            {c.label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {DIFFS.map((d) => {
            const ds = DIFF_STYLES[d];
            return (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-all capitalize"
                style={
                  diffFilter === d && d !== "all"
                    ? {
                        color: ds.color,
                        background: ds.bg,
                        borderColor: ds.border,
                      }
                    : diffFilter === d
                      ? {
                          color: "#e8eaf0",
                          background: "#222736",
                          borderColor: "#343b50",
                        }
                      : {
                          color: "#5c6480",
                          background: "#13161d",
                          borderColor: "#2a2f3d",
                        }
                }
              >
                {d}
              </button>
            );
          })}
          <button
            onClick={() => setShuffled((s) => !s)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              shuffled
                ? "border-purple/40 bg-purple/10 text-purple"
                : "border-border1 bg-bg2 text-tx3 hover:text-tx2"
            }`}
          >
            Shuffle
          </button>
        </div>
      </div>

      <p className="mb-4 font-mono text-[11px] text-tx3">
        {filtered.length} drills
      </p>

      {filtered.map((d, i) => (
        <DrillCard key={`${d.problem}-${i}`} drill={d} index={i} />
      ))}
    </div>
  );
}

import {
  Brain,
  GitBranch,
  Zap,
  Cpu,
  Database,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";

const CAT_BADGES = [
  { label: "ARRAY / STRING", color: "#00d4ff", icon: "▸" },
  { label: "SORTING", color: "#ff6b8b", icon: "▸" },
  { label: "GRAPH / TREE", color: "#00ff88", icon: "▸" },
  { label: "DP / RECURSION", color: "#7c6af7", icon: "▸" },
  { label: "SYS DESIGN", color: "#f5a623", icon: "▸" },
];

export default function Header({ totalCount, categoryCounts }) {
  // const now = new Date();
  // const stamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  return (
    <header className="relative border-b border-mid overflow-hidden grid-bg">
      {/* Main header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left: title block */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={12} className="text-amber" />
              <span className="font-mono text-[9px] text-amber tracking-[0.25em]">
                INTERVIEW_PREP_OS
              </span>
              <span className="font-mono text-[9px] text-muted">
                // DSA · PATTERNS · SYSDESIGN
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl leading-[0.9] tracking-tight text-primary mb-3">
              DSA
              <br />
              <span className="text-amber">PATTERN</span>
              <br />
              RECON
            </h1>

            <p className="font-mono text-[11px] text-secondary max-w-sm leading-relaxed">
              Signal mapping for NeetCode All + Beyond.
              <br />
              Every pattern: complexity, triggers, traps, decisions.
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {CAT_BADGES.map((b) => (
                <span
                  key={b.label}
                  className="font-mono text-[9px] tracking-wider border px-2.5 py-1 rounded-sm"
                  style={{
                    color: b.color,
                    borderColor: b.color + "44",
                    background: b.color + "0d",
                  }}
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stats + action */}
          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="https://github.com/sahilbakshi3/Leetcode-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-amber flex items-center gap-2 self-start lg:self-auto"
            >
              <ExternalLink size={11} />
              <span>SOLUTIONS_REPO</span>
              <Zap size={9} />
            </a>

            {/* Stat grid */}
            <div
              className="grid grid-cols-5 border border-mid bg-surface"
              style={{ minWidth: 360 }}
            >
              {[
                {
                  val: totalCount,
                  label: "TOTAL",
                  color: "#f5a623",
                  icon: <Brain size={10} />,
                },
                {
                  val: categoryCounts?.array || 0,
                  label: "ARRAY",
                  color: "#00d4ff",
                  icon: <Cpu size={10} />,
                },
                {
                  val: categoryCounts?.sorting || 0,
                  label: "SORT",
                  color: "#ff6b8b",
                  icon: <ArrowUpDown size={10} />,
                },
                {
                  val: categoryCounts?.graph || 0,
                  label: "GRAPH",
                  color: "#00ff88",
                  icon: <GitBranch size={10} />,
                },
                {
                  val: categoryCounts?.dp || 0,
                  label: "DP",
                  color: "#7c6af7",
                  icon: <Database size={10} />,
                },
              ].map(({ val, label, color, icon }) => (
                <div
                  key={label}
                  className="px-4 py-3 border-r border-dim last:border-r-0 text-center"
                >
                  <div className="flex justify-center mb-1" style={{ color }}>
                    {icon}
                  </div>
                  <div
                    className="font-display text-2xl leading-none"
                    style={{ color }}
                  >
                    {val}
                  </div>
                  <div className="font-mono text-[8px] text-muted tracking-wider mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini ticker */}
            <div
              className="overflow-hidden border border-dim bg-deep h-6 w-full"
              style={{ maxWidth: 280 }}
            >
              <div className="ticker flex items-center h-full">
                {[
                  "TWO POINTERS",
                  "SLIDING WINDOW",
                  "BINARY SEARCH",
                  "DFS/BFS",
                  "DYNAMIC PROG",
                  "BACKTRACKING",
                  "UNION FIND",
                  "DIJKSTRA",
                  "TWO POINTERS",
                  "SLIDING WINDOW",
                  "BINARY SEARCH",
                  "DFS/BFS",
                  "DYNAMIC PROG",
                  "BACKTRACKING",
                  "UNION FIND",
                  "DIJKSTRA",
                ].map((t, i) => (
                  <span
                    key={i}
                    className="font-mono text-[8px] text-muted tracking-widest whitespace-nowrap px-4"
                  >
                    <span className="text-amber mr-2">▸</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

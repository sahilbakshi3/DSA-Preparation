const CAT_BADGES = [
  { label: "ARRAY/STRING", color: "#4488ff" },
  { label: "GRAPH/TREE", color: "#00cc88" },
  { label: "DP/RECURSION", color: "#ff4488" },
  { label: "SYSTEM DESIGN", color: "#aaff00" },
];

export default function Header({ totalCount, categoryCounts }) {
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="relative border-b border-wire2 grid-paper overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-7">
        {/* Top row */}
        <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] text-tx3 tracking-[0.2em] uppercase">
                SYS
              </span>
              <span className="w-4 h-px bg-wire2" />
              <span className="font-mono text-[9px] text-accent tracking-[0.2em] uppercase">
                INTERVIEW_PREP
              </span>
              <span className="w-4 h-px bg-wire2" />
              <span className="font-mono text-[9px] text-tx3">{stamp}</span>
              <span className="blink font-mono text-[9px] text-accent">_</span>
            </div>

            <h1 className="font-display text-[2.1rem] leading-none tracking-wider text-tx1 sm:text-6xl">
              DSA PATTERN <span className="text-accent">RECON</span>
            </h1>
            <p className="font-mono text-[11px] text-tx3 mt-1.5 max-w-md leading-relaxed">
              Signal mapping for NeetCode All + Beyond. Every pattern:
              complexity, triggers, traps, decision flows.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-shrink-0 lg:items-end">
            <a
              href="https://github.com/sahilbakshi3/Leetcode-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-wire2 bg-bg2 px-3 py-2 font-mono text-[10px] text-tx2 transition-all hover:border-accent hover:text-accent lg:w-auto"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              SOLUTIONS_REPO ↗
            </a>

            {/* Stats block */}
            <div className="flex w-full divide-x divide-wire border border-wire bg-bg2 text-center lg:w-auto">
              {[
                { val: totalCount, label: "PATTERNS" },
                { val: categoryCounts?.array || 0, label: "ARRAY" },
                { val: categoryCounts?.graph || 0, label: "GRAPH" },
                { val: categoryCounts?.dp || 0, label: "DP" },
              ].map(({ val, label }) => (
                <div key={label} className="min-w-0 flex-1 px-3 py-2">
                  <div className="font-display text-xl text-accent leading-none">
                    {val}
                  </div>
                  <div className="mt-0.5 truncate font-mono text-[8px] tracking-wider text-tx3">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {CAT_BADGES.map((b) => (
            <span
              key={b.label}
              className="font-mono text-[9px] tracking-[0.12em] border px-2.5 py-1"
              style={{
                color: b.color,
                borderColor: b.color + "44",
                background: b.color + "0d",
              }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const CAT_BADGES = [
  { label: "Array/String", color: "#3B8BD4", bg: "#3B8BD415" },
  { label: "Graph/Tree", color: "#1D9E75", bg: "#1D9E7515" },
  { label: "DP/Recursion", color: "#D4537E", bg: "#D4537E15" },
];

export default function Header({ totalCount }) {
  return (
    <div className="relative overflow-hidden border-b border-border1 bg-bg2">
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle,#e8593c12 0%,transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
            Interview Prep · NeetCode All + Beyond
          </p>
          <a
            href="https://github.com/sahilbakshi3/Leetcode-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border2 bg-bg3 px-3 py-1.5 font-mono text-[11px] font-semibold text-tx2 transition-all hover:border-accent hover:text-accent"
          >
            {/* TODO: change svg to lucide react icons */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Solutions Repo
          </a>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight leading-tight">
          DSA Pattern <span className="text-accent">Recognition</span>{" "}
          Cheatsheet
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-tx2">
          Signal → pattern mapping. Every card has complexity, example problems,
          decision flow, and common traps. Search or filter to navigate.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CAT_BADGES.map((b) => (
            <span
              key={b.label}
              className="rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold tracking-wide"
              style={{
                color: b.color,
                borderColor: b.color + "60",
                background: b.bg,
              }}
            >
              {b.label}
            </span>
          ))}
          <span
            className="rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold tracking-wide"
            style={{
              color: "#e8593c",
              borderColor: "#e8593c60",
              background: "#e8593c10",
            }}
          >
            {totalCount} Total Patterns
          </span>
        </div>
      </div>
    </div>
  );
}

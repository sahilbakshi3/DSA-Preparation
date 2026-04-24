import { useState } from "react";
import {
  ChevronRight,
  Clock,
  HardDrive,
  AlertTriangle,
  Lightbulb,
  XCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const DIFF_STYLES = {
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

function FlowBox({ text }) {
  const parts = text.split(/(YES|NO(?! result)|→|WRONG|FAILS)/g);
  return (
    <pre className="whitespace-pre-wrap rounded-sm border border-dim bg-deep px-4 py-3 font-mono text-[11px] leading-relaxed text-secondary overflow-x-auto">
      {parts.map((part, i) => {
        if (part === "YES")
          return (
            <span key={i} className="text-electric font-semibold">
              {part}
            </span>
          );
        if (part === "NO")
          return (
            <span key={i} className="text-crimson font-semibold">
              {part}
            </span>
          );
        if (part === "→")
          return (
            <span key={i} className="text-amber">
              {part}
            </span>
          );
        if (part === "WRONG" || part === "FAILS")
          return (
            <span key={i} className="text-crimson">
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
      className="mb-1.5 overflow-hidden rounded-sm border border-dim transition-all hover:border-mid"
      style={{
        borderLeftColor: open ? p.color : undefined,
        borderLeftWidth: open ? 2 : 1,
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-raised bg-surface"
      >
        {/* Color dot */}
        <span
          className="w-2 h-2 flex-shrink-0 rounded-full"
          style={{ background: p.color }}
        />

        {/* Label */}
        <span className="flex-1 font-body text-[13px] font-medium text-primary truncate">
          {p.label}
        </span>

        {/* Badges - desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            className="chip"
            style={{
              color: p.tagColor,
              borderColor: p.tagColor + "50",
              background: p.color + "14",
            }}
          >
            {p.tag}
          </span>
          <span
            className="chip"
            style={{
              color: diff.color,
              background: diff.bg,
              borderColor: diff.border,
            }}
          >
            {p.diff.toUpperCase()}
          </span>
          <span className="font-mono text-[9px] text-muted ml-1">
            {p.complexity.time}
          </span>
        </div>

        {/* Chevron */}
        <ChevronRight
          size={14}
          className="text-muted transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-dim bg-deep px-4 py-5 fade-up">
          {/* Complexity row */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2 border border-dim bg-surface px-3 py-1.5 rounded-sm">
              <Clock size={11} className="text-muted" />
              <span className="font-mono text-[10px] text-muted">TIME</span>
              <span className="font-mono text-[11px] font-semibold text-amber">
                {p.complexity.time}
              </span>
            </div>
            <div className="flex items-center gap-2 border border-dim bg-surface px-3 py-1.5 rounded-sm">
              <HardDrive size={11} className="text-muted" />
              <span className="font-mono text-[10px] text-muted">SPACE</span>
              <span className="font-mono text-[11px] font-semibold text-cyan">
                {p.complexity.space}
              </span>
            </div>
          </div>

          {/* Signals */}
          <div className="mb-5">
            <div className="section-label mb-2 flex items-center gap-1.5">
              <ArrowRight size={9} className="text-electric" />
              SIGNALS — USE THIS WHEN
            </div>
            <div className="space-y-1.5">
              {p.signals.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-[12px] text-secondary"
                >
                  <span className="flex-shrink-0 text-electric font-mono text-[10px] mt-0.5">
                    ▸
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="mb-5">
            <div className="section-label mb-2">TRIGGER KEYWORDS</div>
            <div className="flex flex-wrap gap-1.5">
              {p.keywords.map((k) => (
                <span
                  key={k}
                  className="font-mono text-[10px] border border-mid bg-raised px-2 py-0.5 text-secondary rounded-sm"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Problems */}
          {p.problems?.length > 0 && (
            <div className="mb-5">
              <div className="section-label mb-2 flex items-center gap-1.5">
                <ExternalLink size={9} />
                EXAMPLE LEETCODE PROBLEMS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.problems.map((pr) => {
                  const ds = DIFF_STYLES[pr.diff] || DIFF_STYLES.medium;
                  return (
                    <span
                      key={pr.name}
                      className="font-mono text-[10px] border px-2 py-0.5 rounded-sm"
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
            </div>
          )}

          {/* Divider */}
          <div className="hr-label my-4">DECISION FLOW</div>

          {/* Flow */}
          <FlowBox text={p.flow} />

          {/* Traps */}
          <div className="mt-5 mb-5">
            <div className="section-label mb-2 flex items-center gap-1.5">
              <AlertTriangle size={9} className="text-amber" />
              COMMON TRAPS
            </div>
            <div className="space-y-2">
              {p.traps.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-[12px] text-secondary border border-amber/20 bg-amber/5 px-3 py-2 rounded-sm"
                >
                  <AlertTriangle
                    size={11}
                    className="flex-shrink-0 text-amber mt-0.5"
                  />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* VS comparison */}
          <div className="section-label mb-2 flex items-center gap-1.5">
            <Lightbulb size={9} className="text-plasma" />
            CONFUSED WITH
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div
              className="border rounded-sm p-3"
              style={{
                borderColor: p.color + "40",
                background: p.color + "08",
              }}
            >
              <p
                className="font-mono text-[10px] font-semibold mb-1"
                style={{ color: p.color }}
              >
                {p.vs.a.label}
              </p>
              <p className="text-[12px] text-secondary">{p.vs.a.desc}</p>
            </div>
            <div className="border border-mid bg-raised rounded-sm p-3">
              <p className="font-mono text-[10px] font-semibold text-secondary mb-1">
                {p.vs.b.label}
              </p>
              <p className="text-[12px] text-secondary">{p.vs.b.desc}</p>
            </div>
          </div>

          {/* Not this */}
          <div className="border border-crimson/20 bg-crimson/5 rounded-sm px-3 py-2 mb-4 flex items-start gap-2">
            <XCircle size={12} className="flex-shrink-0 text-crimson mt-0.5" />
            <div>
              <span className="font-mono text-[10px] font-semibold text-crimson">
                NOT THIS PATTERN:{" "}
              </span>
              <span className="text-[12px] text-secondary">{p.notThis}</span>
            </div>
          </div>

          {/* Fail Fast */}
          {p.failFast?.length > 0 && (
            <>
              <div className="section-label mb-2">INSTANT REJECTION RULES</div>
              <div className="space-y-1.5">
                {p.failFast.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-stretch overflow-hidden border border-dim rounded-sm"
                  >
                    <div className="flex-shrink-0 border-r border-dim bg-raised px-3 py-2 font-mono text-[10px] text-amber flex items-center">
                      ✗
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 px-3 py-2">
                      <span className="text-[12px] text-secondary">
                        {f.rule}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-crimson">
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

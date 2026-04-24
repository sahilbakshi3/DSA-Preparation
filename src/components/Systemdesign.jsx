import { useState } from "react";
import {
  Server,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  SYSTEM_DESIGN_TOPICS,
  SYSTEM_DESIGN_FRAMEWORK,
} from "../data/sysdesign";

function FrameworkBar() {
  return (
    <div className="mb-6 border border-mid rounded-sm overflow-hidden">
      <div className="border-b border-dim px-4 py-2.5 bg-raised flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={11} className="text-amber" />
          <span className="font-mono text-[9px] text-amber tracking-[0.15em]">
            INTERVIEW_FRAMEWORK
          </span>
        </div>
        <span className="font-mono text-[9px] text-muted">
          45 MIN STRUCTURE
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-dim">
        {SYSTEM_DESIGN_FRAMEWORK.map((s) => (
          <div
            key={s.step}
            className="p-4 bg-surface"
            style={{ borderTop: `2px solid ${s.color}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="font-display text-2xl"
                style={{ color: s.color }}
              >
                {s.step}
              </span>
              <span
                className="font-mono text-[8px] border px-1.5 py-0.5 rounded-sm"
                style={{
                  color: s.color,
                  borderColor: s.color + "40",
                  background: s.color + "10",
                }}
              >
                {s.duration}
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-wider text-primary mb-2">
              {s.title}
            </div>
            <ul className="space-y-1">
              {s.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[10px] text-secondary font-sans"
                >
                  <span
                    className="flex-shrink-0 mt-0.5 font-bold"
                    style={{ color: s.color }}
                  >
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicCard({ topic }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="mb-1.5 border border-dim rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center text-left hover:bg-raised transition-colors group"
        style={{ borderLeft: `2px solid ${open ? topic.color : "#2a2a3e"}` }}
      >
        <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0">
          <span className="font-body text-[13px] font-medium text-secondary group-hover:text-primary transition-colors">
            {topic.label}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 flex-shrink-0">
          <span
            className="font-mono text-[8px] tracking-wider border px-2 py-0.5 rounded-sm"
            style={{
              color: topic.color,
              borderColor: topic.color + "44",
              background: topic.color + "0d",
            }}
          >
            {topic.tag}
          </span>
          {open ? (
            <ChevronDown size={12} className="text-muted" />
          ) : (
            <ChevronRight size={12} className="text-muted" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-dim bg-deep fade-up">
          {/* Section tabs */}
          <div className="flex border-b border-dim bg-surface overflow-x-auto">
            {topic.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`font-mono text-[9px] tracking-wider px-4 py-2.5 border-r border-dim whitespace-nowrap flex-shrink-0 transition-colors ${
                  activeSection === i
                    ? "text-amber bg-amber/10"
                    : "text-muted hover:text-secondary"
                }`}
              >
                {s.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Section content */}
          <div className="p-4">
            <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed text-secondary overflow-x-auto">
              {topic.sections[activeSection].content}
            </pre>
          </div>

          {/* Traps + questions */}
          <div className="border-t border-dim grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dim">
            <div className="p-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-amber tracking-[0.15em] mb-3">
                <AlertTriangle size={10} />
                COMMON MISTAKES
              </div>
              <div className="space-y-2">
                {topic.traps.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[11px] text-secondary font-mono leading-relaxed border border-amber/15 bg-amber/5 px-3 py-2 rounded-sm"
                  >
                    <AlertTriangle
                      size={10}
                      className="text-amber flex-shrink-0 mt-0.5"
                    />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan tracking-[0.15em] mb-3">
                <HelpCircle size={10} />
                PRACTICE QUESTIONS
              </div>
              <div className="space-y-2">
                {topic.questions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[12px] text-secondary font-sans"
                  >
                    <span className="font-mono text-cyan flex-shrink-0 mt-0.5">
                      →
                    </span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SystemDesign() {
  const [filter, setFilter] = useState("all");
  const tags = ["all", ...new Set(SYSTEM_DESIGN_TOPICS.map((t) => t.tag))];
  const filtered =
    filter === "all"
      ? SYSTEM_DESIGN_TOPICS
      : SYSTEM_DESIGN_TOPICS.filter((t) => t.tag === filter);

  return (
    <div>
      {/* Banner */}
      <div className="mb-4 border border-electric/30 bg-electric/5 rounded-sm flex items-start overflow-hidden">
        <div className="border-r border-electric/20 px-3 py-3 flex-shrink-0 flex items-center">
          <Server size={14} className="text-electric" />
        </div>
        <div className="px-4 py-3">
          <p className="font-mono text-[9px] text-electric tracking-[0.15em] mb-1">
            SYSTEM_DESIGN_PREP
          </p>
          <p className="text-[12px] text-secondary">
            Core concepts, trade-offs, frameworks. CAP theorem to Kafka to
            back-of-envelope. Interview framework first.
          </p>
        </div>
      </div>

      <FrameworkBar />

      {/* Filter */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`font-mono text-[9px] tracking-wider border px-3 py-1.5 rounded-sm transition-all ${
              filter === tag
                ? "border-electric text-void bg-electric font-semibold"
                : "border-dim text-muted hover:border-bright hover:text-secondary bg-surface"
            }`}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}

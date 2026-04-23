import { useState } from "react";
import {
  SYSTEM_DESIGN_TOPICS,
  SYSTEM_DESIGN_FRAMEWORK,
} from "../data/sysdesign";

function FrameworkBar() {
  return (
    <div className="mb-6 border border-wire2">
      <div className="border-b border-wire px-4 py-2 flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.15em] text-tx3">
          INTERVIEW_FRAMEWORK
        </span>
        <span className="flex-1 h-px bg-wire" />
        <span className="font-mono text-[9px] text-tx3">45 MIN STRUCTURE</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-wire">
        {SYSTEM_DESIGN_FRAMEWORK.map((s) => (
          <div
            key={s.step}
            className="p-4"
            style={{ borderTop: `2px solid ${s.color}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="font-display text-2xl"
                style={{ color: s.color }}
              >
                {s.step}
              </span>
              <span className="font-mono text-[8px] text-tx3 border border-wire px-1.5 py-0.5">
                {s.duration}
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-wider text-tx1 mb-2">
              {s.title}
            </div>
            <ul className="space-y-1">
              {s.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[10px] text-tx3 font-sans"
                >
                  <span
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: s.color }}
                  >
                    ·
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
    <div className="mb-px border border-wire2 fadein">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center text-left hover:bg-bg2 transition-colors group"
        style={{ borderLeft: `2px solid ${open ? topic.color : "#2a2a2a"}` }}
      >
        <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0">
          <span className="font-sans text-sm font-semibold text-tx2 group-hover:text-tx1 transition-colors">
            {topic.label}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 flex-shrink-0">
          <span
            className="font-mono text-[8px] tracking-wider border px-2 py-0.5"
            style={{
              color: topic.color,
              borderColor: topic.color + "44",
              background: topic.color + "0d",
            }}
          >
            {topic.tag}
          </span>
          <span className="font-mono text-[9px] text-tx3 ml-1 w-4 text-center">
            {open ? "−" : "+"}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-wire2 bg-bg">
          {/* Section tabs */}
          <div className="flex border-b border-wire bg-bg2 overflow-x-auto">
            {topic.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`font-mono text-[9px] tracking-wider px-4 py-2.5 border-r border-wire whitespace-nowrap flex-shrink-0 transition-colors ${
                  activeSection === i
                    ? "text-accent bg-accent/10"
                    : "text-tx3 hover:text-tx2"
                }`}
              >
                {s.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Section content */}
          <div className="p-4">
            <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed text-tx2">
              {topic.sections[activeSection].content}
            </pre>
          </div>

          {/* Traps + questions */}
          <div className="border-t border-wire grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-wire">
            <div className="p-4">
              <div className="font-mono text-[9px] tracking-[0.15em] text-yellow mb-2">
                ⚠ COMMON MISTAKES
              </div>
              <div className="space-y-1.5">
                {topic.traps.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[11px] text-tx2 font-mono leading-relaxed"
                  >
                    <span className="text-yellow flex-shrink-0 mt-0.5">!</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="font-mono text-[9px] tracking-[0.15em] text-blue mb-2">
                PRACTICE QUESTIONS
              </div>
              <div className="space-y-1.5">
                {topic.questions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[12px] text-tx2 font-sans"
                  >
                    <span className="font-mono text-blue flex-shrink-0 mt-0.5">
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
      <div className="mb-4 border border-lime/30 bg-lime/5 flex items-start gap-0">
        <span className="font-mono text-[9px] text-lime tracking-[0.15em] px-3 py-3 border-r border-lime/20 flex-shrink-0">
          SYS
        </span>
        <div className="px-4 py-3">
          <p className="font-mono text-[10px] text-lime tracking-wider mb-1">
            SYSTEM_DESIGN_PREP
          </p>
          <p className="font-sans text-[12px] text-tx2">
            Core concepts, trade-offs, and frameworks. CAP theorem to Kafka to
            back-of-envelope. Interview framework first, then dive into topics.
          </p>
        </div>
      </div>

      <FrameworkBar />

      {/* Filter */}
      <div className="flex gap-px flex-wrap mb-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`font-mono text-[9px] tracking-wider border px-3 py-2 transition-all ${
              filter === tag
                ? "border-lime text-lime bg-lime/10"
                : "border-wire text-tx3 hover:border-wire2 hover:text-tx2 bg-bg2"
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

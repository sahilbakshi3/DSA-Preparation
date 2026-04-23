import { DECISION_SECTIONS } from "../data/patterns";

export default function DecisionGuide() {
  return (
    <div className="space-y-6">
      {DECISION_SECTIONS.map((section) => (
        <div key={section.title} className="border border-wire2">
          {/* Section header */}
          <div
            className="px-4 py-3 border-b border-wire flex items-center gap-3"
            style={{ borderLeft: `3px solid ${section.color}` }}
          >
            <h2 className="font-mono text-[10px] tracking-[0.12em] text-tx1">
              {section.title.toUpperCase()}
            </h2>
          </div>

          <div className="divide-y divide-wire">
            {section.nodes.map((node, i) => {
              if (node.type === "q") {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-0"
                    style={{ borderLeft: `2px solid ${section.color}` }}
                  >
                    <span
                      className="font-mono text-[8px] tracking-wider px-3 py-3 border-r border-wire flex-shrink-0"
                      style={{ color: section.color }}
                    >
                      Q
                    </span>
                    <p className="px-4 py-3 font-sans text-[12px] text-tx1">
                      {node.text}
                    </p>
                  </div>
                );
              }
              if (node.type === "a") {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-0 bg-bg2 border-l-2 border-green/50"
                  >
                    <span className="font-mono text-[8px] text-green px-3 py-3 border-r border-wire flex-shrink-0">
                      →
                    </span>
                    <p className="px-4 py-3 font-sans text-[12px] text-tx2">
                      {node.text}
                    </p>
                  </div>
                );
              }
              if (node.type === "warn") {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-0 bg-yellow/5 border-l-2 border-yellow/50"
                  >
                    <span className="font-mono text-[8px] text-yellow px-3 py-3 border-r border-wire flex-shrink-0">
                      !
                    </span>
                    <p className="px-4 py-3 font-sans text-[12px] text-tx2">
                      {node.text}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

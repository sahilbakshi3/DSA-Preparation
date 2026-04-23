import { DECISION_SECTIONS } from "../data/patterns";

export default function DecisionGuide() {
  return (
    <div className="space-y-8">
      {DECISION_SECTIONS.map((section) => (
        <div key={section.title}>
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-5 w-1 flex-shrink-0 rounded-full"
              style={{ background: section.color }}
            />
            <h2 className="text-base font-semibold text-tx1">
              {section.title}
            </h2>
          </div>
          <div className="space-y-2">
            {section.nodes.map((node, i) => {
              if (node.type === "q") {
                return (
                  <div key={i}>
                    <div
                      className="rounded-lg border-l-[3px] bg-bg2 px-4 py-2.5 text-sm text-tx1"
                      style={{ borderLeftColor: section.color }}
                    >
                      <span
                        className="mr-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
                        style={{
                          color: section.color,
                          background: section.color + "20",
                          border: `1px solid ${section.color}40`,
                        }}
                      >
                        Q
                      </span>
                      {node.text}
                    </div>
                    <div className="ml-9 h-3 w-px bg-border2" />
                  </div>
                );
              }
              if (node.type === "a") {
                return (
                  <div key={i} className="ml-6">
                    <div className="rounded-lg border-l-[3px] border-green bg-bg3 px-4 py-2.5 text-sm text-tx2">
                      <span className="mr-2 inline-block rounded-full border border-green/40 bg-green/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-green">
                        →
                      </span>
                      {node.text}
                    </div>
                    <div className="h-2" />
                  </div>
                );
              }
              if (node.type === "warn") {
                return (
                  <div
                    key={i}
                    className="ml-6 rounded-lg border-l-[3px] border-yellow bg-bg3 px-4 py-2.5 text-sm text-tx2"
                  >
                    {node.text}
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

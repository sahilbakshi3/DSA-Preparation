import { useMemo, useState } from "react";
import { DECISION_SECTIONS } from "../data/patterns";

function buildSteps(nodes) {
  const steps = [];

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (node.type === "q") {
      const next = nodes[i + 1];
      steps.push({
        kind: "step",
        question: node.text,
        answer: next?.type === "a" ? next.text : "Use your best-fit pattern and validate with constraints.",
      });
      if (next?.type === "a") i += 1;
      continue;
    }

    if (node.type === "warn") {
      steps.push({ kind: "warn", text: node.text });
    }
  }

  return steps;
}

export default function DecisionGuide() {
  const [activeBySection, setActiveBySection] = useState({});
  const [revealedBySection, setRevealedBySection] = useState({});

  const preparedSections = useMemo(
    () =>
      DECISION_SECTIONS.map((section) => ({
        ...section,
        steps: buildSteps(section.nodes),
      })),
    []
  );

  return (
    <div className="space-y-6">
      {preparedSections.map((section) => {
        const sectionId = section.title;
        const steps = section.steps;
        const currentStep = Math.min(activeBySection[sectionId] ?? 0, Math.max(steps.length - 1, 0));
        const isRevealed = revealedBySection[sectionId] ?? false;
        const hasNext = currentStep < steps.length - 1;
        const step = steps[currentStep];

        return (
          <div key={section.title} className="border border-wire2 bg-bg1">
            <div
              className="px-4 py-3 border-b border-wire flex items-center justify-between gap-3"
              style={{ borderLeft: `3px solid ${section.color}` }}
            >
              <h2 className="font-mono text-[10px] tracking-[0.12em] text-tx1">
                {section.title.toUpperCase()}
              </h2>
              <span className="font-mono text-[10px] text-tx2">
                STEP {Math.min(currentStep + 1, steps.length)} / {steps.length}
              </span>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                {steps.map((_, idx) => (
                  <div
                    key={`${sectionId}-dot-${idx}`}
                    className="h-1.5 flex-1 transition-all"
                    style={{
                      backgroundColor:
                        idx <= currentStep ? section.color : "var(--wire, #1f2f3f)",
                      opacity: idx <= currentStep ? 1 : 0.45,
                    }}
                  />
                ))}
              </div>

              {step?.kind === "step" ? (
                <>
                  <div className="rounded-sm border border-wire2 bg-bg2/40">
                    <p className="px-3 pt-3 font-mono text-[9px] tracking-[0.12em]" style={{ color: section.color }}>
                      DECISION NODE
                    </p>
                    <p className="px-3 pb-3 pt-1 text-[13px] text-tx1">{step.question}</p>
                  </div>

                  {isRevealed ? (
                    <div className="rounded-sm border border-green/30 bg-green/5">
                      <p className="px-3 pt-3 font-mono text-[9px] tracking-[0.12em] text-green">PATH RECOMMENDATION</p>
                      <p className="px-3 pb-3 pt-1 text-[13px] text-tx2">{step.answer}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="px-3 py-2 border border-wire2 text-[11px] font-mono tracking-wide hover:border-green hover:text-green transition-colors"
                      onClick={() =>
                        setRevealedBySection((prev) => ({
                          ...prev,
                          [sectionId]: true,
                        }))
                      }
                    >
                      Reveal recommended path
                    </button>
                  )}
                </>
              ) : (
                <div className="rounded-sm border border-yellow/40 bg-yellow/5">
                  <p className="px-3 pt-3 font-mono text-[9px] tracking-[0.12em] text-yellow">IMPORTANT CHECK</p>
                  <p className="px-3 pb-3 pt-1 text-[13px] text-tx2">{step?.text}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-2 border border-wire2 text-[11px] font-mono tracking-wide hover:border-tx2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => {
                    setActiveBySection((prev) => ({
                      ...prev,
                      [sectionId]: Math.max((prev[sectionId] ?? 0) - 1, 0),
                    }));
                    setRevealedBySection((prev) => ({ ...prev, [sectionId]: true }));
                  }}
                  disabled={currentStep === 0}
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  className="px-3 py-2 border border-wire2 text-[11px] font-mono tracking-wide hover:border-green hover:text-green transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => {
                    setActiveBySection((prev) => ({
                      ...prev,
                      [sectionId]: hasNext ? (prev[sectionId] ?? 0) + 1 : 0,
                    }));
                    setRevealedBySection((prev) => ({
                      ...prev,
                      [sectionId]: hasNext ? false : true,
                    }));
                  }}
                  disabled={steps.length === 0}
                >
                  {hasNext ? "Next decision →" : "Restart flow ↺"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

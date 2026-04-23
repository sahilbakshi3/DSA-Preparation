import React from "react";

const TABS = [
  { id: "patterns", label: "PATTERNS", short: "PAT" },
  { id: "templates", label: "TEMPLATES", short: "TPL" },
  { id: "drills", label: "DRILLS", short: "DRL" },
  { id: "sysdesign", label: "SYS DESIGN", short: "SYS" },
  { id: "complexity", label: "COMPLEXITY", short: "BIG-O" },
  { id: "decision", label: "DECISION", short: "DEC" },
];

const TabBar = ({ active, onChange }) => {
  return (
    <div className="mb-6 overflow-x-auto border border-wire2 bg-bg2">
      <div className="flex min-w-max">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative px-4 py-3 font-mono text-[10px] tracking-[0.12em] transition-all whitespace-nowrap
            ${
              active === t.id
                ? "bg-accent text-white"
                : "text-tx3 hover:text-tx1 hover:bg-bg3"
            }
            ${i !== TABS.length - 1 ? "border-r border-wire" : ""}
          `}
          >
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.short}</span>
          </button>
        ))}
        <div className="flex-1 border-l border-wire" />
      </div>
    </div>
  );
};

export default TabBar;

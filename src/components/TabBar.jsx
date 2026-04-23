import React from "react";

const TABS = [
  { id: "patterns", label: "🗂 Patterns" },
  { id: "templates", label: "⌨ Code Templates" },
  { id: "drills", label: "🧠 Drills" },
  { id: "complexity", label: "⏱ Complexity" },
  { id: "decision", label: "🔀 Decision Guide" },
];

const TabBar = ({ active, onChange }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-border1 bg-bg2 p-1">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-lg px-4 py-2 text-xs font-medium font-sans transtition-all whitespace-nowrap 
                ${active === t.id ? "border border-border2 bg-bg4 text-tx1" : "border border-transparent text-tx3 hover:bg-bg3 hover:text-tx2"}
                `}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;

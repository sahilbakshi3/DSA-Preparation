import {
  Layers,
  Code2,
  Dumbbell,
  Server,
  Activity,
  GitFork,
} from "lucide-react";

const TABS = [
  { id: "patterns", label: "PATTERNS", short: "PAT", icon: Layers },
  { id: "templates", label: "TEMPLATES", short: "TPL", icon: Code2 },
  { id: "drills", label: "DRILLS", short: "DRL", icon: Dumbbell },
  { id: "sysdesign", label: "SYS DESIGN", short: "SYS", icon: Server },
  { id: "complexity", label: "BIG-O REF", short: "BIG-O", icon: Activity },
  { id: "decision", label: "FLOWCHART", short: "FLOW", icon: GitFork },
];

export default function TabBar({ active, onChange }) {
  return (
    <div className="mb-6 border border-mid bg-surface overflow-x-auto rounded-sm">
      <div className="flex min-w-max">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`
                relative flex items-center gap-2 px-4 py-3 font-mono text-[10px]
                tracking-[0.1em] transition-all whitespace-nowrap
                ${i !== TABS.length - 1 ? "border-r border-dim" : ""}
                ${
                  isActive
                    ? "bg-amber text-void font-semibold"
                    : "text-muted hover:text-primary hover:bg-raised"
                }
              `}
            >
              <Icon size={11} />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.short}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber/50" />
              )}
            </button>
          );
        })}
        <div className="flex-1 border-l border-dim" />
      </div>
    </div>
  );
}

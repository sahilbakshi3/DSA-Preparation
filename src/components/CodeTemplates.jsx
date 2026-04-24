import { useState } from "react";
import { Code2, Copy, CheckCheck, BookOpen } from "lucide-react";
import { TEMPLATES } from "../data/templates";

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 font-mono text-[9px] tracking-wider border px-2.5 py-1.5 rounded-sm transition-all ${
        copied
          ? "text-electric border-electric/40 bg-electric/10"
          : "text-muted border-dim hover:border-bright hover:text-secondary bg-raised"
      }`}
    >
      {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}

function TemplateBlock({ template }) {
  const [activeVariant, setActiveVariant] = useState(0);
  const variant = template.variants[activeVariant];

  return (
    <div className="mb-1.5 border border-dim rounded-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b border-dim bg-raised"
        style={{ borderLeftColor: template.color, borderLeftWidth: 2 }}
      >
        <Code2 size={11} style={{ color: template.color }} />
        <span className="font-mono text-[10px] text-primary flex-1 tracking-wide font-medium">
          {template.label.toUpperCase()}
        </span>
        <span className="font-mono text-[8px] text-muted tracking-wider">
          {template.variants.length} VARIANT
          {template.variants.length > 1 ? "S" : ""}
        </span>
      </div>

      {/* Variant tabs */}
      {template.variants.length > 1 && (
        <div className="flex border-b border-dim bg-surface overflow-x-auto">
          {template.variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(i)}
              className={`font-mono text-[9px] tracking-wider px-4 py-2 border-r border-dim whitespace-nowrap transition-colors ${
                activeVariant === i
                  ? "text-amber bg-amber/10"
                  : "text-muted hover:text-secondary"
              }`}
            >
              {v.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Code */}
      <div className="relative bg-deep">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton code={variant.code} />
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[11.5px] leading-relaxed text-secondary">
          <code>{variant.code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function CodeTemplates() {
  const [search, setSearch] = useState("");
  const filtered = TEMPLATES.filter(
    (t) => !search || t.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Banner */}
      <div className="mb-4 border border-amber/30 bg-amber/5 rounded-sm flex items-start overflow-hidden">
        <div className="border-r border-amber/20 px-3 py-3 flex-shrink-0 flex items-center">
          <BookOpen size={14} className="text-amber" />
        </div>
        <div className="px-4 py-3">
          <p className="font-mono text-[9px] text-amber tracking-[0.15em] mb-1">
            MUSCLE_MEMORY
          </p>
          <p className="text-[12px] text-secondary">
            Skeletons you should write in 30 seconds flat. Read once, close tab,
            write from memory. Repeat until automatic.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex border border-mid bg-surface rounded-sm mb-4 overflow-hidden focus-within:border-amber transition-colors">
        <div className="flex items-center px-3 border-r border-dim text-muted">
          <Code2 size={12} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="filter templates..."
          className="flex-1 bg-transparent px-3 py-2.5 font-mono text-[12px] text-primary placeholder-muted outline-none"
        />
      </div>

      {filtered.map((t) => (
        <TemplateBlock key={t.id} template={t} />
      ))}
    </div>
  );
}

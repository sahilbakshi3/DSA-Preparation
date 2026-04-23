import { useState } from "react";
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
      className="rounded px-2.5 py-1 font-mono text-[10px] font-semibold transition-all border"
      style={
        copied
          ? {
              color: "#1D9E75",
              borderColor: "#1D9E7540",
              background: "#1D9E7515",
            }
          : { color: "#5c6480", borderColor: "#2a2f3d", background: "#13161d" }
      }
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function TemplateBlock({ template }) {
  const [activeVariant, setActiveVariant] = useState(0);
  const variant = template.variants[activeVariant];

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-border1">
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: template.color + "12",
          borderBottom: `1px solid ${template.color}30`,
        }}
      >
        <span
          className="h-2.5 w-2.5 rounded-full flex-shrink-0"
          style={{ background: template.color }}
        />
        <span className="flex-1 text-sm font-semibold text-tx1">
          {template.label}
        </span>
        <span className="font-mono text-[10px] text-tx3">
          {template.variants.length} variant
          {template.variants.length > 1 ? "s" : ""}
        </span>
      </div>

      {template.variants.length > 1 && (
        <div className="flex gap-1 border-b border-border1 bg-bg2 px-3 py-2">
          {template.variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(i)}
              className={`rounded px-3 py-1 font-mono text-[11px] font-medium transition-all ${
                activeVariant === i ? "text-tx1" : "text-tx3 hover:text-tx2"
              }`}
              style={
                activeVariant === i
                  ? { background: template.color + "20", color: template.color }
                  : {}
              }
            >
              {v.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative bg-[#0a0c10]">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton code={variant.code} />
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[12px] leading-relaxed text-tx2">
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
      <div className="mb-5 rounded-xl border border-yellow/20 bg-yellow/5 px-4 py-3">
        <p className="text-sm font-semibold text-yellow">Muscle Memory Mode</p>
        <p className="mt-1 text-xs text-tx2">
          These are the skeletons you should be able to write in 30 seconds
          flat. Read the template once, close the tab, write it from memory.
          Repeat until it's automatic.
        </p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter templates..."
        className="mb-5 w-full rounded-lg border border-border2 bg-bg2 px-4 py-2.5 font-mono text-sm text-tx1 placeholder-tx3 outline-none transition focus:border-accent"
      />

      {filtered.map((t) => (
        <TemplateBlock key={t.id} template={t} />
      ))}
    </div>
  );
}

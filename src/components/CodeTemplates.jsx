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
      className={`font-mono text-[9px] tracking-[0.1em] border px-2.5 py-1 transition-all ${
        copied
          ? "text-lime border-lime/40 bg-lime/10"
          : "text-tx3 border-wire hover:border-wire2 hover:text-tx2 bg-bg"
      }`}
    >
      {copied ? "COPIED ✓" : "COPY"}
    </button>
  );
}

function TemplateBlock({ template }) {
  const [activeVariant, setActiveVariant] = useState(0);
  const variant = template.variants[activeVariant];

  return (
    <div className="mb-px border border-wire2">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b border-wire"
        style={{ borderLeft: `3px solid ${template.color}` }}
      >
        <span className="font-mono text-[10px] text-tx1 flex-1 tracking-wide">
          {template.label.toUpperCase()}
        </span>
        <span className="font-mono text-[8px] text-tx3 tracking-wider">
          {template.variants.length} VARIANT
          {template.variants.length > 1 ? "S" : ""}
        </span>
      </div>

      {/* Variant tabs */}
      {template.variants.length > 1 && (
        <div className="flex border-b border-wire bg-bg2">
          {template.variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(i)}
              className={`font-mono text-[9px] tracking-wider px-4 py-2 border-r border-wire transition-colors ${
                activeVariant === i
                  ? "text-accent bg-accent/10"
                  : "text-tx3 hover:text-tx2"
              }`}
            >
              {v.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Code */}
      <div className="relative bg-bg">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton code={variant.code} />
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[11.5px] leading-relaxed text-tx2">
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
      <div className="mb-4 border border-yellow/30 bg-yellow/5 px-4 py-3 flex items-start gap-3">
        <span className="font-mono text-[9px] text-yellow tracking-[0.15em] mt-0.5 flex-shrink-0">
          MUSCLE_MEMORY
        </span>
        <p className="font-sans text-[12px] text-tx2">
          Skeletons you should write in 30 seconds flat. Read once, close tab,
          write from memory. Repeat until automatic.
        </p>
      </div>

      {/* Search */}
      <div className="flex border border-wire2 bg-bg2 mb-4">
        <span className="font-mono text-[9px] text-tx3 px-3 py-2.5 border-r border-wire flex items-center tracking-wider">
          FILTER
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="template name..."
          className="flex-1 bg-transparent px-3 py-2.5 font-mono text-sm text-tx1 placeholder-tx3 outline-none"
        />
      </div>

      {filtered.map((t) => (
        <TemplateBlock key={t.id} template={t} />
      ))}
    </div>
  );
}

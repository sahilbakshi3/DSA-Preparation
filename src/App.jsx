import React, { useMemo, useState } from "react";
import { PATTERNS } from "./data/patterns.js";
import Header from "./components/Header";
import TabBar from "./components/TabBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ComplexityTable from "./components/ComplexityTable.jsx";
import CodeTemplates from "./components/CodeTemplates.jsx";
import DecisionGuide from "./components/DecisionGuide.jsx";
import DrillMode from "./components/DrillMode.jsx";
import TOC from "./components/TOC.jsx";
import PatternCard from "./components/PatternCard.jsx";
import SystemDesign from "./components/Systemdesign.jsx";

const CAT_COUNTS = PATTERNS.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});

const App = () => {
  const [tab, setTab] = useState("patterns");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PATTERNS.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const matchSearch =
        !q ||
        p.label.toLowerCase().includes(q) ||
        p.signals.some((s) => s.toLowerCase().includes(q)) ||
        p.keywords.some((k) => k.toLowerCase().includes(q)) ||
        (p.problems || []).some((pr) => pr.name.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, filter]);

  function jumpToCard(id) {
    const el = document.getElementById(`card-${id}`);
    if (el) {
      setTab("patterns");
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        50,
      );
    }
  }

  return (
    <div className="min-h-screen bg-bg text-tx1">
      <Header totalCount={PATTERNS.length} categoryCounts={CAT_COUNTS} />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <TabBar active={tab} onChange={setTab} />

        {tab === "patterns" && (
          <>
            <SearchBar
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={setFilter}
              counts={CAT_COUNTS}
            />
            <TOC patterns={filtered} onJump={jumpToCard} />
            {filtered.length === 0 ? (
              <div className="py-16 text-center font-mono text-[11px] text-tx3 tracking-wider">
                NO PATTERNS MATCH. TRY DIFFERENT KEYWORDS.
              </div>
            ) : (
              filtered.map((p) => <PatternCard key={p.id} pattern={p} />)
            )}
          </>
        )}

        {tab === "templates" && <CodeTemplates />}
        {tab === "drills" && <DrillMode />}
        {tab === "sysdesign" && <SystemDesign />}
        {tab === "complexity" && <ComplexityTable />}
        {tab === "decision" && <DecisionGuide />}
      </div>

      {/* Footer */}
      <div className="border-t border-wire mt-8">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-[9px] text-tx3 tracking-wider">
            DSA_PATTERN_RECON · {PATTERNS.length} PATTERNS
          </span>
          <span className="font-mono text-[9px] text-tx3">
            <span className="blink text-accent">_</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;

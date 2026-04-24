import { useState, useCallback } from "react";
import { GitFork, ChevronDown, ChevronRight } from "lucide-react";
import { DECISION_SECTIONS } from "../data/patterns";

// Build flowchart node data from the raw DECISION_SECTIONS
function buildFlowNodes(section) {
  const nodes = [];
  const edges = [];
  let y = 60;
  const centerX = 340;
  const nodeW = 320;
  const nodeH = 56;
  const gapY = 90;

  // Start node
  nodes.push({
    id: "start",
    type: "start",
    x: centerX - 60,
    y: 20,
    w: 120,
    h: 32,
    label: "START",
  });
  let lastId = "start";

  const raw = section.nodes;
  let i = 0;

  while (i < raw.length) {
    const node = raw[i];

    if (node.type === "q") {
      const qId = `q${i}`;
      const qNode = {
        id: qId,
        type: "question",
        x: centerX - nodeW / 2,
        y,
        w: nodeW,
        h: nodeH + 8,
        label: node.text,
      };
      nodes.push(qNode);
      edges.push({ from: lastId, to: qId, label: "" });

      const next = raw[i + 1];
      if (next?.type === "a") {
        const aId = `a${i}`;
        const ansY = y + nodeH + 8 + gapY;
        const aNode = {
          id: aId,
          type: "answer",
          x: centerX - nodeW / 2,
          y: ansY,
          w: nodeW,
          h: nodeH,
          label: next.text,
        };
        nodes.push(aNode);
        edges.push({ from: qId, to: aId, label: "→" });
        lastId = aId;
        y = ansY + nodeH + gapY;
        i += 2;
      } else {
        lastId = qId;
        y += nodeH + 8 + gapY;
        i += 1;
      }
    } else if (node.type === "warn") {
      const wId = `w${i}`;
      nodes.push({
        id: wId,
        type: "warn",
        x: centerX - nodeW / 2,
        y,
        w: nodeW,
        h: nodeH,
        label: node.text,
      });
      edges.push({ from: lastId, to: wId, label: "" });
      lastId = wId;
      y += nodeH + gapY;
      i += 1;
    } else {
      i += 1;
    }
  }

  // End node
  nodes.push({
    id: "end",
    type: "end",
    x: centerX - 50,
    y,
    w: 100,
    h: 28,
    label: "END",
  });
  edges.push({ from: lastId, to: "end", label: "" });

  const totalH = y + 50;
  return { nodes, edges, totalH };
}

function getCenter(node) {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

function getBottomCenter(node) {
  return { x: node.x + node.w / 2, y: node.y + node.h };
}

function getTopCenter(node) {
  return { x: node.x + node.w / 2, y: node.y };
}

function FlowChart({ section }) {
  const { nodes, edges, totalH } = buildFlowNodes(section);
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const svgW = 680;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgW} ${totalH}`}
        width="100%"
        style={{ maxWidth: svgW, display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id={`arr-${section.title.slice(0, 5)}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={section.color} />
          </marker>
          <marker
            id="arr-gray"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#3d3d5c" />
          </marker>
          <filter id="glow-node">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw edges */}
        {edges.map((e, i) => {
          const from = nodeMap[e.from];
          const to = nodeMap[e.to];
          if (!from || !to) return null;
          const p1 = getBottomCenter(from);
          const p2 = getTopCenter(to);
          const mid = (p1.y + p2.y) / 2;
          const isColored = from.type === "question";
          const stroke = isColored ? section.color : "#3d3d5c";
          const markerId = isColored
            ? `arr-${section.title.slice(0, 5)}`
            : "arr-gray";
          const pathD = `M ${p1.x} ${p1.y} C ${p1.x} ${mid}, ${p2.x} ${mid}, ${p2.x} ${p2.y}`;

          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none"
                stroke={stroke}
                strokeWidth="1.5"
                strokeDasharray={from.type === "question" ? "none" : "4 3"}
                opacity={0.7}
                markerEnd={`url(#${markerId})`}
              />
              {e.label && (
                <text
                  x={(p1.x + p2.x) / 2 + 8}
                  y={mid}
                  fill={section.color}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.9"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => {
          if (node.type === "start" || node.type === "end") {
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={node.h / 2}
                  fill={section.color}
                  opacity={0.9}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 4}
                  textAnchor="middle"
                  fill="#000"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.1em"
                >
                  {node.label}
                </text>
              </g>
            );
          }

          if (node.type === "question") {
            // Diamond-like rectangle with accent border
            return (
              <g key={node.id} className="flow-node">
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="3"
                  fill="#0d0d14"
                  stroke={section.color}
                  strokeWidth="1.5"
                  opacity="0.95"
                />
                {/* Left accent bar */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={3}
                  height={node.h}
                  rx="1"
                  fill={section.color}
                />
                {/* Label */}
                <foreignObject
                  x={node.x + 12}
                  y={node.y}
                  width={node.w - 24}
                  height={node.h}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      height: node.h,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      color: "#e8e8f0",
                      lineHeight: 1.4,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                  >
                    {node.label}
                  </div>
                </foreignObject>
                {/* Top label */}
                <text
                  x={node.x + 10}
                  y={node.y - 5}
                  fill={section.color}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.12em"
                  opacity="0.8"
                >
                  DECISION
                </text>
              </g>
            );
          }

          if (node.type === "answer") {
            return (
              <g key={node.id} className="flow-node">
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="3"
                  fill="rgba(0,255,136,0.06)"
                  stroke="rgba(0,255,136,0.3)"
                  strokeWidth="1"
                />
                <foreignObject
                  x={node.x + 12}
                  y={node.y}
                  width={node.w - 24}
                  height={node.h}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      height: node.h,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      color: "#9090b0",
                      lineHeight: 1.4,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                  >
                    {node.label}
                  </div>
                </foreignObject>
                <text
                  x={node.x + 10}
                  y={node.y - 5}
                  fill="#00ff88"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.12em"
                  opacity="0.7"
                >
                  PATH
                </text>
              </g>
            );
          }

          if (node.type === "warn") {
            return (
              <g key={node.id} className="flow-node">
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="3"
                  fill="rgba(245,166,35,0.07)"
                  stroke="rgba(245,166,35,0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
                <foreignObject
                  x={node.x + 12}
                  y={node.y}
                  width={node.w - 24}
                  height={node.h}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      height: node.h,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      color: "#f5a623",
                      lineHeight: 1.4,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                  >
                    {node.label}
                  </div>
                </foreignObject>
                <text
                  x={node.x + 10}
                  y={node.y - 5}
                  fill="#f5a623"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.12em"
                  opacity="0.8"
                >
                  ⚠ CHECK
                </text>
              </g>
            );
          }

          return null;
        })}
      </svg>
    </div>
  );
}

export default function DecisionGuide() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div>
      {/* Banner */}
      <div className="mb-4 border border-electric/30 bg-electric/5 rounded-sm flex items-start overflow-hidden">
        <div className="border-r border-electric/20 px-3 py-3 flex-shrink-0 flex items-center">
          <GitFork size={14} className="text-electric" />
        </div>
        <div className="px-4 py-3">
          <p className="font-mono text-[9px] text-electric tracking-[0.15em] mb-1">
            DECISION_FLOWCHARTS
          </p>
          <p className="text-[12px] text-secondary">
            Interactive SVG decision trees. Click a section to expand. Each
            chart walks you from problem signal to correct pattern.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {DECISION_SECTIONS.map((section, idx) => {
          const isOpen = openSection === idx;

          return (
            <div
              key={section.title}
              className="border border-mid rounded-sm overflow-hidden"
            >
              {/* Section header */}
              <button
                onClick={() => setOpenSection(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-surface hover:bg-raised transition-colors text-left"
                style={{ borderLeft: `3px solid ${section.color}` }}
              >
                <span
                  className="font-display text-lg leading-none"
                  style={{ color: section.color }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-body text-[13px] font-medium text-primary">
                  {section.title}
                </span>
                <span className="font-mono text-[9px] text-muted mr-2">
                  {section.nodes.filter((n) => n.type === "q").length} NODES
                </span>
                {isOpen ? (
                  <ChevronDown size={14} className="text-muted" />
                ) : (
                  <ChevronRight size={14} className="text-muted" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-dim bg-deep p-4 fade-up">
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[
                      {
                        color: section.color,
                        label: "DECISION NODE",
                        border: "solid",
                      },
                      {
                        color: "#00ff88",
                        label: "PATH / ANSWER",
                        border: "solid",
                      },
                      {
                        color: "#f5a623",
                        label: "WARNING CHECK",
                        border: "dashed",
                      },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-2">
                        <div
                          className="w-8 h-3 rounded-sm"
                          style={{
                            border: `1.5px ${l.border} ${l.color}`,
                            background: l.color + "12",
                          }}
                        />
                        <span className="font-mono text-[9px] text-muted tracking-wider">
                          {l.label}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-0 border-t-2"
                        style={{ borderColor: section.color }}
                      />
                      <span className="font-mono text-[9px] text-muted tracking-wider">
                        FLOW EDGE
                      </span>
                    </div>
                  </div>

                  <FlowChart section={section} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

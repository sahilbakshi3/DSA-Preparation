import { Activity, Info } from "lucide-react";
import { COMPLEXITY_TABLE } from "../data/patterns";

const HEADERS = ["PATTERN", "TIME", "SPACE", "WHEN TO USE", "AVOID WHEN"];

function complexityColor(t) {
  if (t.includes("O(1)") || t.includes("O(log") || t.includes("O(α"))
    return "complexity-fast";
  if (t.includes("O(n)") && !t.includes("²") && !t.includes("*"))
    return "complexity-mid";
  return "complexity-slow";
}

export default function ComplexityTable() {
  return (
    <div>
      {/* Banner */}
      <div className="mb-4 border border-plasma/30 bg-plasma/5 rounded-sm flex items-start gap-0 overflow-hidden">
        <div className="border-r border-plasma/20 px-3 py-3 flex-shrink-0 flex items-center">
          <Activity size={14} className="text-plasma" />
        </div>
        <div className="px-4 py-3">
          <p className="font-mono text-[9px] text-plasma tracking-[0.15em] mb-1">
            COMPLEXITY_REFERENCE
          </p>
          <p className="text-[12px] text-secondary">
            Color-coded:{" "}
            <span className="complexity-fast font-semibold">green = fast</span>{" "}
            ·{" "}
            <span className="complexity-mid font-semibold">amber = linear</span>{" "}
            · <span className="complexity-slow font-semibold">red = slow</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-mid rounded-sm">
        <table className="w-full border-collapse text-[12px] data-table">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPLEXITY_TABLE.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "" : "bg-raised/40"}>
                <td className="font-mono text-[11px] text-primary whitespace-nowrap font-medium">
                  {row[0]}
                </td>
                <td
                  className={`font-mono text-[11px] whitespace-nowrap font-semibold ${complexityColor(row[1])}`}
                >
                  {row[1]}
                </td>
                <td
                  className={`font-mono text-[11px] whitespace-nowrap font-semibold ${complexityColor(row[2])}`}
                >
                  {row[2]}
                </td>
                <td className="text-[11px] text-secondary">{row[3]}</td>
                <td className="text-[11px] text-secondary">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

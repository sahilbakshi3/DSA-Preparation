import { COMPLEXITY_TABLE } from "../data/patterns";

const HEADERS = ["PATTERN", "TIME", "SPACE", "WHEN TO USE", "AVOID WHEN"];

function complexityColor(t) {
  if (t.includes("O(1)") || t.includes("O(log") || t.includes("O(α"))
    return "text-lime font-semibold";
  if (t.includes("O(n)") && !t.includes("²") && !t.includes("*"))
    return "text-yellow font-semibold";
  return "text-pink font-semibold";
}

export default function ComplexityTable() {
  return (
    <div className="overflow-x-auto border border-wire2">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="bg-bg2 border-b border-wire">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="border-r border-wire last:border-r-0 px-4 py-2.5 text-left font-mono text-[9px] tracking-[0.15em] text-tx3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPLEXITY_TABLE.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-wire hover:bg-bg2 transition-colors ${i % 2 === 0 ? "" : "bg-bg2/40"}`}
            >
              <td className="border-r border-wire px-4 py-2.5 font-mono text-[11px] text-tx1 whitespace-nowrap">
                {row[0]}
              </td>
              <td
                className={`border-r border-wire px-4 py-2.5 font-mono text-[11px] whitespace-nowrap ${complexityColor(row[1])}`}
              >
                {row[1]}
              </td>
              <td
                className={`border-r border-wire px-4 py-2.5 font-mono text-[11px] whitespace-nowrap ${complexityColor(row[2])}`}
              >
                {row[2]}
              </td>
              <td className="border-r border-wire px-4 py-2.5 font-sans text-[11px] text-tx2">
                {row[3]}
              </td>
              <td className="px-4 py-2.5 font-sans text-[11px] text-tx2">
                {row[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

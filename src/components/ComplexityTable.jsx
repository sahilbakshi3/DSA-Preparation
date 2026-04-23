import { COMPLEXITY_TABLE } from "../data/patterns";

const HEADERS = ["Pattern", "Time", "Space", "When to Use", "Avoid When"];

function timeClass(t) {
  if (t.includes("O(1)") || t.includes("O(log") || t.includes("O(α"))
    return "text-green font-semibold font-mono";
  if (t.includes("O(n)") && !t.includes("²") && !t.includes("*"))
    return "text-yellow font-semibold font-mono";
  return "text-pink font-semibold font-mono";
}

export default function ComplexityTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border1">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {HEADERS.map((h) => (
              <th
                key={h}
                className="border border-border1 bg-bg2 px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-wider text-tx2"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPLEXITY_TABLE.map((row, i) => (
            <tr key={i} className="group transition hover:bg-bg2">
              <td className="border border-border1 px-4 py-2.5 font-medium text-tx1">
                {row[0]}
              </td>
              <td
                className={`border border-border1 px-4 py-2.5 ${timeClass(row[1])}`}
              >
                {row[1]}
              </td>
              <td
                className={`border border-border1 px-4 py-2.5 ${timeClass(row[2])}`}
              >
                {row[2]}
              </td>
              <td className="border border-border1 px-4 py-2.5 text-tx2">
                {row[3]}
              </td>
              <td className="border border-border1 px-4 py-2.5 text-tx2">
                {row[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

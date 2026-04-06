// Insights page — spending intelligence cards + month-over-month bar chart
import { useMemo } from "react";
import { fmt, getMonthlyData } from "../utils/helpers";
import BarChart from "../charts/BarChart";

export default function Insights({ transactions, dark, T }) {
  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);

  const catTotals = useMemo(() => {
    const ct = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      ct[t.category] = (ct[t.category] || 0) + t.amount;
    });
    return ct;
  }, [transactions]);

  const { topCat, chg, curr, sav } = useMemo(() => {
    const topCat = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a])[0];
    const { keys, months } = monthly;
    const last2 = keys.slice(-2);
    const prev  = last2[0] ? months[last2[0]].expense : 0;
    const curr  = last2[1] ? months[last2[1]].expense : prev;
    const chg   = prev > 0 ? Math.round((curr - prev) / prev * 100) : 0;
    const totI  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totE  = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const sav   = totI > 0 ? Math.round((totI - totE) / totI * 100) : 0;
    return { topCat, chg, curr, sav };
  }, [transactions, monthly, catTotals]);

  const insightCards = [
    {
      tag: "top spend",
      tagBg: T.redBg, tagColor: T.redText,
      value: topCat || "—",
      desc: "Highest spending category overall",
    },
    {
      tag: chg >= 0 ? `up ${chg}%` : `down ${Math.abs(chg)}%`,
      tagBg: chg >= 0 ? T.redBg : T.greenBg,
      tagColor: chg >= 0 ? T.redText : T.greenText,
      value: fmt(curr),
      desc: "Expenses vs prior month",
    },
    {
      tag: "savings rate",
      tagBg: sav >= 20 ? T.greenBg : T.amberBg,
      tagColor: sav >= 20 ? T.greenText : T.amberText,
      value: `${sav}%`,
      desc: "Of income retained",
    },
  ];

  return (
    <div className="page-anim">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.ink }}>Insights</div>
        <div style={{ fontSize: 12, color: T.ink3, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>Spending intelligence</div>
      </div>

      {/* Insight cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        {insightCards.map((c, i) => (
          <div key={i} className="insight-hover" style={{
            background: T.paper2, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: "16px 18px",
            transition: "background 0.18s, border-color 0.18s, transform 0.15s",
          }}>
            <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", letterSpacing: "0.5px", textTransform: "uppercase", padding: "3px 8px", borderRadius: 4, display: "inline-block", marginBottom: 10, background: c.tagBg, color: c.tagColor }}>
              {c.tag}
            </span>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono',monospace", letterSpacing: -0.5, color: T.ink }}>
              {c.value}
            </div>
            <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 10, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Month-over-month: income vs expenses
        </div>
        <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11, fontFamily: "'DM Mono',monospace" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.ink2 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: T.accent, display: "inline-block" }} /> Income
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.ink2 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: T.red, display: "inline-block" }} /> Expense
          </span>
        </div>
        <BarChart
          keys={monthly.keys}
          labels={monthly.labels}
          months={monthly.months}
          dark={dark}
          accent={T.accent}
          red={T.red}
        />
      </div>
    </div>
  );
}

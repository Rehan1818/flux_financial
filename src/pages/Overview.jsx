// Overview page — KPI cards + trend line + donut chart
import { useMemo } from "react";
import { CATS } from "../utils/constants";
import { fmt, getMonthlyData } from "../utils/helpers";
import LineChart from "../charts/LineChart";
import DonutChart from "../charts/DonutChart";

export default function Overview({ transactions, dark, T }) {
  const summary = useMemo(() => {
    const income  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);

  const catTotals = useMemo(() => {
    const ct = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      ct[t.category] = (ct[t.category] || 0) + t.amount;
    });
    return ct;
  }, [transactions]);

  const period = useMemo(() => {
    const dates = transactions.map(t => t.date).sort();
    return dates.length ? `${dates[0]} — ${dates[dates.length - 1]}` : "";
  }, [transactions]);

  const kpiCards = [
    {
      label: "Net balance",
      value: fmt(summary.balance),
      sub: (summary.balance >= 0 ? "Positive" : "Negative") + " net",
      accent: T.accent,
      bar: summary.income ? Math.min(100, Math.abs(summary.balance) / summary.income * 100) : 0,
    },
    {
      label: "Total income",
      value: fmt(summary.income),
      sub: `${transactions.filter(t => t.type === "income").length} transactions`,
      accent: T.green,
      bar: 100,
    },
    {
      label: "Total expenses",
      value: fmt(summary.expense),
      sub: `${transactions.filter(t => t.type === "expense").length} transactions`,
      accent: T.red,
      bar: summary.income ? Math.min(100, summary.expense / summary.income * 100) : 0,
    },
  ];

  const catTotal = Object.values(catTotals).reduce((s, v) => s + v, 0);

  return (
    <div className="page-anim">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.ink }}>Dashboard</div>
        <div style={{ fontSize: 12, color: T.ink3, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>{period}</div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        {kpiCards.map((c, i) => (
          <div key={i} className="card-hover" style={{
            background: T.paper2, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: "18px 20px",
            transition: "background 0.18s, border-color 0.18s, transform 0.15s", cursor: "default",
          }}>
            <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ink3, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              {c.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -1, fontFamily: "'DM Mono',monospace", color: c.accent }}>
              {c.value}
            </div>
            <div style={{ fontSize: 11, color: T.ink3, marginTop: 5, fontFamily: "'DM Mono',monospace" }}>
              {c.sub}
            </div>
            <div style={{ height: 3, borderRadius: 2, marginTop: 12, background: T.border }}>
              <div style={{ height: "100%", borderRadius: 2, background: c.accent, width: `${c.bar}%`, transition: "width 0.6s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
        {/* Line chart */}
        <div style={{ background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 12, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Balance trend — 6 months
          </div>
          <div style={{ height: 190 }}>
            <LineChart data={monthly.balances} color={T.accent} labels={monthly.labels} />
          </div>
        </div>

        {/* Donut chart */}
        <div style={{ background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 12, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Spending by category
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 }}>
            {Object.entries(catTotals).sort((a, b) => b[1] - a[1]).map(([cat, val]) => (
              <span key={cat} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ink2 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: CATS[cat]?.color || "#888", display: "inline-block", flexShrink: 0 }} />
                {cat} {Math.round(val / catTotal * 100)}%
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart data={catTotals} dark={dark} />
          </div>
        </div>
      </div>
    </div>
  );
}

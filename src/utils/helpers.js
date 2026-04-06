// ─── Number formatters ────────────────────────────────────────────────────────
export const fmt      = v => "₹" + Math.abs(v).toLocaleString("en-IN");
export const fmtShort = v => v >= 100000
  ? "₹" + (v / 100000).toFixed(1) + "L"
  : "₹" + Math.round(v / 1000) + "k";

// ─── Compute monthly income/expense/balance data ──────────────────────────────
export function getMonthlyData(transactions) {
  const months = {};
  transactions.forEach(t => {
    const m = t.date.slice(0, 7);
    if (!months[m]) months[m] = { income: 0, expense: 0 };
    months[m][t.type] += t.amount;
  });
  const keys = Object.keys(months).sort();
  let running = 0;
  const balances = keys.map(k => {
    running += months[k].income - months[k].expense;
    return running;
  });
  const labels = keys.map(k => {
    const [y, m] = k.split("-");
    return new Date(y, m - 1).toLocaleString("default", { month: "short", year: "2-digit" });
  });
  return { keys, labels, balances, months };
}

// ─── Download helper ──────────────────────────────────────────────────────────
export function downloadFile(name, type, content) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
}

// ─── Shared style helpers (used in forms/modals) ──────────────────────────────
export const labelStyle = T => ({
  display: "block",
  fontSize: 11,
  fontFamily: "'DM Mono',monospace",
  color: T.ink3,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: 5,
});

export const inputStyle = T => ({
  display: "block",
  width: "100%",
  padding: "8px 11px",
  background: T.paper2,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  fontFamily: "'Syne',sans-serif",
  fontSize: 13,
  color: T.ink,
});

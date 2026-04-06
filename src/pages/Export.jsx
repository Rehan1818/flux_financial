// Export page — download CSV/JSON, reset data, storage status
import { useMemo } from "react";
import { DEFAULT_TX, LS_KEY } from "../utils/constants";
import { downloadFile } from "../utils/helpers";

export default function Export({ transactions, setTransactions, showToast, T }) {
  const storageBytes = useMemo(() => {
    try { return new Blob([localStorage.getItem(LS_KEY) || ""]).size; } catch { return 0; }
  }, [transactions]);

  const exportCSV = () => {
    const rows = [
      "Date,Description,Category,Type,Amount",
      ...transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`),
    ].join("\n");
    downloadFile("flux_transactions.csv", "text/csv", rows);
    showToast("CSV exported");
  };

  const exportJSON = () => {
    downloadFile("flux_transactions.json", "application/json", JSON.stringify(transactions, null, 2));
    showToast("JSON exported");
  };

  const resetData = () => {
    setTransactions(JSON.parse(JSON.stringify(DEFAULT_TX)));
    showToast("Data reset to defaults");
  };

  const boxStyle = {
    background: T.paper2, border: `1px solid ${T.border}`,
    borderRadius: 12, padding: "18px 20px",
  };

  const sectionTitle = {
    fontSize: 12, fontWeight: 600, color: T.ink2,
    marginBottom: 12, fontFamily: "'DM Mono',monospace",
    textTransform: "uppercase", letterSpacing: "0.5px",
  };

  return (
    <div className="page-anim">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.ink }}>Export data</div>
        <div style={{ fontSize: 12, color: T.ink3, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>Download your transactions</div>
      </div>

      {/* Export options */}
      <div style={{ ...boxStyle, marginBottom: 14 }}>
        <div style={sectionTitle}>Export options</div>
        <p style={{ fontSize: 13, color: T.ink2, marginBottom: 16 }}>
          Export all transactions in your preferred format. Filters from the transactions page are not applied — all data is exported.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={exportCSV} style={{ padding: "7px 14px", background: T.accent, border: `1px solid ${T.accent}`, borderRadius: 8, color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
            Download CSV
          </button>
          <button onClick={exportJSON} className="btn-hover" style={{ padding: "7px 14px", background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.ink2, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer", transition: "all 0.18s" }}>
            Download JSON
          </button>
          <button onClick={resetData} style={{ padding: "7px 14px", background: T.redBg, border: `1px solid ${T.redBg}`, borderRadius: 8, color: T.red, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer", marginLeft: "auto" }}>
            Reset to defaults
          </button>
        </div>
      </div>

      {/* Storage status */}
      <div style={boxStyle}>
        <div style={sectionTitle}>Storage status</div>
        <div style={{ fontSize: 13, color: T.ink2, fontFamily: "'DM Mono',monospace", lineHeight: 2 }}>
          {transactions.length} transactions stored<br />
          {storageBytes} bytes used in localStorage<br />
          Last saved: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

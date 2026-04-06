// Transactions page — filterable, sortable table with add/edit/delete
import { useState, useMemo } from "react";
import TxRow from "../components/TxRow";
import Modal from "../components/Modal";

export default function Transactions({ transactions, setTransactions, role, dark, T, showToast }) {
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("");
  const [filterCat,   setFilterCat]   = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [sortCol,     setSortCol]     = useState("date");
  const [sortDir,     setSortDir]     = useState(-1);
  const [groupBy,     setGroupBy]     = useState(false);
  const [modal,       setModal]       = useState({ open: false, initial: null, editId: null });

  const allCats   = useMemo(() => [...new Set(transactions.map(t => t.category))].sort(), [transactions]);
  const allMonths = useMemo(() => [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort().reverse(), [transactions]);

  const filtered = useMemo(() => {
    let list = transactions.filter(t => {
      if (filterType  && t.type !== filterType) return false;
      if (filterCat   && t.category !== filterCat) return false;
      if (filterMonth && !t.date.startsWith(filterMonth)) return false;
      if (search && !t.description.toLowerCase().includes(search.toLowerCase()) && !t.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      let va = a[sortCol], vb = b[sortCol];
      if (sortCol === "amount") {
        va = a.type === "income" ? a.amount : -a.amount;
        vb = b.type === "income" ? b.amount : -b.amount;
      }
      return va < vb ? -sortDir : va > vb ? sortDir : 0;
    });
  }, [transactions, filterType, filterCat, filterMonth, search, sortCol, sortDir]);

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d * -1);
    else { setSortCol(col); setSortDir(-1); }
  };

  const openAdd  = () => setModal({ open: true, initial: null, editId: null });
  const openEdit = id => {
    const t = transactions.find(x => x.id === id);
    if (t) setModal({ open: true, initial: { ...t, amount: String(t.amount) }, editId: id });
  };
  const closeModal = () => setModal({ open: false, initial: null, editId: null });

  const saveModal = form => {
    if (modal.editId) {
      setTransactions(prev => prev.map(t => t.id === modal.editId ? { ...t, ...form } : t));
      showToast("Transaction updated");
    } else {
      const newId = Math.max(...transactions.map(t => t.id), 0) + 1;
      setTransactions(prev => [{ ...form, id: newId }, ...prev]);
      showToast("Transaction added");
    }
    closeModal();
  };

  const deleteTx = id => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast("Transaction deleted");
  };

  // Build grouped or flat rows
  const renderRows = () => {
    if (filtered.length === 0) return (
      <tr>
        <td colSpan={role === "admin" ? 6 : 5} style={{ textAlign: "center", padding: 48, color: T.ink3, fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
          No transactions match your filters.
        </td>
      </tr>
    );

    if (!groupBy) return filtered.map(t => (
      <TxRow key={t.id} t={t} dark={dark} T={T} role={role} onEdit={openEdit} onDelete={deleteTx} />
    ));

    // Group by month
    const groups = {};
    filtered.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!groups[m]) groups[m] = [];
      groups[m].push(t);
    });

    return Object.keys(groups).sort().reverse().flatMap(m => {
      const [y, mo] = m.split("-");
      const lbl = new Date(y, mo - 1).toLocaleString("default", { month: "long", year: "numeric" });
      const net = groups[m].reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0);
      return [
        <tr key={`grp-${m}`}>
          <td
            colSpan={role === "admin" ? 6 : 5}
            style={{ background: T.paper3, fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ink3, textTransform: "uppercase", letterSpacing: "0.5px", padding: "5px 12px", borderTop: `1px solid ${T.border}` }}
          >
            {lbl} &nbsp;·&nbsp; net {net >= 0 ? "+" : ""}{Math.abs(net).toLocaleString("en-IN")}
          </td>
        </tr>,
        ...groups[m].map(t => (
          <TxRow key={t.id} t={t} dark={dark} T={T} role={role} onEdit={openEdit} onDelete={deleteTx} />
        )),
      ];
    });
  };

  const filterSelectStyle = {
    padding: "8px 10px", background: T.paper2,
    border: `1px solid ${T.border}`, borderRadius: 8,
    fontFamily: "'Syne',sans-serif", fontSize: 12,
    color: T.ink, cursor: "pointer",
  };

  return (
    <div className="page-anim">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, gap: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: T.ink }}>Transactions</div>
          <div style={{ fontSize: 12, color: T.ink3, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>
            {filtered.length} entr{filtered.length === 1 ? "y" : "ies"}
          </div>
        </div>
        {role === "admin" && (
          <button onClick={openAdd} style={{ padding: "7px 14px", background: T.accent, border: "none", borderRadius: 8, color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
            + Add transaction
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search…"
          style={{ flex: 1, minWidth: 140, padding: "8px 12px", background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: "'Syne',sans-serif", fontSize: 13, color: T.ink }}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={filterSelectStyle}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={filterSelectStyle}>
          <option value="">All categories</option>
          {allCats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={filterSelectStyle}>
          <option value="">All months</option>
          {allMonths.map(m => {
            const [y, mo] = m.split("-");
            return <option key={m} value={m}>{new Date(y, mo - 1).toLocaleString("default", { month: "long", year: "numeric" })}</option>;
          })}
        </select>
        <button
          onClick={() => setGroupBy(g => !g)}
          style={{ padding: "7px 12px", background: groupBy ? T.accentBg : T.paper2, border: `1px solid ${groupBy ? T.accent : T.border}`, borderRadius: 8, fontSize: 12, cursor: "pointer", color: groupBy ? T.accentText : T.ink3, fontFamily: "'Syne',sans-serif", transition: "all 0.18s" }}
        >
          Group by month
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
          <thead>
            <tr>
              {[["date","Date"],["description","Description"],["category","Category"],["type","Type"],["amount","Amount"]].map(([col, lbl]) => (
                <th key={col} className="th-hover" onClick={() => handleSort(col)}
                  style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ink3, textTransform: "uppercase", letterSpacing: "0.5px", padding: "7px 12px", textAlign: col === "amount" ? "right" : "left", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" }}>
                  {lbl} <span style={{ opacity: 0.4 }}>{sortCol === col ? (sortDir === -1 ? "↓" : "↑") : "↕"}</span>
                </th>
              ))}
              {role === "admin" && <th style={{ padding: "7px 12px" }} />}
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={modal.open} onClose={closeModal} onSave={saveModal} initial={modal.initial} T={T} />
    </div>
  );
}

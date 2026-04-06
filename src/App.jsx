import { useState, useEffect, useRef } from "react";

// Utils
import { DEFAULT_TX, LS_KEY, LS_THEME, LS_ROLE, LIGHT, DARK } from "./utils/constants";

// Layout components
import Sidebar from "./components/Sidebar";
import Toast   from "./components/Toast";

// Pages
import Overview     from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Insights     from "./pages/Insights";
import Export       from "./pages/Export";

// Inject Google Fonts once
const link = document.createElement("link");
link.rel  = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;700;800&display=swap";
document.head.appendChild(link);

export default function App() {
  // ── Persisted state ───────────────────────────────────────────────────────
  const [transactions, setTransactions] = useState(() => {
    try { const d = localStorage.getItem(LS_KEY); return d ? JSON.parse(d) : JSON.parse(JSON.stringify(DEFAULT_TX)); }
    catch { return JSON.parse(JSON.stringify(DEFAULT_TX)); }
  });
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem(LS_THEME) === "dark"; } catch { return false; }
  });
  const [role, setRole] = useState(() => {
    try { return localStorage.getItem(LS_ROLE) || "viewer"; } catch { return "viewer"; }
  });

  // ── UI state ──────────────────────────────────────────────────────────────
  const [page,  setPage]  = useState("overview");
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  // ── Persist to localStorage ───────────────────────────────────────────────
  useEffect(() => { try { localStorage.setItem(LS_KEY,   JSON.stringify(transactions)); } catch {} }, [transactions]);
  useEffect(() => { try { localStorage.setItem(LS_THEME, dark ? "dark" : "light");      } catch {} }, [dark]);
  useEffect(() => { try { localStorage.setItem(LS_ROLE,  role);                         } catch {} }, [role]);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = msg => {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200);
  };

  const T = dark ? DARK : LIGHT;

  // ── Global CSS ────────────────────────────────────────────────────────────
  const globalCSS = `
    @keyframes fadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body, #root {
      width: 100%;
      height: 100%;
      min-height: 100vh;
      overflow: hidden;
    }

    body {
      font-family: 'Syne', sans-serif;
      background: ${T.paper};
      color: ${T.ink};
      font-size: 14px;
      line-height: 1.5;
      transition: background 0.18s, color 0.18s;
    }

    #root {
      display: flex;
      flex-direction: column;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: ${T.paper3}; border-radius: 2px; }

    input, select { outline: none; }
    input[type=date]::-webkit-calendar-picker-indicator {
      filter: ${dark ? "invert(0.6)" : "none"};
      cursor: pointer;
    }

    .page-anim           { animation: fadeIn 0.22s ease; }
    .nav-hover:hover     { background: ${T.paper3} !important; color: ${T.ink} !important; }
    .card-hover:hover    { transform: translateY(-2px); }
    .row-hover:hover td  { background: ${T.paper3} !important; }
    .th-hover:hover      { color: ${T.ink} !important; }
    .btn-hover:hover     { background: ${T.paper3} !important; }
    .insight-hover:hover { transform: translateY(-2px); }
  `;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{globalCSS}</style>

      <div style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: T.paper,
        color: T.ink,
        transition: "background 0.18s, color 0.18s",
        fontFamily: "'Syne', sans-serif",
      }}>

        {/* Fixed-width sidebar */}
        <Sidebar
          page={page} setPage={setPage}
          dark={dark} setDark={setDark}
          role={role} setRole={setRole}
          T={T}
        />

        {/* Main content — fills all remaining space */}
        <div style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          padding: 32,
          background: T.paper,
          position: "relative",
          transition: "background 0.18s",
        }}>
          <Toast message={toast.msg} visible={toast.visible} T={T} />

          {page === "overview"     && <Overview     transactions={transactions} dark={dark} T={T} />}
          {page === "transactions" && <Transactions transactions={transactions} setTransactions={setTransactions} role={role} dark={dark} T={T} showToast={showToast} />}
          {page === "insights"     && <Insights     transactions={transactions} dark={dark} T={T} />}
          {page === "export"       && <Export       transactions={transactions} setTransactions={setTransactions} showToast={showToast} T={T} />}
        </div>

      </div>
    </>
  );
}

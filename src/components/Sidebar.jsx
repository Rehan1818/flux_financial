// Sidebar — navigation links + theme toggle + role selector

const NAV_ITEMS = [
  { id: "overview",      icon: "◈", label: "Overview"     },
  { id: "transactions",  icon: "≡", label: "Transactions" },
  { id: "insights",      icon: "◎", label: "Insights"     },
  { id: "export",        icon: "↓", label: "Export"       },
];

export default function Sidebar({ page, setPage, dark, setDark, role, setRole, T }) {
  return (
    <div style={{
      width: 184, flexShrink: 0,
      background: T.paper2,
      borderRight: `1px solid ${T.border}`,
      display: "flex", flexDirection: "column",
      padding: "20px 0",
      transition: "background 0.18s, border-color 0.18s",
    }}>
      {/* Logo */}
      <div style={{ fontSize: 18, fontWeight: 800, color: T.ink, padding: "0 20px 24px", letterSpacing: -0.5 }}>
        flux<span style={{ color: T.accent }}>.</span>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map(n => (
          <div
            key={n.id}
            className="nav-hover"
            onClick={() => setPage(n.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 20px", cursor: "pointer",
              fontSize: 13, fontWeight: 500,
              borderLeft: `3px solid ${page === n.id ? T.accent : "transparent"}`,
              color: page === n.id ? T.accent : T.ink3,
              background: page === n.id ? T.accentBg : "transparent",
              transition: "all 0.18s",
            }}
          >
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{n.icon}</span>
            {n.label}
          </div>
        ))}
      </nav>

      {/* Footer: theme + role */}
      <div style={{ marginTop: "auto", padding: "14px 20px", borderTop: `1px solid ${T.border}` }}>
        {/* Theme toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: T.ink3, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Theme
          </span>
          <button
            className="btn-hover"
            onClick={() => setDark(d => !d)}
            style={{
              padding: "5px 10px", background: T.paper,
              border: `1px solid ${T.border}`, color: T.ink,
              borderRadius: 6, cursor: "pointer", fontSize: 13,
              transition: "all 0.18s",
            }}
          >
            {dark ? "☀" : "☾"}
          </button>
        </div>

        {/* Role selector */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: T.ink3, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Role
          </span>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              padding: "5px 8px", background: T.paper,
              border: `1px solid ${T.border}`, color: T.ink,
              fontFamily: "'Syne',sans-serif", fontSize: 12,
              borderRadius: 6, cursor: "pointer",
            }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: T.ink3 }}>
          ● local storage active
        </div>
      </div>
    </div>
  );
}

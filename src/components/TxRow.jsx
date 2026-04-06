// Single row in the Transactions table
import { CATS } from "../utils/constants";
import { fmt } from "../utils/helpers";

export default function TxRow({ t, dark, T, role, onEdit, onDelete }) {
  const isInc = t.type === "income";
  const cat   = CATS[t.category] || CATS.Other;

  const catStyle = {
    fontSize: 11, padding: "3px 8px", borderRadius: 4,
    fontFamily: "'DM Mono',monospace", display: "inline-block",
    background: dark ? cat.darkBg : cat.bg,
    color:      dark ? cat.darkText : cat.text,
  };

  const typeStyle = {
    fontSize: 11, padding: "3px 8px", borderRadius: 4,
    fontWeight: 500, display: "inline-block",
    background: isInc ? T.greenBg : T.redBg,
    color:      isInc ? T.greenText : T.redText,
  };

  const tdBase = { padding: "10px 12px", borderTop: `1px solid ${T.border}` };

  return (
    <tr className="row-hover">
      <td style={{ ...tdBase, fontFamily: "'DM Mono',monospace", color: T.ink3, fontSize: 12 }}>
        {t.date}
      </td>
      <td style={{ ...tdBase, fontSize: 13, color: T.ink }}>
        {t.description}
      </td>
      <td style={tdBase}>
        <span style={catStyle}>{t.category}</span>
      </td>
      <td style={tdBase}>
        <span style={typeStyle}>{t.type}</span>
      </td>
      <td style={{ ...tdBase, textAlign: "right", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: isInc ? T.green : T.red }}>
        {isInc ? "+" : "−"}{fmt(t.amount)}
      </td>

      {role === "admin" && (
        <td style={{ ...tdBase, textAlign: "right", whiteSpace: "nowrap" }}>
          <button
            onClick={() => onEdit(t.id)}
            style={{ padding: "3px 8px", fontSize: 11, border: `1px solid ${T.border}`, background: T.paper, borderRadius: 4, cursor: "pointer", color: T.ink2, fontFamily: "'Syne',sans-serif", marginRight: 4 }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(t.id)}
            style={{ padding: "3px 8px", fontSize: 11, border: `1px solid ${T.redBg}`, background: T.redBg, borderRadius: 4, cursor: "pointer", color: T.red, fontFamily: "'Syne',sans-serif" }}
          >
            Del
          </button>
        </td>
      )}
    </tr>
  );
}

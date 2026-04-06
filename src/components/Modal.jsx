// Modal form — used to Add or Edit a transaction
import { useState, useEffect } from "react";
import { CATS } from "../utils/constants";
import { labelStyle, inputStyle } from "../utils/helpers";

export default function Modal({ open, onClose, onSave, initial, T }) {
  const [form, setForm] = useState({
    description: "", amount: "", type: "expense",
    category: "Food", date: new Date().toISOString().slice(0, 10),
  });

  // Reset form whenever modal opens
  useEffect(() => {
    if (open) {
      setForm(initial || {
        description: "", amount: "", type: "expense",
        category: "Food", date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [open, initial]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.description.trim() || !form.amount || !form.date) return;
    onSave({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 12, margin: "14px 0",
      background: "rgba(0,0,0,0.42)",
      padding: "24px 16px",
      animation: "fadeIn 0.15s ease",
    }}>
      <div style={{
        background: T.paper, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: 24, width: 380, maxWidth: "95%",
      }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 18, color: T.ink }}>
          {initial ? "Edit transaction" : "Add transaction"}
        </div>

        {/* Description */}
        <label style={labelStyle(T)}>Description</label>
        <input
          style={inputStyle(T)}
          value={form.description}
          placeholder="e.g. Grocery run"
          onChange={e => set("description", e.target.value)}
        />

        {/* Amount + Type */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle(T)}>Amount (₹)</label>
            <input
              style={inputStyle(T)}
              type="number" min="1"
              value={form.amount} placeholder="0"
              onChange={e => set("amount", e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle(T)}>Type</label>
            <select style={inputStyle(T)} value={form.type} onChange={e => set("type", e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Category + Date */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle(T)}>Category</label>
            <select style={inputStyle(T)} value={form.category} onChange={e => set("category", e.target.value)}>
              {Object.keys(CATS).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle(T)}>Date</label>
            <input
              style={inputStyle(T)}
              type="date" value={form.date}
              onChange={e => set("date", e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
          <button
            onClick={onClose}
            style={{ padding: "7px 14px", background: T.paper2, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: "'Syne',sans-serif", fontSize: 13, cursor: "pointer", color: T.ink }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ padding: "7px 14px", background: T.accent, border: "none", borderRadius: 8, fontFamily: "'Syne',sans-serif", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600 }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

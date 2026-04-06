// Toast notification — appears briefly at top-right of main area

export default function Toast({ message, visible, T }) {
  return (
    <div style={{
      position: "absolute", top: 12, right: 12, zIndex: 50,
      padding: "8px 16px",
      background: T.paper2,
      border: `1px solid ${T.border}`,
      borderRadius: 10,
      fontSize: 12,
      fontFamily: "'DM Mono',monospace",
      color: T.ink2,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-6px)",
      transition: "opacity 0.2s, transform 0.2s",
      pointerEvents: "none",
    }}>
      {message}
    </div>
  );
}

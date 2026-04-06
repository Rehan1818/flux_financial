// Donut chart — used on Overview page for spending by category
import { CATS } from "../utils/constants";
import { fmtShort } from "../utils/helpers";

export default function DonutChart({ data, dark }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total   = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return null;

  const r = 50, cx = 60, cy = 60, sw = 16;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  const slices = entries.map(([cat, val]) => {
    const dash = (val / total) * circ;
    const s = { cat, dash, offset };
    offset += dash;
    return s;
  });

  return (
    <svg viewBox="0 0 120 120" style={{ width: 120, height: 120, flexShrink: 0 }}>
      {/* background ring */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}
        strokeWidth={sw}
      />
      {/* colored slices */}
      {slices.map(({ cat, dash, offset: off }) => (
        <circle
          key={cat}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={CATS[cat]?.color || "#888"}
          strokeWidth={sw}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={-off + circ * 0.25}
        />
      ))}
      {/* center label */}
      <text
        x={cx} y={cy + 5}
        textAnchor="middle" fontSize="10"
        fontFamily="'DM Mono',monospace"
        fill={dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"}
      >
        {fmtShort(total)}
      </text>
    </svg>
  );
}

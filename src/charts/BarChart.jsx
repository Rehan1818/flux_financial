// Grouped bar chart — used on Insights page for month-over-month comparison

export default function BarChart({ keys, labels, months, dark, accent, red }) {
  if (!keys.length) return null;

  const w = 500, h = 160, padX = 10;
  const maxV = Math.max(...keys.flatMap(k => [months[k].income, months[k].expense])) || 1;
  const bw   = (w - 2 * padX) / keys.length;
  const bw2  = Math.min(bw * 0.28, 18);
  const tick = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>
      {keys.map((k, i) => {
        const x  = padX + i * bw + bw / 2;
        const iH = (months[k].income  / maxV) * (h - 40);
        const eH = (months[k].expense / maxV) * (h - 40);
        return (
          <g key={k}>
            <rect x={x - bw2 - 2} y={h - 20 - iH} width={bw2} height={iH} fill={accent + "99"} rx="3" />
            <rect x={x + 2}       y={h - 20 - eH} width={bw2} height={eH} fill={red    + "99"} rx="3" />
            <text x={x} y={h - 5} textAnchor="middle" fontSize="9" fill={tick} fontFamily="'DM Mono',monospace">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

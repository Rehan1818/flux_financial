// Line chart with gradient fill — used on Overview page

export default function LineChart({ data, color, labels }) {
  if (!data || data.length < 2) return null;

  const w = 400, h = 130, padX = 8, padY = 14;
  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => [
    padX + (i / (data.length - 1)) * (w - 2 * padX),
    h - padY - ((v - min) / range) * (h - 2 * padY),
  ]);

  const line = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const area = line + ` L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  const gid  = "lg" + color.replace(/[^a-z0-9]/gi, "");

  return (
    <svg viewBox={`0 0 ${w} ${h + 18}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="4" fill={color} />
          {labels && (
            <text
              x={p[0]} y={h + 14}
              textAnchor="middle" fontSize="9"
              fill="currentColor" opacity="0.4"
              fontFamily="'DM Mono',monospace"
            >
              {labels[i]}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

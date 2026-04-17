import React, { useMemo } from "react";

// Subtle animated SVG network visual used on the right side of the hero.
// Static geometry (deterministic) with gently pulsing nodes.
export default function HeroNetwork() {
  const { nodes, links } = useMemo(() => {
    const cols = 6;
    const rows = 7;
    const gx = 80;
    const gy = 62;
    const offsetX = 40;
    const offsetY = 30;
    const nodeList = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // slight pseudo-random jitter using deterministic seed
        const seed = r * 13 + c * 7;
        const jx = ((seed * 9301 + 49297) % 233280) / 233280 - 0.5;
        const jy = ((seed * 4817 + 11231) % 233280) / 233280 - 0.5;
        nodeList.push({
          id: `${r}-${c}`,
          x: offsetX + c * gx + jx * 14,
          y: offsetY + r * gy + jy * 14,
          key: r * cols + c,
        });
      }
    }
    // Build sparse link set
    const linkList = [];
    nodeList.forEach((n, i) => {
      const right = nodeList[i + 1];
      const down = nodeList[i + cols];
      if (right && (i % cols) !== cols - 1 && (i * 7) % 3 !== 0) {
        linkList.push({ a: n, b: right, id: `r-${i}` });
      }
      if (down && (i * 11) % 4 !== 0) {
        linkList.push({ a: n, b: down, id: `d-${i}` });
      }
    });
    return { nodes: nodeList, links: linkList };
  }, []);

  const highlightIds = new Set([
    "1-2",
    "2-4",
    "3-1",
    "4-3",
    "5-5",
    "0-4",
    "6-2",
  ]);

  return (
    <div
      data-testid="hero-network-visual"
      className="relative w-full h-full min-h-[420px] md:min-h-[520px]"
    >
      {/* base grid */}
      <div className="absolute inset-0 bg-grid-soft mask-radial opacity-70" />
      {/* gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(198,168,91,0.08), transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 560 500"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1F2630" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1F2630" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="nodeGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4B76A" stopOpacity="1" />
            <stop offset="100%" stopColor="#C6A85B" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Links */}
        <g stroke="url(#lineGrad)" strokeWidth="0.8">
          {links.map((l) => (
            <line
              key={l.id}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              opacity="0.55"
            />
          ))}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((n) => {
            const isGold = highlightIds.has(n.id);
            return (
              <g key={n.id}>
                {isGold && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="6"
                    fill="url(#nodeGold)"
                    opacity="0.35"
                    className="animate-pulseNode"
                    style={{ animationDelay: `${(n.key % 7) * 0.4}s` }}
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isGold ? 1.8 : 1.2}
                  fill={isGold ? "#D4B76A" : "#2A3340"}
                />
              </g>
            );
          })}
        </g>

        {/* accent frame */}
        <g stroke="#1F2630" strokeWidth="1" fill="none">
          <rect x="24" y="18" width="512" height="464" rx="10" />
        </g>

        {/* corner ticks */}
        <g stroke="#C6A85B" strokeWidth="1">
          <line x1="24" y1="18" x2="44" y2="18" />
          <line x1="24" y1="18" x2="24" y2="38" />
          <line x1="536" y1="482" x2="516" y2="482" />
          <line x1="536" y1="482" x2="536" y2="462" />
        </g>
      </svg>

      {/* readout strips */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] tracking-[0.3em] text-muted">
        <span>NODE · 07</span>
        <span className="hidden sm:inline">STATUS · STABLE</span>
        <span>SECTOR · 04</span>
      </div>
    </div>
  );
}

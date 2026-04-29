import { motion } from "framer-motion";
import {
  MonitorCheck,
  Target,
  BellRing,
  ShieldAlert,
  UserCog,
  AppWindow,
  FileCheck2,
} from "lucide-react";

/**
 * Animated cybersecurity hex-network background.
 * 7 hexagon nodes connected by glowing electric-blue lines with traveling
 * light pulses and a soft particle field. Fully decorative.
 */

type Node = {
  id: string;
  label: string;
  x: number; // % of viewBox
  y: number; // % of viewBox
  Icon: React.ComponentType<{ className?: string }>;
};

// Layout: 3 hexes top row, 4 hexes bottom row (matches reference image)
const NODES: Node[] = [
  { id: "soc", label: "24/7 SOC\nMonitoring", x: 22, y: 30, Icon: MonitorCheck },
  { id: "tra", label: "Threat & Risk\nAnalysis", x: 44, y: 30, Icon: Target },
  { id: "ir", label: "Incident Response\n& Training", x: 66, y: 30, Icon: BellRing },
  { id: "vm", label: "Vulnerability\nManagement", x: 11, y: 70, Icon: ShieldAlert },
  { id: "vciso", label: "vCISO\nAdvisory", x: 33, y: 70, Icon: UserCog },
  { id: "m365", label: "M365 Security\nHardening", x: 55, y: 70, Icon: AppWindow },
  { id: "policy", label: "Security Policy\nDevelopment", x: 77, y: 70, Icon: FileCheck2 },
];

// Connections (edges between node ids)
const EDGES: [string, string][] = [
  ["soc", "tra"],
  ["tra", "ir"],
  ["soc", "vm"],
  ["soc", "vciso"],
  ["tra", "vciso"],
  ["tra", "m365"],
  ["ir", "m365"],
  ["ir", "policy"],
  ["vm", "vciso"],
  ["vciso", "m365"],
  ["m365", "policy"],
];

const VB_W = 1000;
const VB_H = 600;
const HEX_R = 70; // hex "radius" (center to vertex)

// Pointy-top hexagon points centered at (cx, cy) with radius r
const hexPoints = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
};

const toPx = (n: Node) => ({
  cx: (n.x / 100) * VB_W,
  cy: (n.y / 100) * VB_H,
});

const ServicesHexNetwork = () => {
  // Pre-build particles (deterministic positions)
  const particles = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    cx: (i * 137.5) % VB_W,
    cy: (i * 71.3) % VB_H,
    r: 0.6 + ((i * 13) % 7) / 6,
    delay: (i % 10) * 0.4,
    dur: 4 + (i % 5),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Hex stroke gradient */}
          <linearGradient id="hexStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5BA8FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1E63E0" stopOpacity="0.6" />
          </linearGradient>
          {/* Hex fill gradient */}
          <radialGradient id="hexFill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0A1635" stopOpacity="0.0" />
          </radialGradient>
          {/* Edge gradient */}
          <linearGradient id="edgeGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
          </linearGradient>
          {/* Soft glow */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Faint circuit pattern */}
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 60 H40 V20 H80 V60 H120 M60 0 V40 H100 V80 H60 V120"
              stroke="#3B82F6"
              strokeOpacity="0.08"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="40" cy="60" r="1.2" fill="#60A5FA" fillOpacity="0.18" />
            <circle cx="80" cy="20" r="1.2" fill="#60A5FA" fillOpacity="0.18" />
            <circle cx="60" cy="80" r="1.2" fill="#60A5FA" fillOpacity="0.18" />
          </pattern>
        </defs>

        {/* Circuit backdrop */}
        <rect width={VB_W} height={VB_H} fill="url(#circuit)" />

        {/* Drifting particles */}
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#7DB8FF"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.7;0.1"
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${p.cy};${p.cy - 18};${p.cy}`}
              dur={`${p.dur + 2}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES.find((n) => n.id === a)!;
          const nb = NODES.find((n) => n.id === b)!;
          const pa = toPx(na);
          const pb = toPx(nb);
          const pathId = `edge-${i}`;
          const d = `M ${pa.cx} ${pa.cy} L ${pb.cx} ${pb.cy}`;
          return (
            <g key={pathId}>
              {/* Bloom underlay */}
              <path
                d={d}
                stroke="#3B82F6"
                strokeOpacity="0.25"
                strokeWidth="3"
                fill="none"
                filter="url(#bigGlow)"
              />
              {/* Crisp line */}
              <path
                id={pathId}
                d={d}
                stroke="url(#edgeGrad)"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Traveling pulse */}
              <circle r="2.6" fill="#BFDBFE" filter="url(#softGlow)">
                <animateMotion
                  dur={`${3.5 + (i % 4) * 0.6}s`}
                  begin={`${(i % 5) * 0.5}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={d}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${3.5 + (i % 4) * 0.6}s`}
                  begin={`${(i % 5) * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Nodes (hex shapes only — icons rendered as HTML overlay for crisp lucide icons) */}
        {NODES.map((n, i) => {
          const { cx, cy } = toPx(n);
          return (
            <g key={n.id}>
              {/* Outer breathing glow */}
              <polygon
                points={hexPoints(cx, cy, HEX_R + 4)}
                fill="none"
                stroke="#60A5FA"
                strokeOpacity="0.35"
                strokeWidth="2"
                filter="url(#bigGlow)"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.18;0.55;0.18"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                />
              </polygon>
              {/* Hex body */}
              <polygon
                points={hexPoints(cx, cy, HEX_R)}
                fill="url(#hexFill)"
                stroke="url(#hexStroke)"
                strokeWidth="1.4"
              />
              {/* Inner hex line */}
              <polygon
                points={hexPoints(cx, cy, HEX_R - 6)}
                fill="none"
                stroke="#60A5FA"
                strokeOpacity="0.25"
                strokeWidth="0.8"
              />
              {/* Connection dot at top of hex */}
              <circle cx={cx} cy={cy - HEX_R} r="2.2" fill="#93C5FD" />
            </g>
          );
        })}
      </svg>

      {/* Icon + label overlay (HTML for crisp lucide rendering) */}
      <div className="absolute inset-0">
        {NODES.map((n, i) => {
          const { Icon } = n;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
                width: 130,
              }}
            >
              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 10px rgba(96,165,250,0.65))",
                }}
              >
                <Icon className="w-7 h-7 text-sky-300" />
              </motion.div>
              <div className="mt-2 text-[11px] leading-tight text-sky-100/90 font-medium whitespace-pre-line">
                {n.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesHexNetwork;

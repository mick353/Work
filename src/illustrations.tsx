/**
 * Original inline SVG illustrations.
 *
 * Deliberately NOT a third-party illustration pack:
 *   - the app ships as one self-contained HTML file, so external or base64
 *     raster assets would either break that or multiply its size;
 *   - licence terms on the free packs vary and several require per-asset
 *     attribution, which would need re-verifying whenever terms change;
 *   - generic stock figures teach nothing.
 *
 * These are conceptual diagrams instead. Each one restates the idea the stage
 * is actually about, inherits the stage accent through currentColor and CSS
 * variables, and carries a real aria-label — a learner using a screen reader
 * gets the concept, not "image".
 */

type Props = { className?: string };

const wrap = (label: string, children: React.ReactNode, viewBox = "0 0 320 180", className?: string) => (
  <svg
    className={`illus ${className ?? ""}`}
    viewBox={viewBox}
    role="img"
    aria-label={label}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

/* Stage 1 — a project ends; a product loops. */
export function IllusProductVsProject({ className }: Props) {
  return wrap(
    "A project is a line with a fixed start and end. A product is a continuous loop that keeps returning to improvement.",
    <>
      <text x="10" y="26" className="illus-label">PROJECT</text>
      <line x1="10" y1="48" x2="140" y2="48" className="illus-line-dim" strokeWidth="3" strokeLinecap="round" />
      <circle cx="10" cy="48" r="6" className="illus-fill-dim" />
      <rect x="132" y="40" width="16" height="16" className="illus-fill-dim" rx="2" />
      <text x="10" y="76" className="illus-sub">start → deliver → close</text>

      <text x="180" y="26" className="illus-label">PRODUCT</text>
      <path
        d="M245 40 a44 44 0 1 1 -0.1 0"
        className="illus-stroke"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="200 44"
      />
      <path d="M238 34 l9 6 -9 6 z" className="illus-fill" />
      <text x="245" y="88" textAnchor="middle" className="illus-sub">own · measure · improve</text>

      <line x1="10" y1="128" x2="310" y2="128" className="illus-line-dim" strokeDasharray="4 6" />
      <text x="10" y="152" className="illus-sub">Ownership is the difference — not the method, not the medium.</text>
    </>,
    "0 0 320 180",
    className,
  );
}

/* Stage 2 — many signals converge into one evidenced problem. */
export function IllusDiscoveryFunnel({ className }: Props) {
  const sources = ["Interviews", "Observation", "Analytics", "Support data"];
  return wrap(
    "Four evidence sources — interviews, observation, analytics and support data — converge through triangulation into a single evidenced problem statement.",
    <>
      {sources.map((label, i) => (
        <g key={label}>
          <rect x="8" y={16 + i * 34} width="96" height="24" rx="6" className="illus-fill-soft" />
          <text x="56" y={32 + i * 34} textAnchor="middle" className="illus-sub">{label}</text>
          <path
            d={`M108 ${28 + i * 34} C 140 ${28 + i * 34}, 150 90, 178 90`}
            className="illus-stroke"
            strokeWidth="2"
            fill="none"
            opacity="0.55"
          />
        </g>
      ))}
      <circle cx="196" cy="90" r="16" className="illus-fill" />
      <text x="196" y="95" textAnchor="middle" className="illus-on-fill">?</text>
      <path d="M216 90 h24" className="illus-stroke" strokeWidth="2.5" markerEnd="" />
      <path d="M236 84 l8 6 -8 6 z" className="illus-fill" />
      <rect x="248" y="70" width="64" height="40" rx="8" className="illus-stroke-box" />
      <text x="280" y="87" textAnchor="middle" className="illus-label-sm">PROBLEM</text>
      <text x="280" y="101" textAnchor="middle" className="illus-sub">evidenced</text>
    </>,
    "0 0 320 180",
    className,
  );
}

/* Stage 3 — an output is a thing; an outcome is a change over time. */
export function IllusOutputToOutcome({ className }: Props) {
  return wrap(
    "An output is a delivered artefact at a point in time. An outcome is a measured change in a curve after it, with a guardrail line that must not be crossed.",
    <>
      <rect x="12" y="60" width="72" height="46" rx="8" className="illus-fill-soft" />
      <text x="48" y="80" textAnchor="middle" className="illus-label-sm">OUTPUT</text>
      <text x="48" y="96" textAnchor="middle" className="illus-sub">shipped</text>
      <path d="M92 83 h22" className="illus-stroke" strokeWidth="2.5" />
      <path d="M110 77 l9 6 -9 6 z" className="illus-fill" />

      <line x1="128" y1="130" x2="308" y2="130" className="illus-line-dim" />
      <line x1="128" y1="30" x2="128" y2="130" className="illus-line-dim" />
      <path d="M128 118 C 172 116, 196 96, 224 76 S 274 44, 306 38" className="illus-stroke" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="306" cy="38" r="5" className="illus-fill" />
      <line x1="128" y1="58" x2="308" y2="58" className="illus-guardrail" strokeDasharray="5 5" strokeWidth="2" />
      <text x="304" y="52" textAnchor="end" className="illus-sub-warn">guardrail</text>
      <text x="132" y="148" className="illus-sub">time →</text>
      <text x="132" y="24" className="illus-label-sm">OUTCOME</text>
    </>,
    "0 0 320 180",
    className,
  );
}

/* Stage 4 — the DVF intersection, with each pair's named risk. */
export function IllusDvf({ className }: Props) {
  return wrap(
    "Three overlapping circles: desirable, feasible and viable. Any two without the third produces a named failure — usable but misaligned, operable but unwanted, or valuable but unbuildable.",
    <>
      <circle cx="126" cy="72" r="52" className="illus-venn illus-venn-a" />
      <circle cx="194" cy="72" r="52" className="illus-venn illus-venn-b" />
      <circle cx="160" cy="118" r="52" className="illus-venn illus-venn-c" />
      <text x="96" y="46" textAnchor="middle" className="illus-label-sm">DESIRABLE</text>
      <text x="226" y="46" textAnchor="middle" className="illus-label-sm">FEASIBLE</text>
      <text x="160" y="168" textAnchor="middle" className="illus-label-sm">VIABLE</text>
      <circle cx="160" cy="88" r="9" className="illus-fill" />
      <text x="160" y="92" textAnchor="middle" className="illus-on-fill">✓</text>
    </>,
    "0 0 320 180",
    className,
  );
}

/* Stage 5 — five sprints inside one Program Increment. */
export function IllusCadence({ className }: Props) {
  return wrap(
    "One ten-week Program Increment containing five two-week sprints, with discovery for the next increment running in parallel above it.",
    <>
      <text x="10" y="24" className="illus-label">DISCOVERY — PI N+1</text>
      <rect x="10" y="32" width="300" height="20" rx="10" className="illus-fill-soft" />
      <text x="160" y="46" textAnchor="middle" className="illus-sub">an increment ahead</text>

      <text x="10" y="82" className="illus-label">DELIVERY — PI N (10 weeks)</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={10 + i * 61} y="90" width="52" height="30" rx="6" className="illus-fill" />
          <text x={36 + i * 61} y="109" textAnchor="middle" className="illus-on-fill">S{i + 1}</text>
        </g>
      ))}
      <line x1="10" y1="132" x2="310" y2="132" className="illus-stroke" strokeWidth="2" />
      <path d="M304 126 l8 6 -8 6 z" className="illus-fill" />
      <text x="10" y="152" className="illus-sub">Each sprint releases usable value · measurement feeds the next PI</text>
    </>,
    "0 0 320 180",
    className,
  );
}

/* Stage 6 — the continuous loop. */
export function IllusLifecycleLoop({ className }: Props) {
  const steps = ["Discover", "Define", "Deliver", "Measure", "Iterate"];
  const cx = 160;
  const cy = 92;
  const r = 62;
  return wrap(
    "A five-step continuous loop: discover, define, deliver, measure, iterate — returning to discover rather than ending.",
    <>
      <circle cx={cx} cy={cy} r={r} className="illus-stroke" strokeWidth="2.5" fill="none" strokeDasharray="6 7" opacity="0.5" />
      {steps.map((label, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="15" className="illus-fill" />
            <text x={x} y={y + 4} textAnchor="middle" className="illus-on-fill">{i + 1}</text>
            <text x={x} y={y + 30} textAnchor="middle" className="illus-sub">{label}</text>
          </g>
        );
      })}
    </>,
    "0 0 320 190",
    className,
  );
}

/* Stage 7 — three layers, three questions. */
export function IllusLayers({ className }: Props) {
  const layers = [
    { name: "Strategic", q: "What future are we creating?" },
    { name: "Coordination", q: "What should we deliver next?" },
    { name: "Delivery", q: "How do we deliver this well?" },
  ];
  return wrap(
    "Three stacked layers — strategic, coordination and delivery — each owning a different question, with a product, design and technology trio present at every level.",
    <>
      {layers.map((layer, i) => (
        <g key={layer.name}>
          <rect x="10" y={16 + i * 52} width="300" height="42" rx="10" className={i === 0 ? "illus-fill" : "illus-fill-soft"} />
          <text x="24" y={36 + i * 52} className={i === 0 ? "illus-on-fill-label" : "illus-label-sm"}>{layer.name.toUpperCase()}</text>
          <text x="24" y={50 + i * 52} className={i === 0 ? "illus-on-fill-sub" : "illus-sub"}>{layer.q}</text>
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={266 + d * 16} cy={37 + i * 52} r="6" className={i === 0 ? "illus-dot-on-fill" : "illus-dot"} />
          ))}
        </g>
      ))}
      <text x="310" y="176" textAnchor="end" className="illus-sub">product · design · technology at every layer</text>
    </>,
    "0 0 320 185",
    className,
  );
}

/* Stage 8 — four DES phases with gates between them. */
export function IllusPhaseGates({ className }: Props) {
  const phases = ["Pre-Approval", "Pre-Delivery", "Delivery", "Closure"];
  return wrap(
    "The four DES delivery phases — Pre-Approval, Pre-Delivery, Delivery and Closure — separated by stage gates, with product risk concentrated at Closure.",
    <>
      {phases.map((phase, i) => {
        const x = 8 + i * 78;
        const last = i === phases.length - 1;
        return (
          <g key={phase}>
            <rect x={x} y="54" width="66" height="46" rx="8" className={last ? "illus-fill-warn" : "illus-fill-soft"} />
            <text x={x + 33} y="74" textAnchor="middle" className="illus-label-xs">{phase.split("-")[0]}</text>
            {phase.includes("-") && (
              <text x={x + 33} y="88" textAnchor="middle" className="illus-label-xs">{phase.split("-")[1]}</text>
            )}
            {i < phases.length - 1 && (
              <g>
                <line x1={x + 68} y1="42" x2={x + 68} y2="112" className="illus-line-dim" strokeDasharray="3 4" />
                <text x={x + 68} y="34" textAnchor="middle" className="illus-sub">gate</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="160" y="140" textAnchor="middle" className="illus-sub-warn">
        Closure is where the project ends and the product does not
      </text>
      <text x="160" y="158" textAnchor="middle" className="illus-sub">Hand over ownership, measures and a cadence — or quality decays unowned</text>
    </>,
    "0 0 320 175",
    className,
  );
}

/* Stage 9 — the full chain of evidence. */
export function IllusEvidenceChain({ className }: Props) {
  const links = ["Need", "Problem", "Outcome", "Options", "Evidence", "Delivery", "Measure", "Learn"];
  return wrap(
    "The chain of product reasoning: need, problem, outcome, options, evidence, delivery, measurement and learning — with learning feeding back to need.",
    <>
      {links.map((link, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 12 + col * 76;
        const y = 34 + row * 62;
        return (
          <g key={link}>
            <rect x={x} y={y} width="62" height="32" rx="8" className="illus-fill-soft" />
            <text x={x + 31} y={y + 21} textAnchor="middle" className="illus-label-xs">{link}</text>
            {col < 3 && (
              <>
                <line x1={x + 64} y1={y + 16} x2={x + 70} y2={y + 16} className="illus-stroke" strokeWidth="2" />
                <path d={`M${x + 68} ${y + 12} l6 4 -6 4 z`} className="illus-fill" />
              </>
            )}
          </g>
        );
      })}
      <path d="M296 66 C 312 66, 312 96, 296 96" className="illus-stroke" strokeWidth="2" fill="none" />
      <path d="M12 112 C -4 112, -4 50, 12 50" className="illus-stroke" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <text x="160" y="20" textAnchor="middle" className="illus-sub">Every item traces back to a problem and forward to a measure</text>
      <text x="160" y="152" textAnchor="middle" className="illus-sub">Learning returns to need — the chain is a loop, not a line</text>
    </>,
    "0 0 320 165",
    className,
  );
}

/* Empty states */
export function IllusEmptyQueue({ className }: Props) {
  return wrap(
    "An empty review queue with a checkmark and a calendar showing the next scheduled card.",
    <>
      <rect x="96" y="30" width="128" height="96" rx="12" className="illus-stroke-box" />
      <line x1="96" y1="56" x2="224" y2="56" className="illus-line-dim" />
      <circle cx="112" cy="43" r="4" className="illus-fill-dim" />
      <circle cx="126" cy="43" r="4" className="illus-fill-dim" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={110 + c * 26} y={68 + r * 18} width="16" height="10" rx="3" className="illus-fill-soft" />
        )),
      )}
      <circle cx="212" cy="112" r="20" className="illus-fill-success" />
      <path d="M203 112 l6 6 12 -13" className="illus-check" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>,
    "0 0 320 150",
    className,
  );
}

export function IllusEmptyResults({ className }: Props) {
  return wrap(
    "An empty chart waiting for its first recorded attempt.",
    <>
      <line x1="40" y1="118" x2="284" y2="118" className="illus-line-dim" strokeWidth="2" />
      <line x1="40" y1="24" x2="40" y2="118" className="illus-line-dim" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={62 + i * 44} y={100 - i * 4} width="26" height={18 + i * 4} rx="4" className="illus-fill-soft" />
      ))}
      <path d="M62 92 C 120 84, 180 62, 268 40" className="illus-stroke" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" opacity="0.6" />
      <text x="162" y="144" textAnchor="middle" className="illus-sub">your first attempt starts the trend</text>
    </>,
    "0 0 320 155",
    className,
  );
}

/** Stage id → illustration, so the module view can look one up. */
export const stageIllustrations: Record<string, (props: Props) => React.ReactElement> = {
  thinking: IllusProductVsProject,
  discovery: IllusDiscoveryFunnel,
  outcomes: IllusOutputToOutcome,
  exploration: IllusDvf,
  delivery: IllusCadence,
  lifecycle: IllusLifecycleLoop,
  roles: IllusLayers,
  government: IllusPhaseGates,
  integration: IllusEvidenceChain,
};

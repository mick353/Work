/**
 * Original inline SVG illustrations.
 *
 * Not a third-party pack: the app ships as one self-contained HTML file, so
 * raster assets would break that or balloon it; free-pack licence terms vary
 * per asset; and stock figures teach nothing. These are conceptual diagrams
 * that restate the idea each stage is about.
 *
 * Visual system — kept consistent so nine diagrams read as one family:
 *   - a soft tinted panel behind every scene
 *   - gradient fills, never flat, with a soft drop shadow for depth
 *   - generous scale: few labels, none below 12px
 *   - rounded geometry throughout, 6px+ corner radii
 *   - all colour inherited from the stage accent, so each diagram recolours
 *     itself without any per-stage markup
 *
 * Every gradient and filter id is namespaced per instance, because several
 * illustrations can be in the DOM at once and duplicate SVG ids silently
 * cross-wire fills between them.
 */

import { useId } from "react";

type Props = { className?: string };

/** Shared gradient + shadow defs. `id` prefixes everything for this instance. */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--stage)" />
        <stop offset="100%" stopColor="var(--stage)" stopOpacity="0.82" />
      </linearGradient>
      <linearGradient id={`${id}-soft`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--stage)" stopOpacity="0.14" />
        <stop offset="100%" stopColor="var(--stage)" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--stage)" stopOpacity="0.05" />
        <stop offset="100%" stopColor="var(--stage)" stopOpacity="0.015" />
      </linearGradient>
      <linearGradient id={`${id}-warm`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--vivid-8)" />
        <stop offset="100%" stopColor="var(--vivid-7)" />
      </linearGradient>
      <linearGradient id={`${id}-cool`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--vivid-5)" />
        <stop offset="100%" stopColor="var(--vivid-6)" />
      </linearGradient>
      <linearGradient id={`${id}-good`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--vivid-3)" />
        <stop offset="100%" stopColor="var(--vivid-2)" />
      </linearGradient>
      <filter id={`${id}-lift`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0b1220" floodOpacity="0.16" />
      </filter>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="9" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
  );
}

function Frame({
  id,
  label,
  viewBox,
  className,
  children,
}: {
  id: string;
  label: string;
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  return (
    <svg className={`illus ${className ?? ""}`} viewBox={viewBox} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <Defs id={id} />
      <rect x="0" y="0" width={w} height={h} rx="20" fill={`url(#${id}-panel)`} />
      {children}
    </svg>
  );
}

/* ============================================================ *
 * Stage 1 — a project terminates; a product compounds.
 * ============================================================ */
export function IllusProductVsProject({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="A project is a line that starts, delivers and stops. A product is a continuous cycle of ownership, measurement and improvement that keeps compounding."
    >
      <text x="40" y="46" className="illus-kicker">PROJECT</text>
      <line x1="40" y1="104" x2="228" y2="104" className="illus-track" strokeWidth="10" strokeLinecap="round" />
      <circle cx="40" cy="104" r="13" className="illus-muted-fill" />
      <rect x="206" y="86" width="36" height="36" rx="10" className="illus-muted-fill" />
      <path d="M215 104 l7 7 12 -14" className="illus-tick-muted" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="40" y="150" className="illus-caption">start → deliver → close</text>
      <text x="40" y="176" className="illus-caption-dim">the team disperses; the service continues without an owner</text>

      <line x1="278" y1="40" x2="278" y2="220" className="illus-divider" />

      <text x="320" y="46" className="illus-kicker">PRODUCT</text>
      <g filter={`url(#${id}-lift)`}>
        <circle cx="418" cy="132" r="62" fill="none" stroke={`url(#${id}-a)`} strokeWidth="12" strokeLinecap="round" strokeDasharray="300 90" transform="rotate(-38 418 132)" />
      </g>
      <path d="M462 92 l4 22 -22 -5 z" fill={`url(#${id}-a)`} />
      {[
        { x: 418, y: 70, t: "own" },
        { x: 480, y: 132, t: "measure" },
        { x: 418, y: 194, t: "improve" },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="9" fill={`url(#${id}-a)`} />
          <circle cx={n.x} cy={n.y} r="15" fill="none" stroke="var(--stage)" strokeOpacity="0.28" strokeWidth="2" />
        </g>
      ))}
      <text x="418" y="238" textAnchor="middle" className="illus-caption">value compounds while ownership holds</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 2 — many signals, triangulated into one evidenced problem.
 * ============================================================ */
export function IllusDiscoveryFunnel({ className }: Props) {
  const id = useId().replace(/:/g, "");
  const sources = ["Interviews", "Observation", "Analytics", "Support data"];
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="Four evidence sources — interviews, observation, analytics and support data — are triangulated into a single evidenced problem statement, which then produces a testable hypothesis."
    >
      {sources.map((label, i) => {
        const y = 48 + i * 46;
        return (
          <g key={label}>
            <rect x="32" y={y} width="150" height="34" rx="12" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.3" />
            <circle cx="52" cy={y + 17} r="5" fill={`url(#${id}-a)`} />
            <text x="68" y={y + 22} className="illus-caption-strong">{label}</text>
            <path
              d={`M188 ${y + 17} C 236 ${y + 17}, 244 130, 286 130`}
              stroke="var(--stage)"
              strokeOpacity="0.4"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <g filter={`url(#${id}-lift)`}>
        <circle cx="316" cy="130" r="30" fill={`url(#${id}-a)`} />
      </g>
      <text x="316" y="139" textAnchor="middle" className="illus-on-accent-lg">?</text>
      <text x="316" y="192" textAnchor="middle" className="illus-caption-dim">triangulate</text>

      <path d="M356 130 h34" stroke="var(--stage)" strokeWidth="3" strokeLinecap="round" />
      <path d="M384 122 l12 8 -12 8 z" fill={`url(#${id}-a)`} />

      <g filter={`url(#${id}-lift)`}>
        <rect x="404" y="96" width="128" height="68" rx="16" className="illus-card" />
      </g>
      <rect x="404" y="96" width="128" height="6" rx="3" fill={`url(#${id}-a)`} />
      <text x="468" y="128" textAnchor="middle" className="illus-label">PROBLEM</text>
      <text x="468" y="150" textAnchor="middle" className="illus-caption-dim">evidenced, not assumed</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 3 — output is a moment; outcome is a curve, with a guardrail.
 * ============================================================ */
export function IllusOutputToOutcome({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="An output is a delivered artefact at a single moment. An outcome is a measured curve rising over time afterwards, bounded by a guardrail line that must not be crossed."
    >
      <g filter={`url(#${id}-lift)`}>
        <rect x="34" y="102" width="118" height="72" rx="16" className="illus-card" />
      </g>
      <rect x="34" y="102" width="118" height="6" rx="3" className="illus-muted-fill" />
      <text x="93" y="136" textAnchor="middle" className="illus-label">OUTPUT</text>
      <text x="93" y="158" textAnchor="middle" className="illus-caption-dim">shipped</text>
      <path d="M162 138 h30" className="illus-track" strokeWidth="3" strokeLinecap="round" />
      <path d="M186 130 l12 8 -12 8 z" className="illus-muted-fill" />

      <line x1="222" y1="212" x2="530" y2="212" className="illus-axis" />
      <line x1="222" y1="44" x2="222" y2="212" className="illus-axis" />

      <path d="M222 200 C 288 196, 330 158, 380 122 S 470 66, 524 56 L524 212 L222 212 Z" fill={`url(#${id}-soft)`} />
      <path d="M222 200 C 288 196, 330 158, 380 122 S 470 66, 524 56" fill="none" stroke={`url(#${id}-a)`} strokeWidth="5" strokeLinecap="round" />
      <circle cx="524" cy="56" r="9" fill={`url(#${id}-a)`} />
      <circle cx="524" cy="56" r="16" fill="none" stroke="var(--stage)" strokeOpacity="0.3" strokeWidth="2.5" />

      <line x1="222" y1="88" x2="530" y2="88" className="illus-guardrail" strokeDasharray="8 7" strokeWidth="3" />
      <rect x="430" y="66" width="98" height="22" rx="11" className="illus-warn-chip" />
      <text x="479" y="81" textAnchor="middle" className="illus-chip-text">guardrail</text>

      <text x="230" y="238" className="illus-caption-dim">time →</text>
      <text x="230" y="36" className="illus-kicker">OUTCOME</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 4 — DVF, with the named risk of each pair.
 * ============================================================ */
export function IllusDvf({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame
      id={id}
      viewBox="0 0 560 280"
      className={className}
      label="Three overlapping circles — desirable, feasible and viable. Each pair without the third has a named failure: usable but misaligned, operable but unwanted, or valuable but unbuildable. Only the centre satisfies all three."
    >
      <g filter={`url(#${id}-glow)`} opacity="0.9">
        <circle cx="228" cy="112" r="82" fill={`url(#${id}-a)`} fillOpacity="0.24" stroke="var(--stage)" strokeWidth="2.5" />
        <circle cx="332" cy="112" r="82" fill={`url(#${id}-cool)`} fillOpacity="0.24" stroke="var(--stage-5)" strokeWidth="2.5" />
        <circle cx="280" cy="188" r="82" fill={`url(#${id}-warm)`} fillOpacity="0.24" stroke="var(--stage-8)" strokeWidth="2.5" />
      </g>

      <text x="168" y="58" textAnchor="middle" className="illus-label">DESIRABLE</text>
      <text x="168" y="76" textAnchor="middle" className="illus-caption-dim">people need it</text>
      <text x="396" y="58" textAnchor="middle" className="illus-label">FEASIBLE</text>
      <text x="396" y="76" textAnchor="middle" className="illus-caption-dim">we can build it</text>
      <text x="280" y="264" textAnchor="middle" className="illus-label">VIABLE</text>

      <g filter={`url(#${id}-lift)`}>
        <circle cx="280" cy="140" r="24" fill={`url(#${id}-good)`} />
      </g>
      <path d="M269 140 l8 8 15 -16" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <text x="60" y="196" className="illus-caption-dim">two without the third</text>
      <text x="60" y="216" className="illus-caption-dim">always has a name —</text>
      <text x="60" y="236" className="illus-caption-dim">and an evidence debt</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 5 — five sprints inside a PI, discovery running ahead.
 * ============================================================ */
export function IllusCadence({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="Discovery for the next Program Increment runs in parallel above delivery of the current one. Each ten-week increment contains five two-week sprints, and measurement from each feeds the next."
    >
      <text x="36" y="44" className="illus-kicker">DISCOVERY · PI N+1</text>
      <rect x="36" y="56" width="488" height="40" rx="20" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.32" strokeDasharray="10 8" />
      <text x="280" y="82" textAnchor="middle" className="illus-caption-strong">an increment ahead — refined before it is committed</text>

      <path d="M280 100 v24" stroke="var(--stage)" strokeOpacity="0.5" strokeWidth="2.5" strokeDasharray="4 5" />
      <path d="M272 118 l8 12 8 -12 z" fill="var(--stage)" fillOpacity="0.6" />

      <text x="36" y="152" className="illus-kicker">DELIVERY · PI N — 10 WEEKS</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} filter={`url(#${id}-lift)`}>
          <rect x={36 + i * 100} y="164" width="88" height="48" rx="14" fill={`url(#${id}-a)`} />
          <text x={80 + i * 100} y="194" textAnchor="middle" className="illus-on-accent">Sprint {i + 1}</text>
        </g>
      ))}
      <text x="280" y="240" textAnchor="middle" className="illus-caption-dim">
        every sprint releases usable value · measurement feeds the next increment
      </text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 6 — the loop that does not terminate.
 * ============================================================ */
export function IllusLifecycleLoop({ className }: Props) {
  const id = useId().replace(/:/g, "");
  const steps = ["Discover", "Define", "Deliver", "Measure", "Iterate"];
  const cx = 280;
  const cy = 140;
  const r = 88;
  return (
    <Frame
      id={id}
      viewBox="0 0 560 280"
      className={className}
      label="A five-step continuous loop — discover, define, deliver, measure, iterate — which returns to discover rather than ending."
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--stage)" strokeOpacity="0.22" strokeWidth="14" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#${id}-a)`} strokeWidth="4" strokeLinecap="round" strokeDasharray="86 24" />
      {steps.map((label, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const lx = cx + Math.cos(angle) * (r + 42);
        const ly = cy + Math.sin(angle) * (r + 42);
        return (
          <g key={label}>
            <g filter={`url(#${id}-lift)`}>
              <circle cx={x} cy={y} r="22" fill={`url(#${id}-a)`} />
            </g>
            <text x={x} y={y + 6} textAnchor="middle" className="illus-on-accent">{i + 1}</text>
            <text x={lx} y={ly + 5} textAnchor="middle" className="illus-caption-strong">{label}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" className="illus-label">CONTINUOUS</text>
      <text x={cx} y={cy + 18} textAnchor="middle" className="illus-caption-dim">not a sequence</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 7 — three layers, three questions, a trio at each.
 * ============================================================ */
export function IllusLayers({ className }: Props) {
  const id = useId().replace(/:/g, "");
  const layers = [
    { name: "STRATEGIC", q: "What future are we creating?", owns: "why" },
    { name: "COORDINATION", q: "What should we deliver next?", owns: "what · when" },
    { name: "DELIVERY", q: "How do we deliver this well?", owns: "how · how much" },
  ];
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="Three stacked layers — strategic, coordination and delivery — each owning a different question, with a product, design and technology trio present at every level."
    >
      {layers.map((layer, i) => {
        const y = 34 + i * 70;
        const filled = i === 0;
        return (
          <g key={layer.name}>
            <g filter={`url(#${id}-lift)`}>
              <rect
                x={36 + i * 14}
                y={y}
                width={488 - i * 28}
                height="58"
                rx="16"
                fill={filled ? `url(#${id}-a)` : "var(--paper-strong)"}
                stroke={filled ? "none" : "var(--line-strong)"}
              />
            </g>
            <text x={60 + i * 14} y={y + 26} className={filled ? "illus-on-accent-label" : "illus-label"}>{layer.name}</text>
            <text x={60 + i * 14} y={y + 46} className={filled ? "illus-on-accent-sub" : "illus-caption-dim"}>{layer.q}</text>
            <text x={492 - i * 14} y={y + 26} textAnchor="end" className={filled ? "illus-on-accent-sub" : "illus-caption-dim"}>{layer.owns}</text>
            {[0, 1, 2].map((d) => (
              <circle
                key={d}
                cx={438 - i * 14 + d * 18}
                cy={y + 42}
                r="6"
                fill={filled ? "#fff" : `url(#${id}-a)`}
                fillOpacity={filled ? 0.85 : 0.75}
              />
            ))}
          </g>
        );
      })}
      <text x="280" y="246" textAnchor="middle" className="illus-caption-dim">
        product · design · technology sit at every layer — escalate constraints, not routine decisions
      </text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 8 — four phases, gates between, risk concentrated at closure.
 * ============================================================ */
export function IllusPhaseGates({ className }: Props) {
  const id = useId().replace(/:/g, "");
  const phases = [
    { name: "Pre-Approval", sub: "make the case" },
    { name: "Pre-Delivery", sub: "plan the runway" },
    { name: "Delivery", sub: "build and release" },
    { name: "Closure", sub: "hand over ownership" },
  ];
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="The four DES delivery phases — Pre-Approval, Pre-Delivery, Delivery and Closure — separated by stage gates, with product risk concentrated at Closure where the project ends but the product does not."
    >
      {phases.map((phase, i) => {
        const x = 30 + i * 132;
        const last = i === phases.length - 1;
        return (
          <g key={phase.name}>
            <g filter={`url(#${id}-lift)`}>
              <rect x={x} y="76" width="112" height="76" rx="16" fill={last ? `url(#${id}-warm)` : `url(#${id}-a)`} />
            </g>
            <text x={x + 56} y="110" textAnchor="middle" className="illus-on-accent">{phase.name}</text>
            <text x={x + 56} y="132" textAnchor="middle" className="illus-on-accent-sub">{phase.sub}</text>
            {i < phases.length - 1 && (
              <g>
                <line x1={x + 122} y1="62" x2={x + 122} y2="166" className="illus-divider" strokeDasharray="5 6" />
                <circle cx={x + 122} cy="52" r="10" className="illus-card" />
                <text x={x + 122} y="56" textAnchor="middle" className="illus-gate-mark">▾</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="280" y="42" textAnchor="middle" className="illus-kicker">STAGE GATES</text>
      <rect x="128" y="188" width="304" height="44" rx="14" className="illus-warn-panel" />
      <text x="280" y="206" textAnchor="middle" className="illus-caption-strong">Closure is where product risk peaks</text>
      <text x="280" y="224" textAnchor="middle" className="illus-caption-dim">hand over an owner, measures and a cadence — or quality decays unowned</text>
    </Frame>
  );
}

/* ============================================================ *
 * Stage 9 — the chain, closing back on itself.
 * ============================================================ */
export function IllusEvidenceChain({ className }: Props) {
  const id = useId().replace(/:/g, "");
  const links = ["Need", "Problem", "Outcome", "Options", "Evidence", "Delivery", "Measure", "Learn"];
  return (
    <Frame
      id={id}
      viewBox="0 0 560 260"
      className={className}
      label="The chain of product reasoning: need, problem, outcome, options, evidence, delivery, measurement and learning — with learning feeding back into need, so the chain is a loop rather than a line."
    >
      {links.map((link, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 44 + col * 122;
        const y = 62 + row * 84;
        const last = i === links.length - 1;
        return (
          <g key={link}>
            <g filter={`url(#${id}-lift)`}>
              <rect x={x} y={y} width="98" height="46" rx="14" fill={last ? `url(#${id}-good)` : `url(#${id}-a)`} />
            </g>
            <text x={x + 49} y={y + 29} textAnchor="middle" className="illus-on-accent">{link}</text>
            {col < 3 && (
              <>
                <path d={`M${x + 102} ${y + 23} h12`} stroke="var(--stage)" strokeWidth="3" strokeLinecap="round" />
                <path d={`M${x + 112} ${y + 16} l10 7 -10 7 z`} fill={`url(#${id}-a)`} />
              </>
            )}
          </g>
        );
      })}
      {/* row 1 wraps down to row 2 */}
      <path d="M520 108 C 542 108, 542 146, 520 146" fill="none" stroke="var(--stage)" strokeWidth="3" strokeLinecap="round" />
      <path d="M528 139 l-10 7 0 -14 z" fill={`url(#${id}-a)`} />
      {/* learning returns to need */}
      <path d="M44 192 C 18 192, 18 84, 44 84" fill="none" stroke="var(--stage-3)" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
      <path d="M37 92 l8 -10 8 10 z" fill="var(--stage-3)" />
      <text x="280" y="36" textAnchor="middle" className="illus-caption-strong">
        every item traces back to a problem and forward to a measure
      </text>
      <text x="280" y="238" textAnchor="middle" className="illus-caption-dim">learning returns to need — a loop, not a line</text>
    </Frame>
  );
}

/* ============================================================ *
 * Empty states
 * ============================================================ */
export function IllusEmptyQueue({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame id={id} viewBox="0 0 360 200" className={className} label="An empty review queue, with the next scheduled cards waiting on a calendar.">
      <g filter={`url(#${id}-lift)`}>
        <rect x="96" y="34" width="168" height="120" rx="18" className="illus-card" />
      </g>
      <rect x="96" y="34" width="168" height="32" rx="18" fill={`url(#${id}-a)`} />
      <rect x="96" y="52" width="168" height="14" fill={`url(#${id}-a)`} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={114 + c * 36} y={80 + r * 24} width="24" height="14" rx="6" fill={`url(#${id}-soft)`} />
        )),
      )}
      <g filter={`url(#${id}-lift)`}>
        <circle cx="256" cy="146" r="28" fill={`url(#${id}-good)`} />
      </g>
      <path d="M243 146 l9 9 17 -18" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function IllusEmptyResults({ className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <Frame id={id} viewBox="0 0 360 200" className={className} label="An empty chart waiting for the first recorded attempt to start the trend.">
      <line x1="48" y1="158" x2="322" y2="158" className="illus-axis" />
      <line x1="48" y1="34" x2="48" y2="158" className="illus-axis" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={72 + i * 50} y={132 - i * 8} width="32" height={26 + i * 8} rx="8" fill={`url(#${id}-soft)`} />
      ))}
      <path d="M88 124 C 150 112, 210 84, 306 52" fill="none" stroke={`url(#${id}-a)`} strokeWidth="4" strokeDasharray="9 8" strokeLinecap="round" opacity="0.75" />
      <circle cx="306" cy="52" r="8" fill={`url(#${id}-a)`} opacity="0.8" />
      <text x="185" y="188" textAnchor="middle" className="illus-caption-dim">your first attempt starts the trend</text>
    </Frame>
  );
}


/* ------------------------------------------------------------------ *
 * Closure Reports
 *
 * The second package shipped with none of these, so eleven stages of dense
 * prose opened with nothing but a heading. Same visual system as above: one
 * idea per diagram, colour inherited from the stage accent, ids namespaced.
 * ------------------------------------------------------------------ */

/** Stage 1 — the report is the bridge between a project and everything after. */
function IllusClosurePurpose({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="A project ends and its obligations continue, carried across by the closure report">
      <rect x="18" y="72" width="104" height="62" rx="10" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.45" />
      <text x="70" y="98" textAnchor="middle" className="illus-caption-strong">Project</text>
      <text x="70" y="116" textAnchor="middle" className="illus-caption-dim">ends here</text>
      <rect x="146" y="58" width="78" height="90" rx="10" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="185" y="96" textAnchor="middle" className="illus-on-accent">Closure</text>
      <text x="185" y="114" textAnchor="middle" className="illus-on-accent-sub">report</text>
      <rect x="248" y="52" width="104" height="30" rx="8" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.4" />
      <text x="300" y="72" textAnchor="middle" className="illus-caption">Benefits</text>
      <rect x="248" y="88" width="104" height="30" rx="8" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.4" />
      <text x="300" y="108" textAnchor="middle" className="illus-caption">Risks</text>
      <rect x="248" y="124" width="104" height="30" rx="8" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.4" />
      <text x="300" y="144" textAnchor="middle" className="illus-caption">Costs</text>
      <path d="M122 103h20" stroke="var(--stage)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M224 103h20" stroke="var(--stage)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="185" y="176" textAnchor="middle" className="illus-caption-dim">what outlives the project has to be carried</text>
    </Frame>
  );
}

/** Stage 2 — measured, estimated, asserted. */
function IllusClaimStrength({ className }: Props) {
  const id = useId();
  const rows = [
    { y: 52, w: 300, label: "Measured", sub: "data before and after" },
    { y: 96, w: 210, label: "Estimated", sub: "a model, assumptions stated" },
    { y: 140, w: 120, label: "Asserted", sub: "judgement, no measurement" },
  ];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Three strengths of claim: measured, estimated and asserted">
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x="20" y={r.y} width={r.w} height="30" rx="7" fill={i === 0 ? `url(#${id}-a)` : `url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity={i === 0 ? 0 : 0.45} />
          <text x="32" y={r.y + 20} className={i === 0 ? "illus-on-accent" : "illus-caption-strong"}>{r.label}</text>
          <text x={r.w + 30} y={r.y + 20} className="illus-caption-dim">{r.sub}</text>
        </g>
      ))}
      <text x="20" y="186" className="illus-caption-dim">mark which one every sentence is</text>
    </Frame>
  );
}

/** Stage 3 — the money is spent by the project, the return arrives later. */
function IllusBenefitLag({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Cost falls during delivery; benefits accrue afterwards, in the business">
      <path d="M28 150h316" className="illus-axis" />
      <rect x="40" y="66" width="112" height="84" rx="8" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="96" y="104" textAnchor="middle" className="illus-on-accent">Cost</text>
      <text x="96" y="122" textAnchor="middle" className="illus-on-accent-sub">during delivery</text>
      <path d="M170 150c40 0 44-52 84-62s60-8 60-8" stroke="var(--stage)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 7" />
      <rect x="228" y="58" width="112" height="46" rx="8" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.5" />
      <text x="284" y="78" textAnchor="middle" className="illus-caption-strong">Benefit</text>
      <text x="284" y="94" textAnchor="middle" className="illus-caption-dim">6-12 months on</text>
      <path d="M160 150v-14" className="illus-divider" />
      <text x="160" y="176" textAnchor="middle" className="illus-caption-dim">project ends</text>
      <text x="284" y="176" textAnchor="middle" className="illus-caption-dim">someone else owns it</text>
    </Frame>
  );
}

/** Stage 4 — a sentiment against a usable lesson. */
function IllusLessonShape({ className }: Props) {
  const id = useId();
  const parts = ["Context", "What happened", "Cost", "Action"];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="A sentiment has no parts; a usable lesson has four">
      <rect x="20" y="44" width="150" height="44" rx="8" className="illus-warn-panel" />
      <text x="95" y="63" textAnchor="middle" className="illus-caption-strong">&quot;Engage earlier&quot;</text>
      <text x="95" y="79" textAnchor="middle" className="illus-caption-dim">no parts at all</text>
      <text x="95" y="112" textAnchor="middle" className="illus-caption-dim">nobody acts differently</text>
      {parts.map((p, i) => (
        <g key={p}>
          <rect x="206" y={40 + i * 33} width="144" height="26" rx="6" fill={`url(#${id}-a)`} opacity={1 - i * 0.13} />
          <text x="278" y={57 + i * 33} textAnchor="middle" className="illus-on-accent">{p}</text>
        </g>
      ))}
      <text x="278" y="188" textAnchor="middle" className="illus-caption-dim">all four, or it is a category label</text>
    </Frame>
  );
}

/** Stage 5 — handover succeeds only if the receiving team can work alone. */
function IllusHandoverTest({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="The handover test: can the receiving team work without the people who left">
      <circle cx="88" cy="94" r="34" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.4" strokeDasharray="4 5" />
      <text x="88" y="92" textAnchor="middle" className="illus-caption-dim">delivery</text>
      <text x="88" y="108" textAnchor="middle" className="illus-caption-dim">team gone</text>
      <circle cx="266" cy="94" r="42" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="266" y="90" textAnchor="middle" className="illus-on-accent">Receiving</text>
      <text x="266" y="108" textAnchor="middle" className="illus-on-accent-sub">team</text>
      <path d="M128 94h96" stroke="var(--stage)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 6" />
      <path d="M160 78l32 32M192 78l-32 32" stroke="var(--stage)" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <text x="185" y="164" textAnchor="middle" className="illus-caption">run · change · diagnose</text>
      <text x="185" y="184" textAnchor="middle" className="illus-caption-dim">without calling anyone who has left</text>
    </Frame>
  );
}

/** Stage 6 — what is an asset and what is not. */
function IllusCapitalise({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Some spend produces an asset; the rest is expensed">
      <rect x="24" y="48" width="150" height="120" rx="10" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="99" y="76" textAnchor="middle" className="illus-on-accent">Capitalise</text>
      <text x="99" y="102" textAnchor="middle" className="illus-on-accent-sub">the delivered build</text>
      <text x="99" y="122" textAnchor="middle" className="illus-on-accent-sub">an asset you control</text>
      <rect x="196" y="48" width="150" height="120" rx="10" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.45" strokeDasharray="5 5" />
      <text x="271" y="76" textAnchor="middle" className="illus-caption-strong">Expense</text>
      <text x="271" y="100" textAnchor="middle" className="illus-caption-dim">abandoned options</text>
      <text x="271" y="118" textAnchor="middle" className="illus-caption-dim">training and change</text>
      <text x="271" y="136" textAnchor="middle" className="illus-caption-dim">post-release fixes</text>
      <text x="185" y="192" textAnchor="middle" className="illus-caption-dim">an asset is what you have, not the thinking that led to it</text>
    </Frame>
  );
}

/** Stage 7 — the shutdown sequence, reversible step before the irreversible one. */
function IllusShutdown({ className }: Props) {
  const id = useId();
  const steps = ["Sentence", "Export", "Verify", "Revoke", "Delete"];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Decommissioning in order, with a reversible checkpoint before deletion">
      <path d="M30 100h310" className="illus-track" />
      {steps.map((s, i) => {
        const x = 42 + i * 72;
        const last = i === steps.length - 1;
        return (
          <g key={s}>
            <circle cx={x} cy="100" r={last ? 20 : 18} fill={last ? "var(--stage)" : `url(#${id}-a)`} opacity={last ? 1 : 0.9} filter={`url(#${id}-shadow)`} />
            <text x={x} y="105" textAnchor="middle" className="illus-on-accent">{i + 1}</text>
            <text x={x} y="140" textAnchor="middle" className="illus-caption">{s}</text>
          </g>
        );
      })}
      <rect x="234" y="52" width="84" height="24" rx="6" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.5" />
      <text x="276" y="68" textAnchor="middle" className="illus-caption-dim">still reversible</text>
      <path d="M258 76v10" className="illus-divider" />
      <text x="330" y="176" textAnchor="end" className="illus-caption-dim">only step 5 cannot be undone</text>
    </Frame>
  );
}

/** Stage 8 — objective, outcome and key result are three different questions. */
function IllusThreeLevels({ className }: Props) {
  const id = useId();
  const rows = [
    { label: "Objective", q: "what did we set out to do?", v: "achieved" },
    { label: "Outcome", q: "what changed for users?", v: "18% of a 40% target" },
    { label: "Key result", q: "how do we know?", v: "0.83 against 0.60" },
  ];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Objective, business outcome and key result answer three different questions">
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x="20" y={46 + i * 46} width="330" height="36" rx="8" fill={i === 0 ? `url(#${id}-a)` : `url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity={i === 0 ? 0 : 0.4} />
          <text x="34" y={69 + i * 46} className={i === 0 ? "illus-on-accent" : "illus-caption-strong"}>{r.label}</text>
          <text x="126" y={69 + i * 46} className="illus-caption-dim">{r.q}</text>
          <text x="336" y={69 + i * 46} textAnchor="end" className={i === 0 ? "illus-on-accent-sub" : "illus-caption"}>{r.v}</text>
        </g>
      ))}
      <text x="185" y="196" textAnchor="middle" className="illus-caption-dim">merge them and the interesting result disappears</text>
    </Frame>
  );
}

/** Stage 9 — every open item has exactly three destinations. */
function IllusThreeDestinations({ className }: Props) {
  const id = useId();
  const outs = [
    { x: 232, y: 44, label: "Closed" },
    { x: 232, y: 88, label: "Accepted" },
    { x: 232, y: 132, label: "Follow-on action" },
  ];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="At closure every open item is closed, formally accepted, or carried to a named owner">
      <rect x="22" y="76" width="104" height="52" rx="10" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="74" y="99" textAnchor="middle" className="illus-on-accent">Open item</text>
      <text x="74" y="116" textAnchor="middle" className="illus-on-accent-sub">at closure</text>
      {outs.map((o) => (
        <g key={o.label}>
          <path d={`M126 102C168 102 176 ${o.y + 15} ${o.x - 8} ${o.y + 15}`} stroke="var(--stage)" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
          <rect x={o.x} y={o.y} width="124" height="30" rx="7" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.45" />
          <text x={o.x + 62} y={o.y + 20} textAnchor="middle" className="illus-caption-strong">{o.label}</text>
        </g>
      ))}
      <text x="185" y="186" textAnchor="middle" className="illus-caption-dim">&quot;ongoing&quot; is not one of them</text>
    </Frame>
  );
}

/** Stage 10 — the first page is the report. */
function IllusOnePage({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Assume one page is read: promised, delivered, and the gap">
      <rect x="34" y="34" width="128" height="150" rx="9" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="98" y="62" textAnchor="middle" className="illus-on-accent">Page 1</text>
      <rect x="50" y="76" width="96" height="8" rx="4" className="illus-on-accent-lg" opacity="0.85" />
      <rect x="50" y="92" width="96" height="8" rx="4" className="illus-on-accent-lg" opacity="0.7" />
      <rect x="50" y="108" width="72" height="8" rx="4" className="illus-on-accent-lg" opacity="0.55" />
      <text x="98" y="146" textAnchor="middle" className="illus-on-accent-sub">promised</text>
      <text x="98" y="164" textAnchor="middle" className="illus-on-accent-sub">delivered · gap</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={196 + i * 18} y={54 + i * 6} width="120" height="112" rx="8" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.28" />
      ))}
      <text x="292" y="120" textAnchor="middle" className="illus-caption-dim">checked, not read</text>
      <text x="185" y="196" textAnchor="middle" className="illus-caption-dim">detail is for the reader with a specific question</text>
    </Frame>
  );
}

/** Stage 11 — the evidence chain, and where it breaks. */
function IllusEvidenceLinks({ className }: Props) {
  const id = useId();
  const links = ["Claim", "Method", "Data", "Definition"];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="The evidence chain: claim, method, data, definition — and where it usually breaks">
      {links.map((l, i) => {
        const x = 24 + i * 86;
        const broken = i === 2;
        return (
          <g key={l}>
            <rect x={x} y="72" width="72" height="52" rx="9"
              fill={broken ? "transparent" : `url(#${id}-a)`}
              stroke={broken ? "var(--stage)" : "none"} strokeOpacity="0.5" strokeDasharray={broken ? "5 5" : undefined}
              filter={broken ? undefined : `url(#${id}-shadow)`} />
            <text x={x + 36} y="103" textAnchor="middle" className={broken ? "illus-caption-strong" : "illus-on-accent"}>{l}</text>
            {i < links.length - 1 && (
              <path d={`M${x + 72} 98h14`} stroke="var(--stage)" strokeWidth="2.5" strokeLinecap="round" opacity={i === 1 ? 0.35 : 0.8} />
            )}
          </g>
        );
      })}
      <text x="232" y="150" textAnchor="middle" className="illus-caption-dim">system decommissioned,</text>
      <text x="232" y="166" textAnchor="middle" className="illus-caption-dim">no extract retained</text>
      <text x="185" y="46" textAnchor="middle" className="illus-caption">an auditor follows it until it runs out</text>
    </Frame>
  );
}

/** Closure — six activities, then a document that evidences them. */
function IllusClosureProcess({ className }: Props) {
  const id = useId();
  const acts = ["deliverables\naccepted", "risks and\nbenefits owned", "PIR\narranged", "closure\napproved", "lessons\nregistered"];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Five closure activities feed a report; the report is the evidence, not the work">
      {acts.map((label, i) => (
        <g key={label}>
          <rect x="20" y={22 + i * 32} width="132" height="26" rx="6" fill={`url(#${id}-soft)`} stroke="var(--stage)" strokeOpacity="0.3" />
          <text x="86" y={39 + i * 32} textAnchor="middle" className="illus-caption">{label.replace("\n", " ")}</text>
          <path d={`M 156 ${35 + i * 32} L 214 ${100}`} stroke="var(--stage)" strokeOpacity="0.34" strokeWidth="1.5" fill="none" />
        </g>
      ))}
      <rect x="218" y="62" width="126" height="80" rx="9" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="281" y="96" textAnchor="middle" className="illus-on-accent">the report</text>
      <text x="281" y="116" textAnchor="middle" className="illus-on-accent-sub">evidences them</text>
      <text x="185" y="196" textAnchor="middle" className="illus-caption-dim">written last, because it records what happened</text>
    </Frame>
  );
}

/** Closure — who approves, who endorses, who merely receives. */
function IllusApprovalChain({ className }: Props) {
  const id = useId();
  const tiers: [string, string, boolean][] = [
    ["Senior Responsible Officer", "approves and assures", true],
    ["Project Board · Senior User", "endorses · accepts handover", false],
    ["Group PMO · Portfolio Project Office", "receives — does not review", false],
  ];
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="The SRO approves, the Board endorses, the PMO and PPO only receive">
      {tiers.map(([role, does, solid], i) => (
        <g key={role}>
          <rect
            x={40 + i * 14} y={26 + i * 56} width={290 - i * 28} height="44" rx="8"
            fill={solid ? `url(#${id}-a)` : `url(#${id}-soft)`}
            stroke={solid ? "none" : "var(--stage)"} strokeOpacity="0.3"
            strokeDasharray={i === 2 ? "5 4" : undefined}
            filter={solid ? `url(#${id}-shadow)` : undefined}
          />
          <text x="185" y={46 + i * 56} textAnchor="middle" className={solid ? "illus-on-accent" : "illus-caption"}>{role}</text>
          <text x="185" y={62 + i * 56} textAnchor="middle" className={solid ? "illus-on-accent-sub" : "illus-caption-dim"}>{does}</text>
        </g>
      ))}
      <text x="185" y="200" textAnchor="middle" className="illus-caption-dim">nothing downstream will catch an error</text>
    </Frame>
  );
}

/** Closure — the paperwork and the thing you built are different questions. */
function IllusTwoDeliverables({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Management artefacts and project-specific deliverables are separate questions">
      <rect x="26" y="30" width="148" height="132" rx="9" fill={`url(#${id}-panel)`} stroke="var(--stage)" strokeOpacity="0.24" />
      <text x="100" y="52" textAnchor="middle" className="illus-caption">governance wanted</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="44" y={66 + i * 22} width="14" height="16" rx="2" fill="var(--stage)" opacity={0.5 - i * 0.07} />
          <rect x="66" y={71 + i * 22} width="88" height="6" rx="3" fill="var(--stage)" opacity={0.32 - i * 0.05} />
        </g>
      ))}
      <text x="100" y="176" textAnchor="middle" className="illus-caption-dim">plans, registers, profiles</text>

      <rect x="196" y="30" width="148" height="132" rx="9" fill={`url(#${id}-a)`} filter={`url(#${id}-shadow)`} />
      <text x="270" y="52" textAnchor="middle" className="illus-on-accent">the business got</text>
      <circle cx="234" cy="98" r="17" className="illus-on-accent-lg" opacity="0.85" />
      <rect x="260" y="82" width="56" height="32" rx="5" className="illus-on-accent-lg" opacity="0.6" />
      <text x="270" y="140" textAnchor="middle" className="illus-on-accent-sub">a service, a system, a guide</text>
      <text x="185" y="196" textAnchor="middle" className="illus-caption-dim">answering both with one list answers neither</text>
    </Frame>
  );
}

/** Closure — variance against the original baseline is the content. */
function IllusBaselineVariance({ className }: Props) {
  const id = useId();
  return (
    <Frame id={id} className={className} viewBox="0 0 370 210" label="Variance measured against the original baseline, not the latest rebaseline">
      <line x1="30" y1="66" x2="340" y2="66" stroke="var(--stage)" strokeOpacity="0.55" strokeWidth="2" />
      <text x="30" y="54" className="illus-caption">original baseline</text>
      <circle cx="150" cy="66" r="5" fill="var(--stage)" />
      <text x="150" y="42" textAnchor="middle" className="illus-caption-dim">planned</text>

      <line x1="30" y1="126" x2="340" y2="126" stroke="var(--stage)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4" />
      <text x="30" y="114" className="illus-caption-dim">rebaselined</text>
      <circle cx="266" cy="126" r="6" fill="var(--stage)" />
      <text x="266" y="150" textAnchor="middle" className="illus-caption">actual</text>

      <path d="M 150 72 L 266 120" stroke="var(--stage)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <rect x="176" y="80" width="64" height="22" rx="5" fill={`url(#${id}-a)`} />
      <text x="208" y="95" textAnchor="middle" className="illus-on-accent-sub">variance</text>
      <text x="185" y="182" textAnchor="middle" className="illus-caption-dim">report both, or the movement disappears</text>
    </Frame>
  );
}

/** Stage id → illustration. */
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

  // Closure Reports
  purpose: IllusClosurePurpose,
  process: IllusClosureProcess,
  accountability: IllusApprovalChain,
  deliverables: IllusTwoDeliverables,
  milestones: IllusBaselineVariance,
  evidence: IllusClaimStrength,
  benefits: IllusBenefitLag,
  lessons: IllusLessonShape,
  handover: IllusHandoverTest,
  financial: IllusCapitalise,
  records: IllusShutdown,
  sections: IllusThreeLevels,
  openitems: IllusThreeDestinations,
  writing: IllusOnePage,
  assurance: IllusEvidenceLinks,
};

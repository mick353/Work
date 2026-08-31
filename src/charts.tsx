/**
 * Chart primitives.
 *
 * Hand-rolled inline SVG rather than a charting library, for three reasons:
 * the whole app ships as one HTML file so every kilobyte of dependency shows;
 * the charts need to pick up the per-stage accent variables; and charting
 * libraries are almost universally inaccessible by default.
 *
 * Every chart here is `role="img"` with a summary label, and every chart is
 * followed by a visually-hidden table carrying the same numbers, so a screen
 * reader gets the data rather than "graphic".
 */

import type { ReactNode } from "react";

export type Series = {
  label: string;
  value: number;
  /** CSS colour, usually a var(--accent-N). */
  colour: string;
  /** Optional right-hand annotation, e.g. "12 of 16". */
  detail?: string;
};

function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <table className="visually-hidden">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {head.map((cell) => (
            <th scope="col" key={cell}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            <th scope="row">{row[0]}</th>
            {row.slice(1).map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ChartCard({
  title,
  hint,
  children,
  empty,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  empty?: string;
}) {
  return (
    <section className="chart-card">
      <header>
        <h2>{title}</h2>
        {hint && <p>{hint}</p>}
      </header>
      {empty ? <p className="chart-empty">{empty}</p> : children}
    </section>
  );
}

/** Radial progress ring — used for overall mastery. */
export function Radial({
  value,
  label,
  caption,
  colour = "var(--brand-bright)",
}: {
  value: number;
  label: string;
  caption: string;
  colour?: string;
}) {
  const size = 168;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;

  return (
    <div className="radial">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${label}: ${Math.round(clamped)} per cent. ${caption}`}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="47%" textAnchor="middle" className="radial-value">
          {Math.round(clamped)}%
        </text>
        <text x="50%" y="63%" textAnchor="middle" className="radial-label">
          {label}
        </text>
      </svg>
      <p>{caption}</p>
    </div>
  );
}

/** Horizontal bars, one per stage, each in its own accent colour. */
export function BarList({
  series,
  max = 100,
  suffix = "%",
  ariaLabel,
}: {
  series: Series[];
  max?: number;
  suffix?: string;
  ariaLabel: string;
}) {
  return (
    <>
      <div role="img" aria-label={ariaLabel}>
      <ul className="bar-list" aria-hidden="true">
        {series.map((item) => (
          <li key={item.label}>
            <span className="bar-label">{item.label}</span>
            <span className="bar-track">
              <span
                className="bar-fill"
                style={{ width: `${max ? (item.value / max) * 100 : 0}%`, background: item.colour }}
              />
            </span>
            <span className="bar-value">
              {item.detail ?? `${Math.round(item.value)}${suffix}`}
            </span>
          </li>
        ))}
      </ul>
      </div>
      <DataTable
        caption={ariaLabel}
        head={["Item", "Value"]}
        rows={series.map((item) => [item.label, item.detail ?? `${Math.round(item.value)}${suffix}`])}
      />
    </>
  );
}

/** Area + line trend for scores over time. */
export function TrendChart({
  points,
  ariaLabel,
  colour = "var(--accent-5)",
}: {
  points: { at: number; score: number; label: string }[];
  ariaLabel: string;
  colour?: string;
}) {
  const width = 640;
  const height = 220;
  const padX = 34;
  const padY = 18;
  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const xs = points.map((_, index) => (points.length === 1 ? padX + plotW / 2 : padX + (index / (points.length - 1)) * plotW));
  const ys = points.map((point) => padY + plotH - (point.score / 100) * plotH);
  const line = xs.map((x, index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${ys[index].toFixed(1)}`).join(" ");
  const area = `${line} L${xs[xs.length - 1].toFixed(1)},${(padY + plotH).toFixed(1)} L${xs[0].toFixed(1)},${(padY + plotH).toFixed(1)} Z`;
  const gradientId = "trend-gradient";

  return (
    <>
      <svg className="trend" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colour} stopOpacity="0.34" />
            <stop offset="100%" stopColor={colour} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = padY + plotH - (tick / 100) * plotH;
          return (
            <g key={tick}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="var(--line)" strokeWidth="1" />
              <text x={padX - 8} y={y + 4} textAnchor="end" className="axis-text">
                {tick}
              </text>
            </g>
          );
        })}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke={colour} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {xs.map((x, index) => (
          <circle key={index} cx={x} cy={ys[index]} r="4" fill="var(--paper)" stroke={colour} strokeWidth="2.5" />
        ))}
      </svg>
      <DataTable
        caption={ariaLabel}
        head={["Attempt", "Score"]}
        rows={points.map((point) => [point.label, `${point.score}%`])}
      />
    </>
  );
}

/** Vertical columns — used for the review forecast. */
export function ColumnChart({
  columns,
  ariaLabel,
  colour = "var(--accent-2)",
  highlightFirst = false,
}: {
  columns: { label: string; value: number; title: string }[];
  ariaLabel: string;
  colour?: string;
  highlightFirst?: boolean;
}) {
  const max = Math.max(1, ...columns.map((column) => column.value));
  return (
    <>
      <div role="img" aria-label={ariaLabel}>
      <ul className="column-chart" aria-hidden="true">
        {columns.map((column, index) => (
          <li key={column.label + index} title={column.title}>
            <span className="column-value">{column.value || ""}</span>
            <span
              className="column-bar"
              style={{
                height: `${Math.max(column.value ? 6 : 2, (column.value / max) * 100)}%`,
                background: highlightFirst && index === 0 ? "var(--warning)" : colour,
              }}
            />
            <span className="column-label">{column.label}</span>
          </li>
        ))}
      </ul>
      </div>
      <DataTable
        caption={ariaLabel}
        head={["Day", "Cards due"]}
        rows={columns.map((column) => [column.title, String(column.value)])}
      />
    </>
  );
}

/** Single stacked bar — used for the current flashcard queue state. */
export function StackedBar({ series, ariaLabel }: { series: Series[]; ariaLabel: string }) {
  const total = series.reduce((sum, item) => sum + item.value, 0) || 1;
  return (
    <>
      <div className="stacked" role="img" aria-label={ariaLabel}>
        {series.map((item) => (
          <span
            key={item.label}
            className="stacked-segment"
            style={{ width: `${(item.value / total) * 100}%`, background: item.colour }}
          />
        ))}
      </div>
      <ul className="stacked-legend">
        {series.map((item) => (
          <li key={item.label}>
            <span className="swatch" style={{ background: item.colour }} aria-hidden="true" />
            <strong>{item.value}</strong> {item.label}
          </li>
        ))}
      </ul>
      <DataTable
        caption={ariaLabel}
        head={["Stage", "Cards"]}
        rows={series.map((item) => [item.label, String(item.value)])}
      />
    </>
  );
}

/** Twelve-week study heatmap. */
export function Heatmap({
  weeks,
  ariaLabel,
}: {
  weeks: { key: string; label: string; active: boolean }[][];
  ariaLabel: string;
}) {
  const activeDays = weeks.flat().filter((day) => day.active).length;
  return (
    <>
      <div className="heatmap" role="img" aria-label={`${ariaLabel}. ${activeDays} day${activeDays === 1 ? "" : "s"} studied.`}>
        {weeks.map((week, index) => (
          <div className="heatmap-week" key={index}>
            {week.map((day) => (
              <span key={day.key} className={day.active ? "on" : ""} title={day.label} />
            ))}
          </div>
        ))}
      </div>
      <p className="heatmap-legend">
        <span className="swatch off" aria-hidden="true" /> no session
        <span className="swatch on" aria-hidden="true" /> studied
        <strong>{activeDays} day{activeDays === 1 ? "" : "s"} in the last 12 weeks</strong>
      </p>
    </>
  );
}

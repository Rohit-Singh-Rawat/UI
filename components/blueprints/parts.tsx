import { type ReactNode, useId } from "react";

/**
 * Shared vocabulary for system blueprints | every wireframe on /systems is
 * drawn with these parts so the whole grid reads as one engineering document.
 *
 * Visual hierarchy: the component outline leads (near-full ink); measurement
 * lines, padding guides, and selection handles sit quieter behind it. The
 * full drawing | annotations included | is the card's resting state; on
 * built systems the whole blueprint slowly dissolves into the real
 * component (see SystemCard).
 *
 * The svg renders at a fixed width equal to its viewBox width, so 1 SVG
 * unit = 1 CSS px | drawn dimensions are real dimensions, and a live
 * component overlaid on the same center lines up exactly.
 */

const MONO = "var(--font-mono)";

/**
 * Morph grammar shared by every blueprint (the Button set the standard):
 * on card hover the drawing becomes the implementation | surfaces gain
 * fills, hollow text fills in, and the construction layer fades away while
 * each component's micro-interaction plays.
 */
export const BP_MORPH =
  "transition-[fill,stroke,opacity] duration-(--motion-dur-showcase) ease-(--motion-ease-in-out)";

export const BP_HIDE_ON_MORPH =
  "transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-0 group-focus-visible:opacity-0";

export type BlueprintTheme = {
  wireframe: {
    strokeWidth: number;
    textStrokeWidth: number;
    strokeOpacity: number;
    textOpacity: number;
  };
  guide: {
    strokeWidth: number;
    dimOpacity: number;
    labelOpacity: number;
    structOpacity: number;
  };
  selection: {
    strokeWidth: number;
    handleStrokeWidth: number;
    opacity: number;
    handleOpacity: number;
  };
};

export const blueprintTheme: BlueprintTheme = {
  wireframe: {
    strokeWidth: 1.25,
    textStrokeWidth: 0.9,
    strokeOpacity: 0.85,
    textOpacity: 0.9,
  },
  guide: {
    strokeWidth: 0.75,
    dimOpacity: 0.3,
    labelOpacity: 0.5,
    structOpacity: 0.5,
  },
  selection: {
    strokeWidth: 0.75,
    handleStrokeWidth: 1,
    opacity: 0.5, // unified opacity across structural layers
    handleOpacity: 0.8,
  },
};

export function Blueprint({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      width={220}
      height={140}
      fill="none"
      className={`text-foreground/80 ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function DimLabel({
  x,
  y,
  anchor = "middle",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  children: string;
}) {
  const theme = blueprintTheme;
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={7}
      fontFamily={MONO}
      fill="currentColor"
      opacity={theme.guide.labelOpacity}
    >
      {children}
    </text>
  );
}

/** Horizontal dimension line with end ticks and a centered label above. */
export function DimH({
  x1,
  x2,
  y,
  label,
  labelYOffset = -3,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  labelYOffset?: number;
}) {
  const theme = blueprintTheme;
  return (
    <g>
      <g
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
      >
        <line x1={x1} y1={y - 3} x2={x1} y2={y + 3} />
        <line x1={x2} y1={y - 3} x2={x2} y2={y + 3} />
        <line x1={x1} y1={y} x2={x2} y2={y} />
      </g>
      <DimLabel x={(x1 + x2) / 2} y={y + labelYOffset}>
        {label}
      </DimLabel>
    </g>
  );
}

/** Vertical dimension line with end ticks and a label beside it. */
export function DimV({
  x,
  y1,
  y2,
  label,
  labelXOffset = -5,
  labelAnchor = "end",
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  labelXOffset?: number;
  labelAnchor?: "start" | "middle" | "end";
}) {
  const theme = blueprintTheme;
  return (
    <g>
      <g
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
      >
        <line x1={x - 3} y1={y1} x2={x + 3} y2={y1} />
        <line x1={x - 3} y1={y2} x2={x + 3} y2={y2} />
        <line x1={x} y1={y1} x2={x} y2={y2} />
      </g>
      <DimLabel
        x={x + labelXOffset}
        y={(y1 + y2) / 2 + 2.5}
        anchor={labelAnchor}
      >
        {label}
      </DimLabel>
    </g>
  );
}

export function PadGuide({
  x,
  y,
  w,
  h,
  offset = 0,
  boxX,
  boxY,
  boxW,
  boxH,
  boxRx = 0,
  clipOffset = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  offset?: number;
  boxX?: number;
  boxY?: number;
  boxW?: number;
  boxH?: number;
  boxRx?: number;
  clipOffset?: number;
}) {
  const clipId = useId();
  const theme = blueprintTheme;

  const stroke = "var(--accent)";
  const strokeDasharray = "2 2";

  const ix = x - offset;
  const iy = y - offset;
  const iw = w + offset * 2;
  const ih = h + offset * 2;

  if (
    boxX !== undefined &&
    boxY !== undefined &&
    boxW !== undefined &&
    boxH !== undefined
  ) {
    const cx = boxX + clipOffset;
    const cy = boxY + clipOffset;
    const cw = boxW - clipOffset * 2;
    const ch = boxH - clipOffset * 2;
    const crx = Math.max(0, boxRx - clipOffset);

    return (
      <g>
        <defs>
          <clipPath id={clipId}>
            <rect x={cx} y={cy} width={cw} height={ch} rx={crx} />
          </clipPath>
        </defs>
        <g
          clipPath={`url(#${clipId})`}
          stroke={stroke}
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray={strokeDasharray}
          opacity={theme.guide.structOpacity}
        >
          {/* horizontal padding lines */}
          <line x1={cx} y1={iy} x2={cx + cw} y2={iy} />
          <line x1={cx} y1={iy + ih} x2={cx + cw} y2={iy + ih} />
          {/* vertical padding lines */}
          <line x1={ix} y1={cy} x2={ix} y2={cy + ch} />
          <line x1={ix + iw} y1={cy} x2={ix + iw} y2={cy + ch} />
        </g>
      </g>
    );
  }

  return (
    <rect
      x={ix}
      y={iy}
      width={iw}
      height={ih}
      stroke={stroke}
      strokeWidth={theme.guide.strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={theme.guide.structOpacity}
    />
  );
}

/** Figma-style selection: thin accent outline with four corner handles. */
export function Selection({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const theme = blueprintTheme;

  const offset = 1;
  const sx = x - offset;
  const sy = y - offset;
  const sw = w + offset * 2;
  const sh = h + offset * 2;

  const s = 3;
  const corners: [number, number][] = [
    [sx, sy],
    [sx + sw, sy],
    [sx, sy + sh],
    [sx + sw, sy + sh],
  ];
  return (
    <g>
      <rect
        x={sx}
        y={sy}
        width={sw}
        height={sh}
        stroke="var(--accent)"
        strokeWidth={theme.selection.strokeWidth}
        opacity={theme.selection.opacity}
      />
      {corners.map(([cx, cy]) => (
        <rect
          key={`${cx}-${cy}`}
          x={cx - s / 2}
          y={cy - s / 2}
          width={s}
          height={s}
          fill="var(--background)"
          stroke="var(--accent)"
          strokeWidth={theme.selection.handleStrokeWidth}
          opacity={theme.selection.handleOpacity}
        />
      ))}
    </g>
  );
}

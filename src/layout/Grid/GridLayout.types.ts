import React from 'react';

/** Number of columns a grid item should span (1–12), or 'auto'. */
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

/**
 * Spacing multiplier — maps to DCDS gap tokens:
 *
 * | Value | Gap token   | px  |
 * |-------|-------------|-----|
 * | `0`   | —           | 0   |
 * | `1`   | `--gap-8`   | 8   |
 * | `2`   | `--gap-16`  | 16  |
 * | `3`   | `--gap-24`  | 24  |
 * | `4`   | `--gap-32`  | 32  |
 * | `5`   | `--gap-40`  | 40  |
 * | `6`   | `--gap-48`  | 48  |
 */
export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If `true`, the component acts as a CSS Grid container.
   * Use with `spacing` to set the gap between items.
   */
  container?: boolean;

  /**
   * If `true`, the component acts as a grid item.
   * Use `xs` / `sm` / `md` / `lg` to control the column span.
   */
  item?: boolean;

  /**
   * Gap between grid items, expressed as a spacing multiplier.
   * Only applies when `container` is `true`.
   * @default 0
   */
  spacing?: GridSpacing;

  /**
   * Total columns in the grid container.
   * @default 12
   */
  columns?: number;

  /**
   * Column span at the **xs** breakpoint (< 576 px).
   * Applied mobile-first — active at all sizes unless overridden by sm/md/lg.
   */
  xs?: GridSpan;

  /**
   * Column span at the **sm** breakpoint (≥ 576 px).
   */
  sm?: GridSpan;

  /**
   * Column span at the **md** breakpoint (≥ 992 px).
   */
  md?: GridSpan;

  /**
   * Column span at the **lg** breakpoint (≥ 1200 px).
   */
  lg?: GridSpan;

  /**
   * Flex / grid flow direction. Only applies to containers.
   * @default 'row'
   */
  direction?: 'row' | 'column';
}

import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * System style prop — accepts any valid CSS property.
   * Numeric values on spacing properties (padding, margin, gap, etc.)
   * are multiplied by 8 px to match the DCDS spacing scale
   * (spacing × 8 px, same convention as MUI).
   *
   * @example
   * <Box sx={{ padding: 2, display: 'flex', gap: 1 }} />
   * // → padding: 16px; display: flex; gap: 8px
   */
  sx?: React.CSSProperties & Record<string, unknown>;

  /**
   * The root element to render.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

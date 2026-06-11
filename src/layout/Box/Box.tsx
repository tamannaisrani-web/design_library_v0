import React from 'react';
import type { BoxProps } from './Box.types';
import './Box.css';

/**
 * `Box` is a generic layout wrapper.
 *
 * The `sx` prop accepts any CSS property; numeric values on spacing
 * properties are converted via the DCDS 8-px spacing scale:
 *
 * | Value | Result |
 * |-------|--------|
 * | `1`   | 8 px   |
 * | `2`   | 16 px  |
 * | `3`   | 24 px  |
 * | `4`   | 32 px  |
 *
 * @example
 * ```tsx
 * <Box sx={{ flexGrow: 1 }}>
 *   <Box sx={{ padding: 2, border: '1px solid red' }}>content</Box>
 * </Box>
 * ```
 */

/** Spacing properties that accept numeric shorthand. */
const SPACING_KEYS = new Set([
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingInline', 'paddingBlock', 'paddingInlineStart', 'paddingInlineEnd',
  'paddingBlockStart', 'paddingBlockEnd',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginInline', 'marginBlock', 'marginInlineStart', 'marginInlineEnd',
  'gap', 'rowGap', 'columnGap',
]);

function processSx(sx?: BoxProps['sx']): React.CSSProperties {
  if (!sx) return {};
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(sx)) {
    if (typeof value === 'number' && SPACING_KEYS.has(key)) {
      out[key] = `${value * 8}px`;
    } else {
      out[key] = value;
    }
  }
  return out as React.CSSProperties;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', sx, className, style, children, ...rest }, ref) => {
    const rootClass = ['dcds-Box', className].filter(Boolean).join(' ');
    const mergedStyle: React.CSSProperties = { ...processSx(sx), ...style };

    return React.createElement(
      Component,
      { ref, className: rootClass, style: mergedStyle, ...rest },
      children,
    );
  },
);

Box.displayName = 'Box';

import React from 'react';
import type { GridLayoutProps } from './GridLayout.types';
import './GridLayout.css';

/**
 * `GridLayout` is the CSS Grid layout foundation for DCDS.
 *
 * It mirrors the MUI Grid API — use `container` on the wrapper and
 * `item` + `xs/sm/md/lg` on each child to control responsive column spans.
 *
 * ---
 *
 * **Breakpoints:**
 * | Prop | Viewport     |
 * |------|-------------|
 * | `xs` | < 576 px    |
 * | `sm` | ≥ 576 px    |
 * | `md` | ≥ 992 px    |
 * | `lg` | ≥ 1200 px   |
 *
 * **Spacing scale:** `spacing={n}` → `n × 8 px` gap
 * (`spacing={2}` = `gap: 16px` = DCDS gutter token `--gap-16`)
 *
 * @example
 * ```tsx
 * import { Box, GridLayout as Grid } from '@dcds/components';
 *
 * <Box sx={{ flexGrow: 1 }}>
 *   <Grid container spacing={2}>
 *     <Grid item xs={8}>
 *       <Box sx={{ border: '1px solid', padding: 2 }}>xs=8</Box>
 *     </Grid>
 *     <Grid item xs={4}>
 *       <Box sx={{ border: '1px solid', padding: 2 }}>xs=4</Box>
 *     </Grid>
 *     <Grid item xs={4}>
 *       <Box sx={{ border: '1px solid', padding: 2 }}>xs=4</Box>
 *     </Grid>
 *     <Grid item xs={8}>
 *       <Box sx={{ border: '1px solid', padding: 2 }}>xs=8</Box>
 *     </Grid>
 *   </Grid>
 * </Box>
 * ```
 *
 * Responsive example — full-width on mobile, split on desktop:
 * ```tsx
 * <Grid container spacing={2}>
 *   <Grid item xs={12} md={8}><main /></Grid>
 *   <Grid item xs={12} md={4}><aside /></Grid>
 * </Grid>
 * ```
 */
export const GridLayout = React.forwardRef<HTMLDivElement, GridLayoutProps>(
  (
    {
      container  = false,
      item       = false,
      spacing    = 0,
      columns    = 12,
      xs,
      sm,
      md,
      lg,
      direction  = 'row',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes: string[] = ['dcds-GridLayout'];

    if (container) {
      classes.push('dcds-GridLayout--container');
      if (spacing > 0) classes.push(`dcds-GridLayout--spacing-${spacing}`);
      if (direction === 'column') classes.push('dcds-GridLayout--direction-column');
    }

    if (item) {
      classes.push('dcds-GridLayout--item');
      if (xs  !== undefined) classes.push(`dcds-GridLayout--xs-${xs}`);
      if (sm  !== undefined) classes.push(`dcds-GridLayout--sm-${sm}`);
      if (md  !== undefined) classes.push(`dcds-GridLayout--md-${md}`);
      if (lg  !== undefined) classes.push(`dcds-GridLayout--lg-${lg}`);
    }

    if (className) classes.push(className);

    /* Pass `columns` as a CSS custom property so nested grids can
       override the column count without changing the class. */
    const containerStyle: React.CSSProperties = container
      ? ({ '--dcds-grid-cols': columns, ...style } as React.CSSProperties)
      : (style ?? {});

    return (
      <div
        ref={ref}
        className={classes.join(' ')}
        style={containerStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

GridLayout.displayName = 'GridLayout';

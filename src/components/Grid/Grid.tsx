import React from 'react';
import type { GridProps, GridBreakpoint } from './Grid.types';
import './Grid.css';

/**
 * `Grid` visualises the DCDS responsive grid specification for a single
 * breakpoint — columns, gutters, margins, and navigation chrome — at its
 * canonical pixel width (or a custom `viewportWidth` for interactive demos).
 *
 * This is a **documentation / visualisation component**, not a layout wrapper.
 *
 * @example
 * ```tsx
 * <Grid breakpoint="Mobile" />
 * <Grid breakpoint="Desktop-L-Expanded" viewportWidth={900} />
 * ```
 */

interface GridConfig {
  viewport: number;
  columns: number;
  gutter: number;
  margin: number;
  navWidth: number;
  navHeight: number;
  contentArea: number;
  label: string;
}

const CONFIGS: Record<GridBreakpoint, GridConfig> = {
  'Mobile':              { viewport: 360,  columns:  4, gutter: 16, margin: 20, navWidth: 0,   navHeight: 56, contentArea: 360,  label: 'Mobile layout'  },
  'Tablet':              { viewport: 576,  columns: 12, gutter: 16, margin: 24, navWidth: 0,   navHeight: 64, contentArea: 576,  label: 'Tablet layout'  },
  'Desktop-S-No-Nav':    { viewport: 992,  columns: 12, gutter: 16, margin: 24, navWidth: 0,   navHeight: 64, contentArea: 992,  label: 'Desktop Layout'  },
  'Desktop-S-Expanded':  { viewport: 992,  columns: 12, gutter: 16, margin: 24, navWidth: 240, navHeight: 64, contentArea: 752,  label: 'Desktop Layout'  },
  'Desktop-S-Collapsed': { viewport: 992,  columns: 12, gutter: 16, margin: 24, navWidth: 56,  navHeight: 64, contentArea: 936,  label: 'Desktop Layout'  },
  'Desktop-L-No-Nav':    { viewport: 1200, columns: 12, gutter: 16, margin: 24, navWidth: 0,   navHeight: 64, contentArea: 1200, label: 'Desktop Layout'  },
  'Desktop-L-Expanded':  { viewport: 1200, columns: 12, gutter: 16, margin: 24, navWidth: 240, navHeight: 64, contentArea: 960,  label: 'Desktop Layout'  },
  'Desktop-L-Collapsed': { viewport: 1200, columns: 12, gutter: 16, margin: 24, navWidth: 56,  navHeight: 64, contentArea: 1144, label: 'Desktop Layout'  },
};

const SPEC_LABELS: Record<GridBreakpoint, string[]> = {
  'Mobile':              ['Width: 360px',  'Columns: 4',  'Gutter: 16px', 'Margin: 20px', 'Nav bar height: 56px', 'Content width: 320px'],
  'Tablet':              ['Width: 576px',  'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'Content width: 528px'],
  'Desktop-S-No-Nav':    ['Width: 992px',  'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'No sidebar',        'Content width: 944px'],
  'Desktop-S-Expanded':  ['Width: 992px',  'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'Nav width: 240px',  'Content width: 704px'],
  'Desktop-S-Collapsed': ['Width: 992px',  'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'Nav width: 56px',   'Content width: 888px'],
  'Desktop-L-No-Nav':    ['Width: 1200px', 'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'No sidebar',        'Content width: 1152px'],
  'Desktop-L-Expanded':  ['Width: 1200px', 'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'Nav width: 240px',  'Content width: 912px'],
  'Desktop-L-Collapsed': ['Width: 1200px', 'Columns: 12', 'Gutter: 16px', 'Margin: 24px', 'Nav bar height: 64px', 'Nav width: 56px',   'Content width: 1096px'],
};

const FRAME_HEIGHT = 300; // px — fixed viewport frame height

export const Grid: React.FC<GridProps> = ({
  breakpoint    = 'Mobile',
  viewportWidth,
  onNavToggle,
  className,
  id,
  dataTestId,
}) => {
  const cfg       = CONFIGS[breakpoint];
  const hasNav    = cfg.navWidth > 0;
  const isMobile  = breakpoint === 'Mobile';

  /* ── Display width ──────────────────────────────────────────
   * When viewportWidth is provided (resizable demo) the frame
   * renders at that exact width; the ruler reflects it.
   * Otherwise the frame renders at the canonical spec width.
   * ────────────────────────────────────────────────────────── */
  const displayWidth = viewportWidth ?? cfg.viewport;

  /* Scale factor: how much the display width differs from spec */
  const scale = displayWidth / cfg.viewport;

  /* ── Heights ────────────────────────────────────────────────
   * ruler     → 32 px (always)
   * topbar    → navHeight px (tablet / desktop, below ruler)
   * bottombar → navHeight px (mobile, absolute at bottom)
   * body      → remaining height
   * ────────────────────────────────────────────────────────── */
  const rulerH     = 32;
  const topbarH    = isMobile ? 0 : cfg.navHeight;
  const bottombarH = isMobile ? cfg.navHeight : 0;
  const bodyTop    = rulerH + topbarH;
  const bodyH      = FRAME_HEIGHT - bodyTop - bottombarH;

  /* ── Pixel dimensions (scaled proportionally) ───────────────
   *
   * For mobile/tablet (no nav sidebar) the content area spans
   * the full display width.  For desktop it spans only the area
   * to the right of the nav sidebar (cfg.contentArea * scale).
   *
   * Margin, gutter and nav sidebar are absolute pixel values —
   * they never scale.  Only the columns respond to displayWidth.
   * ────────────────────────────────────────────────────────── */
  const navPx    = cfg.navWidth; // absolute — sidebar never scales
  const marginPx = cfg.margin;   // absolute — 20px (mobile) or 24px (tablet/desktop)
  const gutterPx = cfg.gutter;   // absolute — 16px across all breakpoints

  // Content div: full display width for mobile/tablet;
  // display width minus the fixed nav sidebar for desktop.
  const contentDivPx = hasNav ? displayWidth - navPx : displayWidth;

  // Columns+gutters area inside both margins
  const colAreaPx  = contentDivPx - 2 * marginPx;
  const colWidthPx = Math.max(0, (colAreaPx - (cfg.columns - 1) * gutterPx) / cfg.columns);

  /* Content width = columns + gutters band (inside both margins) */
  const liveContentWidth = Math.round(contentDivPx - 2 * marginPx);

  /* Dim-label positions in absolute px within the content div */
  const marginLabelPx = marginPx / 2;
  const gutterLabelPx = marginPx + colWidthPx + gutterPx / 2;

  const dimLabelTop          = bodyH * 0.28;          // 28 % down — margin/gutter labels
  const contentWidthRulerTop = dimLabelTop + 36;       // green content-width ruler below

  const rootClass = ['dcds-Grid', className].filter(Boolean).join(' ');

  return (
    <figure
      className={rootClass}
      id={id}
      data-testid={dataTestId}
      aria-label={`${cfg.label} — ${cfg.viewport}px viewport, ${cfg.columns} columns`}
    >
      <p className="dcds-Grid__section-label">{cfg.label}</p>

      <ul className="dcds-Grid__spec-list">
        {SPEC_LABELS[breakpoint].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* ── Viewport frame ────────────────────────────────── */}
      <div
        className="dcds-Grid__viewport"
        style={{ width: displayWidth }}
      >
        {/* Width ruler (always — shows current display width) */}
        <div className="dcds-Grid__ruler" style={{ height: rulerH }}>
          <span className="dcds-Grid__ruler-line" />
          <span className="dcds-Grid__ruler-value">
            {isMobile ? `${displayWidth}px` : `${displayWidth}px`}
          </span>
        </div>

        {/* Top nav bar — tablet / desktop */}
        {!isMobile && (
          <div className="dcds-Grid__topbar" style={{ top: rulerH, height: topbarH }}>
            <span className="dcds-Grid__topbar-label">TopBar · {cfg.navHeight}px</span>
          </div>
        )}

        {/* Bottom nav bar — mobile */}
        {isMobile && (
          <div className="dcds-Grid__bottombar" style={{ height: bottombarH }}>
            <span className="dcds-Grid__bottombar-label">Bottom nav · {cfg.navHeight}px</span>
          </div>
        )}

        {/* Body: [sidebar?] + content area */}
        <div
          className="dcds-Grid__body"
          style={{ top: bodyTop, height: bodyH, bottom: isMobile ? bottombarH : 0 }}
        >
          {/* Nav sidebar — desktop only; click to toggle expanded/collapsed */}
          {hasNav && (
            <div
              className={[
                'dcds-Grid__nav-sidebar',
                onNavToggle ? 'dcds-Grid__nav-sidebar--clickable' : '',
              ].filter(Boolean).join(' ')}
              style={{ width: navPx, height: bodyH }}
              onClick={onNavToggle}
              role={onNavToggle ? 'button' : undefined}
              aria-label={onNavToggle
                ? cfg.navWidth > 100 ? 'Collapse sidebar' : 'Expand sidebar'
                : undefined}
              title={onNavToggle
                ? cfg.navWidth > 100 ? 'Click to collapse' : 'Click to expand'
                : undefined}
            >
              <span className="dcds-Grid__nav-label">{cfg.navWidth}px</span>
              {onNavToggle && (
                <span className="dcds-Grid__nav-chevron" aria-hidden="true">
                  {cfg.navWidth > 100 ? '‹' : '›'}
                </span>
              )}
            </div>
          )}

          {/* Content area */}
          <div
            className="dcds-Grid__content-area"
            style={{ width: hasNav ? contentDivPx : '100%', height: bodyH }}
          >
            {/* Content-area width ruler — desktop only */}
            {hasNav && (
              <div className="dcds-Grid__content-ruler">
                <span className="dcds-Grid__content-ruler-line" />
                <span className="dcds-Grid__content-ruler-value">
                  {contentDivPx}px
                </span>
              </div>
            )}

            {/* Column grid — absolute margin/gutter, flexible 1fr columns */}
            <div
              className="dcds-Grid__cols"
              style={{
                top:                 hasNav ? 28 : 0,
                bottom:              0,
                paddingInline:       marginPx,
                columnGap:           gutterPx,
                gridTemplateColumns: `repeat(${cfg.columns}, 1fr)`,
              }}
            >
              {Array.from({ length: cfg.columns }, (_, i) => (
                <div key={i} className="dcds-Grid__col" />
              ))}
            </div>

            {/* Margin label */}
            <span
              className="dcds-Grid__dim-label"
              style={{ left: marginLabelPx, top: dimLabelTop }}
            >
              {cfg.margin}px
            </span>

            {/* Gutter label */}
            <span
              className="dcds-Grid__dim-label"
              style={{ left: gutterLabelPx, top: dimLabelTop }}
            >
              {cfg.gutter}px
            </span>

            {/* Content-width ruler (green) — viewport − 2×margin − navWidth */}
            <div
              className="dcds-Grid__content-width-ruler"
              style={{
                top:    contentWidthRulerTop,
                left:   marginPx,
                width:  liveContentWidth,
                height: 28,
              }}
            >
              <span className="dcds-Grid__content-width-line" />
              <span className="dcds-Grid__content-width-value">
                {liveContentWidth}px
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

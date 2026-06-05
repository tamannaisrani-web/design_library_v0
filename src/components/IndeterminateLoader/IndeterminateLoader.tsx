import React from 'react';
import type { IndeterminateLoaderProps } from './IndeterminateLoader.types';
import './IndeterminateLoader.css';

/**
 * **IndeterminateLoader** — flat horizontal scanning bar for unknown-duration loading.
 *
 * Renders as a bar with an 82 px animated segment that sweeps continuously from
 * left to right, replacing the previous circular spinner design.
 * Use `DeterminateLoader` as soon as a real percentage is available.
 *
 * **When to use:** page content loading, API calls in flight, background processes.
 * **When NOT to use:** when you know the percentage — use `DeterminateLoader` instead.
 *
 * Token mapping:
 * - Track (bg):   `color/fill/primary-1`  → Noble Blue-50  `#dae9fb`
 * - Segment Small:`color/fill/primary-3`  → Noble Blue-200 `#6ba8ee` (visible blue)
 * - Segment Medium:`color/fill/primary-1` → Noble Blue-50  `#dae9fb` (subtle)
 * - Helper text:  `color/text/primary`    → Noble Blue-500 `#0A2E57`
 * - Height Small: 4 px · Height Medium: 8 px · radius: `--rd-XS` (4 px)
 *
 * Figma variant note: "Small start", "Small end", "Medium start", "Medium end"
 * are keyframe states for design review — do NOT pass them as `size`.
 *
 * @see IndeterminateLoader.ai.md · DripDesign.md RULE 8
 * @see Figma node 1764:731 — Design Language System (Claude)
 *
 * @example Default — small bar with helper text (most common)
 * ```tsx
 * <IndeterminateLoader
 *   size="Small"
 *   label="Loading results…"
 *   aria-label="Loading results"
 * />
 * ```
 *
 * @example Medium bar — more prominent loading state
 * ```tsx
 * <IndeterminateLoader
 *   size="Medium"
 *   label="Fetching your documents…"
 *   aria-label="Loading documents"
 * />
 * ```
 *
 * @example Without helper text label
 * ```tsx
 * <IndeterminateLoader
 *   size="Small"
 *   helperText={false}
 *   aria-label="Loading"
 * />
 * ```
 *
 * @example Transition — show until real progress begins, then swap
 * ```tsx
 * {uploadProgress === 0
 *   ? <IndeterminateLoader size="Small" label="Preparing upload…" aria-label="Preparing upload" />
 *   : <DeterminateLoader progress={uploadProgress} helperText="Uploading file" />
 * }
 * ```
 */
export const IndeterminateLoader: React.FC<IndeterminateLoaderProps> = ({
  size = 'Small',
  helperText: showHelperText = true,
  label = 'Helper text...',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
  id,
  dataTestId,
}) => {
  const rootClass = [
    'dcds-IndeterminateLoader',
    `dcds-IndeterminateLoader--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Fall back to label text for aria-label when no explicit value is given
  const resolvedAriaLabel = ariaLabel ?? (showHelperText ? label : 'Loading');

  return (
    <div
      id={id}
      className={rootClass}
      data-testid={dataTestId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Track — overflows hidden so the segment clips cleanly at both edges */}
      <div
        role="progressbar"
        aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : resolvedAriaLabel)}
        aria-labelledby={ariaLabelledBy}
        aria-busy="true"
        className="dcds-IndeterminateLoader__track"
      >
        {/* Animated scanning segment — 82 px wide, sweeps left-to-right */}
        <div className="dcds-IndeterminateLoader__segment" aria-hidden="true" />
      </div>

      {/* Optional descriptive label below the bar */}
      {showHelperText && (
        <span className="dcds-IndeterminateLoader__label">{label}</span>
      )}
    </div>
  );
};

IndeterminateLoader.displayName = 'IndeterminateLoader';

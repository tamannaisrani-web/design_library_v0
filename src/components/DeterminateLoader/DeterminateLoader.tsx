import React, { useEffect, useRef } from 'react';
import type { DeterminateLoaderProps } from './DeterminateLoader.types';
import './DeterminateLoader.css';

/**
 * **DeterminateLoader** — flat horizontal progress bar for known-percentage progress.
 *
 * Renders as a 4 px track filled left-to-right with an optional helper text label on
 * the left and a numeric percentage on the right. Always use this instead of a custom
 * `<div>`-based progress bar.
 *
 * **When to use:** file upload progress, batch processing, data import, onboarding score.
 * **When NOT to use:** unknown duration — use `IndeterminateLoader` instead.
 *
 * Token mapping:
 * - Fill bar:   `color/fill/primary-3`  → Noble Blue-200 `#6ba8ee`
 * - Track:      `color/surface/4`       → Cool Grey-200  `#f0f0f0`
 * - Text:       `color/text/primary`    → Noble Blue-500 `#0A2E57`
 * - Bar height: 4 px · radius: `--rd-XS` (4 px)
 *
 * @see DeterminateLoader.ai.md · DripDesign.md RULE 8
 * @see Figma node 1764:705 — Design Language System (Claude)
 *
 * @example File upload at 62%
 * ```tsx
 * <DeterminateLoader
 *   progress={62}
 *   helperText="Uploading statement.pdf"
 *   aria-label="Upload progress: 62%"
 * />
 * ```
 *
 * @example Without percentage label
 * ```tsx
 * <DeterminateLoader
 *   progress={progress}
 *   helperText="Processing documents"
 *   displayPercentage={false}
 *   aria-label={`Processing: ${progress}% complete`}
 * />
 * ```
 *
 * @example Transition from IndeterminateLoader once progress is known
 * ```tsx
 * {uploadProgress === 0
 *   ? <IndeterminateLoader size="Small" label="Preparing upload…" aria-label="Preparing upload" />
 *   : <DeterminateLoader progress={uploadProgress} helperText="Uploading file" />
 * }
 * ```
 */
export const DeterminateLoader: React.FC<DeterminateLoaderProps> = ({
  progress,
  displayHelperText = true,
  displayPercentage = true,
  helperText = 'Helper text...',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  onProgressComplete,
  onProgressChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
  id,
  dataTestId,
}) => {
  // Clamp and round the progress value to a 0–100 integer
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  // Track the previous progress value to detect the 0→100 completion transition
  const prevProgressRef = useRef<number>(clamped);

  // Fire onProgressComplete once when progress first reaches 100
  useEffect(() => {
    if (clamped === 100 && prevProgressRef.current < 100 && onProgressComplete) {
      onProgressComplete();
    }
    prevProgressRef.current = clamped;
  }, [clamped, onProgressComplete]);

  // Notify consumers of every progress value change
  useEffect(() => {
    onProgressChange?.(clamped);
  }, [clamped, onProgressChange]);

  const rootClass = ['dcds-DeterminateLoader', className].filter(Boolean).join(' ');

  // Derive a screen-reader-friendly description when no explicit aria-label is given
  const resolvedAriaLabel = ariaLabel ?? `${clamped}% complete`;

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
      {/* Track + fill — carries all ARIA progressbar semantics */}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={resolvedAriaLabel}
        aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : resolvedAriaLabel)}
        aria-labelledby={ariaLabelledBy}
        className="dcds-DeterminateLoader__track"
      >
        <div
          className="dcds-DeterminateLoader__fill"
          style={{ width: `${clamped}%` }}
        />
      </div>

      {/* Text row — hidden entirely when both display flags are off */}
      {(displayHelperText || displayPercentage) && (
        <div className="dcds-DeterminateLoader__labels">
          {displayHelperText && (
            <span className="dcds-DeterminateLoader__helper-text">{helperText}</span>
          )}
          {displayPercentage && (
            /* aria-hidden: screen readers already get the value from aria-valuenow */
            <span className="dcds-DeterminateLoader__percentage" aria-hidden="true">
              {clamped}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

DeterminateLoader.displayName = 'DeterminateLoader';

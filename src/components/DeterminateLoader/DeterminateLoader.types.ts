/**
 * DeterminateLoader — public TypeScript types.
 *
 * Source spec: DeterminateLoader.ai.md + DeterminateLoader.stories.mdx
 * Figma node: 1764:705 · File: P52nmDshYaKr963q1zBwQj
 *
 * Use DeterminateLoader when the **completion percentage is known and can be
 * communicated to the user** — file upload progress, batch processing, onboarding
 * completion scores.
 *
 * ❌ NOT when the duration is unknown — use `IndeterminateLoader`.
 * ❌ NOT with `progress={0}` as an initial state — show `IndeterminateLoader` until
 *    real progress begins.
 * ❌ NOT as a raw `<div>`-based progress bar — always use this component.
 */

import type { BaseComponentProps } from '../shared/types';

/**
 * Props for the **DeterminateLoader** component.
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
 * @example Without helper text (percentage only)
 * ```tsx
 * <DeterminateLoader
 *   progress={progress}
 *   displayHelperText={false}
 *   aria-label={`Loading: ${progress}% complete`}
 * />
 * ```
 *
 * @example Transition to success state at 100%
 * ```tsx
 * {isDone
 *   ? <Alert state="success">Upload complete</Alert>
 *   : <DeterminateLoader progress={progress} helperText="Uploading…" onProgressComplete={markDone} />
 * }
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
export interface DeterminateLoaderProps extends BaseComponentProps {
  /**
   * Completion percentage. Accepts any integer from 0 to 100 — values are
   * clamped automatically. The Figma file shows discrete milestones (25, 50,
   * 75, 100) for illustration only; pass any real integer (e.g. `progress={62}`).
   *
   * - `0`   — avoid; use `IndeterminateLoader` until real progress begins.
   * - `100` — at completion, transition to a success state via `onProgressComplete`.
   */
  progress: number;

  /**
   * Controls visibility of the helper/label text on the left of the text row.
   * Do NOT set both `displayHelperText` and `displayPercentage` to `false` — the
   * bar alone provides insufficient context for users.
   * @default true
   */
  displayHelperText?: boolean;

  /**
   * Controls visibility of the numeric percentage label on the right of the text row.
   * Do NOT set both `displayHelperText` and `displayPercentage` to `false`.
   * @default true
   */
  displayPercentage?: boolean;

  /**
   * Descriptive label shown to the left of the percentage.
   * Always replace the default with a meaningful string in production
   * (e.g. `"Uploading statement.pdf"`).
   * @default "Helper text..."
   */
  helperText?: string;

  /**
   * Accessible label for the `role="progressbar"` element.
   * Must reflect the current percentage — update dynamically as progress changes.
   * Example: `"Upload progress: 62%"`.
   */
  'aria-label'?: string;

  /**
   * ID of an element whose text labels the progress bar.
   * Use instead of `aria-label` when a visible label already exists.
   */
  'aria-labelledby'?: string;

  // ── Event Handlers ────────────────────────────────────────────────────────

  /**
   * Fired once when `progress` transitions to `100`.
   * Use this to swap in a success state (e.g. `Alert state="success"`).
   * Do not leave a completed loader on screen indefinitely.
   */
  onProgressComplete?: () => void;

  /**
   * Fired on every progress value change.
   * Receives the clamped integer value (0–100).
   */
  onProgressChange?: (progress: number) => void;

  /**
   * Fired when the user hovers over the progress bar track.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Fired when the user stops hovering over the progress bar track.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Fired when the progress bar container receives focus.
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Fired when the progress bar container loses focus.
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

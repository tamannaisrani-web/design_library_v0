/**
 * IndeterminateLoader — public TypeScript types.
 *
 * Source spec: IndeterminateLoader.ai.md + IndeterminateLoader.stories.mdx
 * Figma node: 1764:731 · File: P52nmDshYaKr963q1zBwQj
 *
 * Use IndeterminateLoader when an operation is in progress but **the duration or
 * completion percentage is unknown** — page content loading, API calls in flight,
 * background processes.
 *
 * ❌ NOT when you know the progress percentage — use `DeterminateLoader`.
 * ❌ NOT when there is no actual pending operation — never show speculatively.
 * ❌ NOT a raw CSS `@keyframes` shimmer — always use this component.
 *
 * Figma variant note: The Figma file shows "Small start", "Small end",
 * "Medium start", "Medium end". These are animation keyframe states for design
 * review only. The actual prop is `size: "Small" | "Medium"`.
 */

import type { BaseComponentProps } from '../shared/types';

/**
 * Bar height / segment colour tier.
 *
 * | Size     | Bar height | Segment colour token          | Hex        |
 * |----------|-----------|-------------------------------|------------|
 * | `Small`  | 4 px      | `color/fill/primary-3`  | `#6ba8ee`  |
 * | `Medium` | 8 px      | `color/fill/primary-3`  | `#6ba8ee`  |
 *
 * Note: Small and Medium intentionally use **different** segment colours.
 */
export type IndeterminateLoaderSize = 'Small' | 'Medium';

/**
 * Props for the **IndeterminateLoader** component.
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
 * @example Transition — show until real progress begins, then swap to DeterminateLoader
 * ```tsx
 * {uploadProgress === 0
 *   ? <IndeterminateLoader size="Small" label="Preparing upload…" aria-label="Preparing upload" />
 *   : <DeterminateLoader progress={uploadProgress} helperText="Uploading file" />
 * }
 * ```
 */
export interface IndeterminateLoaderProps extends BaseComponentProps {
  /**
   * Controls the bar height and animated segment colour.
   * - `"Small"`  — 4 px height, visible blue segment (`color/fill/primary-3`).
   *   Default; suits most inline and section-level loading contexts.
   * - `"Medium"` — 8 px height, subtle segment (`color/fill/primary-1`).
   *   Use for more prominent loading states.
   *
   * Both sizes use the same segment colour (`color/fill/primary-3` `#6ba8ee`);
   * only bar height differs. Do NOT pass Figma keyframe variant names like
   * `"Small start"` or `"Medium end"`.
   * @default 'Small'
   */
  size?: IndeterminateLoaderSize;

  /**
   * Controls visibility of the label text below the bar.
   * When `false`, only the animated bar is rendered.
   * Always provide `aria-label` when `helperText` is `false`.
   * @default true
   */
  helperText?: boolean;

  /**
   * Descriptive text shown below the bar when `helperText` is `true`.
   * Always replace the default with a meaningful string in production
   * (e.g. `"Loading documents…"`).
   *
   * _Figma internal prop name is `helperText2` — use `label` in code._
   * @default "Helper text..."
   */
  label?: string;

  /**
   * Accessible label for the `role="progressbar"` element.
   * Required — either `aria-label` or `aria-labelledby` must be provided.
   */
  'aria-label'?: string;

  /**
   * ID of an element whose text labels the progress bar.
   * Use instead of `aria-label` when a visible label already exists.
   */
  'aria-labelledby'?: string;

  // ── Event Handlers ────────────────────────────────────────────────────────

  /**
   * Fired when the user hovers over the loader container.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Fired when the user stops hovering over the loader container.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Fired when the loader container receives focus (e.g. when tabbed to).
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Fired when the loader container loses focus.
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

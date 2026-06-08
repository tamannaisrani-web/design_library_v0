/**
 * UploadDocument — public TypeScript types.
 *
 * Source spec: ai-docs/Upload.ai.md + DripDesign.md · Figma node 1510:592
 *
 * @see UploadDocument for component usage.
 */

import type { BaseComponentProps } from '../shared/types';

/**
 * Overall upload state of the document row.
 * Switch from `"Uploading"` to `"Uploaded"` as soon as the transfer completes.
 */
export type UploadDocumentState = 'Uploading' | 'Uploaded';

/**
 * Which loader to embed below the document row while uploading.
 *
 * - `"Determinate"`   → DeterminateLoader (horizontal bar + percentage) — use when % is known
 * - `"Indeterminate"` → IndeterminateLoader (sweeping scan)              — use when duration is unknown
 */
export type UploadDocumentLoaderType = 'Indeterminate' | 'Determinate';

/**
 * Props for the UploadDocument component.
 *
 * Displays a single file row during or after an upload. Combines:
 * - A document icon (16 px)
 * - Filename label
 * - A neutral status Badge (optional)
 * - View and Delete icon buttons (optional)
 * - An optional progress loader below the row (while uploading)
 *
 * Wrap multiple rows in a `<ul>` / `<li>` for screen reader list announcement.
 *
 * @example Uploading with known progress (DeterminateLoader)
 * ```tsx
 * <UploadDocument
 *   status="Uploading"
 *   loaderType="Determinate"
 *   documentName="statement_2024.pdf"
 *   progress={62}
 *   onDelete={() => cancelUpload()}
 * />
 * ```
 *
 * @example Upload complete
 * ```tsx
 * <UploadDocument
 *   status="Uploaded"
 *   loaderType="Default"
 *   documentName="statement_2024.pdf"
 *   onView={() => openFile()}
 *   onDelete={() => removeFile()}
 * />
 * ```
 */
export interface UploadDocumentProps extends BaseComponentProps {
  /**
   * Overall state of the file row.
   * - `"Uploading"`  — transfer in progress; loader renders below the row
   * - `"Uploaded"`   — transfer complete; no loader shown
   *
   * Always switch to `"Uploaded"` once the transfer completes.
   * @default 'Uploading'
   */
  status?: UploadDocumentState;

  /**
   * Which loader to render below the row while `status="Uploading"`.
   * Ignored when `status="Uploaded"`.
   *
   * - `"Determinate"`   → DeterminateLoader (horizontal bar + %) — use when % is known
   * - `"Indeterminate"` → IndeterminateLoader (sweeping scan)    — use when duration unknown
   * - `"Default"`       → No loader
   * @default 'Determinate'
   */
  loaderType?: UploadDocumentLoaderType;

  /**
   * The file name label. Always set to the real file name.
   * Never leave the default `"Document Name"` in production.
   * @default 'Document Name'
   */
  documentName?: string;

  /**
   * Show the neutral status Badge on the right side of the row.
   * @default true
   */
  displayStatus?: boolean;

  /**
   * Text shown inside the status Badge.
   * @default 'Status'
   */
  statusText?: string;

  /**
   * Semantic state of the status Badge — maps to `Badge` `state` prop.
   * - `'neutral'`  — grey
   * - `'success'`  — green
   * - `'warning'`  — amber
   * - `'error'`    — orange/red
   * - `'info'`     — blue
   * @default 'neutral'
   */
  badgeState?: 'neutral' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Visual emphasis of the status Badge — maps to `Badge` `emphasis` prop.
   * - `'subtle'`  — light tinted bg + coloured text (default)
   * - `'intense'` — filled bg + inverted text
   * @default 'subtle'
   */
  badgeEmphasis?: 'subtle' | 'intense';

  /**
   * Show the warning icon inside the status Badge.
   * @default true
   */
  showBadgeIcon?: boolean;

  /**
   * Show the eye (view) icon button.
   * @default true
   */
  displayView?: boolean;

  /**
   * Show the trash (delete) icon button.
   * @default true
   */
  displayDelete?: boolean;

  /**
   * Upload progress percentage (0–100).
   * Only used when `loaderType="Determinate"` (DeterminateLoader).
   * @default 0
   */
  progress?: number;

  // ── Loader props (DeterminateLoader + IndeterminateLoader) ───────────────

  /**
   * Helper/label text shown below the loader.
   * - For `loaderType="Determinate"` → `DeterminateLoader` `helperText` prop (left of %)
   * - For `loaderType="Indeterminate"` → `IndeterminateLoader` `label` prop (below the bar)
   * Defaults to the documentName when not set.
   */
  helperText?: string;

  /**
   * Show the helper text row below the loader bar.
   * - DeterminateLoader: controls `displayHelperText` (hides the helper text label)
   * - IndeterminateLoader: controls `helperText` boolean (hides the label below bar)
   * @default true
   */
  displayHelperText?: boolean;

  /**
   * Show the numeric percentage label (DeterminateLoader only).
   * Has no effect when `loaderType="Indeterminate"`.
   * @default true
   */
  displayPercentage?: boolean;

  /**
   * Size of the IndeterminateLoader bar.
   * - `'Small'`  — 4 px height (default, suits most inline contexts)
   * - `'Medium'` — 8 px height (more prominent)
   * Has no effect when `loaderType="Determinate"`.
   * @default 'Small'
   */
  loaderSize?: 'Small' | 'Medium';

  /**
   * Fired once when `progress` transitions to `100` (DeterminateLoader only).
   * Use to swap in a success state after upload completes.
   */
  onProgressComplete?: () => void;

  /**
   * Fired on every progress value change (DeterminateLoader only).
   * Receives the clamped 0–100 integer.
   */
  onProgressChange?: (progress: number) => void;

  /**
   * Visual state of the view icon button.
   * @default 'Default'
   */
  viewButtonState?: 'Default' | 'Hover' | 'Disabled';

  /**
   * Visual state of the delete icon button.
   * @default 'Default'
   */
  deleteButtonState?: 'Default' | 'Hover' | 'Disabled';

  /**
   * Disables the view icon button.
   * @default false
   */
  isViewDisabled?: boolean;

  /**
   * Disables the delete icon button.
   * @default false
   */
  isDeleteDisabled?: boolean;

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Fired when the view icon button is clicked.
   * The filename is passed for convenience.
   */
  onView?: (documentName: string) => void;

  /**
   * Fired when the delete icon button is clicked.
   * The filename is passed for convenience.
   */
  onDelete?: (documentName: string) => void;

  /** Fired when the row gains focus. */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /** Fired when the row loses focus. */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  /** Fired when the pointer enters the row. */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /** Fired when the pointer leaves the row. */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

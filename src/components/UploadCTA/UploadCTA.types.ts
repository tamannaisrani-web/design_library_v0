/**
 * UploadCTA — public TypeScript types.
 *
 * Source spec: ai-docs/Upload.ai.md + DripDesign.md · Figma node 1505:1470
 *
 * @see UploadCTA for component usage.
 */

import type { ChangeEvent } from 'react';
import type { BaseComponentProps } from '../shared/types';

/** Available sizes for the UploadCTA button. */
export type UploadCTASize = 'XS' | 'S' | 'M' | 'L';

/** Visual / interaction state of the upload CTA. */
export type UploadCTAState = 'Default' | 'Hover' | 'Disabled';

/**
 * Props for the UploadCTA component.
 *
 * A compact dashed-border upload button in four sizes for inline / secondary
 * upload actions within forms, toolbars, or tight layouts.
 *
 * **Size guidance:**
 * - `XS` / `S` — toolbars, table rows, tight inline contexts
 * - `M` — standard forms
 * - `L` — prominent standalone upload actions
 *
 * Always pair `isDisabled={true}` with `state="Disabled"`.
 *
 * @example L full-width (default)
 * ```tsx
 * <UploadCTA size="L" state="Default" label="Upload statement" isFullWidth />
 * ```
 *
 * @example S inline content-sized
 * ```tsx
 * <UploadCTA size="S" state="Default" label="Upload document" isFullWidth={false}
 *   onFileSelect={(files) => handleFiles(files)} />
 * ```
 *
 * @example Disabled
 * ```tsx
 * <UploadCTA size="L" state="Disabled" isDisabled label="Upload" />
 * ```
 */
export interface UploadCTAProps extends BaseComponentProps {
  /**
   * Height and text/icon scale of the button.
   * - `XS` — 24 px height, 12 px text + icon, `rd-XS` (4 px) radius
   * - `S`  — 32 px height, 12 px text + icon, `rd-XS` (4 px) radius
   * - `M`  — 40 px height, 16 px text + icon, `rd-S`  (8 px) radius
   * - `L`  — 48 px height, 16 px text + icon, `rd-S`  (8 px) radius
   * @default 'L'
   */
  size?: UploadCTASize;

  /**
   * Visual / interaction state.
   * - `Default`  — white background, green dashed border + text
   * - `Hover`    — light-action fill background, green dashed border
   * - `Disabled` — disabled surface + text colour
   *
   * Always pair with `isDisabled={true}` when `state="Disabled"`.
   * @default 'Default'
   */
  state?: UploadCTAState;

  /**
   * Makes the element non-interactive and applies disabled colour tokens.
   * Must be `true` when `state="Disabled"`.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Stretch the button to fill its container width.
   * Set to `false` for inline / content-sized usage.
   * @default true
   */
  isFullWidth?: boolean;

  /**
   * Button label text.
   * Use a descriptive label, e.g. "Upload statement", not just "Upload".
   * @default 'Upload'
   */
  label?: string;

  /**
   * Accept attribute forwarded to the hidden `<input type="file">`.
   * Example: `".pdf,.docx"` or `"application/pdf"`.
   */
  accept?: string;

  /**
   * Allow multiple file selection.
   * @default false
   */
  multiple?: boolean;

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Fired when the user selects one or more files via the file picker.
   * Receives the selected FileList.
   */
  onFileSelect?: (files: FileList) => void;

  /** Fired when the hidden file input value changes (raw event). */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /** Fired when the button is clicked (before the file picker opens). */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Fired when the button gains focus. */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /** Fired when the button loses focus. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /** Fired when the pointer enters the button. */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired when the pointer leaves the button. */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  /** Fired on keydown within the button. */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

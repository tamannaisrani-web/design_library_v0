/**
 * UploadDragDrop — public TypeScript types.
 *
 * Source spec: ai-docs/Upload.ai.md + DripDesign.md · Figma node 633:7822
 *
 * @see UploadDragDrop for component usage.
 */

import type { DragEvent, ChangeEvent } from 'react';
import type { BaseComponentProps } from '../shared/types';

/** Visual / interaction state of the drop zone. */
export type UploadDragDropState = 'Default' | 'Hover' | 'Disabled';

/**
 * Props for the UploadDragDrop component.
 *
 * A 350×112 px primary upload drop zone with a dashed green border.
 * Always pair with `UploadDocument` rows below the zone to show upload progress.
 *
 * **Never** use a raw `<input type="file">` — use this component instead.
 *
 * @example Default drop zone
 * ```tsx
 * <UploadDragDrop
 *   states="Default"
 *   label="Upload Statement"
 *   requirementsText="PDF only, max 50 MB, no password protection"
 *   onFileSelect={(files) => handleUpload(files)}
 * />
 * ```
 *
 * @example Disabled
 * ```tsx
 * <UploadDragDrop states="Disabled" label="Upload Statement" />
 * ```
 */
export interface UploadDragDropProps extends BaseComponentProps {
  /**
   * Visual / interaction state of the drop zone.
   * - `Default`  — white background, green dashed border, active
   * - `Hover`    — success-fill (#e7faf2) background, green dashed border (file dragged over)
   * - `Disabled` — greyed out, pointer-events none
   * @default 'Default'
   */
  states?: UploadDragDropState;

  /**
   * Show a text label above the drop zone.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Label text shown above the drop zone.
   * Always replace with a meaningful value — never leave "Label".
   * @default 'Label'
   */
  label?: string;

  /**
   * Show the file requirements text inside the drop zone.
   * @default true
   */
  displayRequirements?: boolean;

  /**
   * File type / size constraint text shown inside the drop zone.
   * Always set to match actual accepted types and limits — never leave the default.
   * @default 'PDF format only, max 50MB, with no password protection or encryption'
   */
  requirementsText?: string;

  /**
   * Show validation / helper text below the drop zone.
   * @default true
   */
  displayValidation?: boolean;

  /**
   * Text shown in the validation row below the drop zone.
   * @default 'Validation'
   */
  validationText?: string;

  /**
   * Semantic type of the validation message — drives icon and text colour.
   * - `'error'`   — red information icon + error text (Figma node 1871:3000)
   * - `'warning'` — amber information icon + warning text (Figma node 1871:3003)
   * - `'success'` — green tick-circle icon + success text (Figma node 1871:3006)
   * @default 'error'
   */
  validationType?: 'error' | 'warning' | 'success';

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

  /**
   * When true, marks the drop zone as non-interactive.
   * Equivalent to setting `states="Disabled"`. Combines with `states` so either
   * one alone is sufficient to disable the zone.
   * @default false
   */
  isDisabled?: boolean;

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Fired when the user selects files via the click-to-browse affordance or
   * drops files onto the zone. Receives the selected FileList.
   */
  onFileSelect?: (files: FileList) => void;

  /**
   * Fired when a drag enters the drop zone (before drop).
   * Use to switch `states` to `"Hover"` in controlled mode.
   */
  onDragEnter?: (event: DragEvent<HTMLDivElement>) => void;

  /**
   * Fired when a drag leaves the drop zone without dropping.
   * Use to switch `states` back to `"Default"` in controlled mode.
   */
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;

  /**
   * Fired when a dragged file is released over the drop zone.
   */
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;

  /** Fired when the click-to-browse button is clicked (before the file picker opens). */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Fired when the hidden file input value changes (raw event). */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /** Fired when the drop zone gains focus. */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /** Fired when the drop zone loses focus. */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

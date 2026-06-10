/**
 * Datepicker — public TypeScript types.
 *
 * `Datepicker` is a composite component: an InputFields-style trigger
 * (with `dd/mm/yyyy` placeholder and calendar icon) plus a floating calendar
 * panel. Month selection uses an internal `_BaseDatePicker` overlay.
 *
 * Design source: Figma file P52nmDshYaKr963q1zBwQj, nodes 1709:8986,
 * 1223:7583 (trigger closed), 1223:7587 (calendar open),
 * 1223:7586 (day selected), 1223:7585 (month picker open).
 */

import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';
import type { InputFieldsState, InputFieldsValidationProperty } from '../InputFields/InputFields.types';

/**
 * Trigger + panel visual state.
 * - `'close'` — neutral 0.5 px border, placeholder visible, calendar panel hidden
 * - `'open'`  — 1 px focus-subtle border, calendar panel visible
 */
export type DatepickerProperty1 = 'open' | 'close';

/**
 * Props for the `Datepicker` component.
 *
 * @example Controlled datepicker
 * ```tsx
 * import { Datepicker } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 * const [date, setDate] = React.useState<Date | null>(null);
 *
 * <Datepicker
 *   label="Date of birth"
 *   property1={open ? 'open' : 'close'}
 *   value={date}
 *   onToggle={setOpen}
 *   onChange={(d) => { setDate(d); setOpen(false); }}
 * />
 * ```
 */
export interface DatepickerProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLDivElement> {
  /**
   * Trigger + panel visual state.
   * @default 'close'
   */
  property1?: DatepickerProperty1;

  /**
   * Label text rendered above the trigger.
   */
  label?: string;

  /**
   * Shows the asterisk `*` mandatory marker beside the label.
   * @default true
   */
  isMandatory?: boolean;

  /**
   * Show/hide the label row.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Currently selected date. When provided, the matching day is highlighted
   * with `color/fill/action` (green) background.
   */
  value?: Date | null;

  /**
   * Calendar display month/year. When omitted defaults to the month of `value`,
   * or the current month if no value is set.
   */
  viewDate?: Date;

  /**
   * Show/hide the help text row.
   * @default false
   */
  showHelpText?: boolean;

  /**
   * Help text content shown below the label when open.
   */
  helpText?: string;

  /**
   * Visual/interaction state of the trigger — mirrors `InputFields.State`.
   * - `'Default'`   — neutral resting
   * - `'Focus'`     — focused border (also CSS-driven)
   * - `'Filled'`    — green border; auto-applied when `value` is set
   * - `'Error'`     — red border + validation row
   * - `'Disabled'`  — alias for `disabled=true`
   * - `'Read-only'` — non-interactive display
   * @default 'Default'
   */
  State?: InputFieldsState;

  /**
   * Disables the trigger; maps to `State='Disabled'`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Show the validation message row below the trigger.
   * Automatically forced `true` when `State='Error'`.
   * @default false
   */
  showValidation?: boolean;

  /** Message shown in the validation row. */
  validationMessage?: string;

  /**
   * Semantic colour of the validation row.
   * @default 'error'
   */
  validationProperty?: InputFieldsValidationProperty;

  /**
   * Show an info-circle tooltip trigger icon after the label.
   * @default false
   */
  showTooltip?: boolean;

  /** Heading text shown inside the tooltip popover. */
  tooltipHeading?: string;

  /** Body text shown inside the tooltip popover. */
  tooltipBody?: string;

  /**
   * Minimum selectable date (inclusive). Days before this date are rendered
   * as outside-month style and are non-interactive.
   */
  minDate?: Date;

  /**
   * Maximum selectable date (inclusive). Days after this date are rendered
   * as outside-month style and are non-interactive.
   */
  maxDate?: Date;

  /**
   * Fired when the trigger is clicked. Receives the next open state.
   */
  onToggle?: (nextOpen: boolean) => void;

  /**
   * Fired when the user selects a calendar day. Receives the selected `Date`.
   */
  onChange?: (date: Date) => void;

  /**
   * Fired when the user navigates to a different month via the prev/next arrows.
   * Receives the first day of the new month.
   */
  onMonthChange?: (newMonth: Date) => void;
}

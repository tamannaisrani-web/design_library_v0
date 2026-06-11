/**
 * Datepicker — barrel re-export.
 *
 * Internal sub-components (`_BaseHelpText`, `_BaseDatePicker`) are NOT
 * exported. Per DCDS convention, any name starting with `_Base` is for
 * internal composition only.
 */

export { Datepicker } from './Datepicker';
export type { DatepickerProps, DatepickerProperty1 } from './Datepicker.types';

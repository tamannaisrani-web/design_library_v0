/**
 * Checkbox — public TypeScript types.
 * Source: ai-docs/Checkbox.stories.mdx + dcds-registry.json (id: checkbox, figmaNode 868:3089).
 * Figma axes: State (Enabled / Hover / Disabled) × Type (Selected / Unselected).
 * Plus our `indeterminate` flag for "select-all" patterns (aria-checked="mixed").
 */

import type { BaseComponentProps } from '../shared/types';

/** Interactive state. Hover is CSS-driven — do not set explicitly. */
export type CheckboxState = 'Enabled' | 'Disabled';

/**
 * Props for the Checkbox component.
 *
 * Use for multi-select lists, settings that require form submission, or
 * a single "I agree" acknowledgement. For instant-effect toggles use `Switch`.
 */
export interface CheckboxProps extends BaseComponentProps {
  /**
   * Interactive state.
   * @default 'Enabled'
   */
  State?: CheckboxState;

  /** Form field name. */
  name?: string;

  /** Form field value. */
  value?: string;

  /** Visible label — required for accessibility. */
  label: string;

  /** Controlled checked state. */
  checked?: boolean;

  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean;

  /**
   * When true, renders a dash inside the box and sets `aria-checked="mixed"`.
   * Use for "select all" patterns when some (not all) children are selected.
   */
  indeterminate?: boolean;

  /** When true, sets the `required` attribute (useful for terms acceptance). */
  required?: boolean;

  /** Triggered when the user toggles the checkbox. */
  onChange?: (nextChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

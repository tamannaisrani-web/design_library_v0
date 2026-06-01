/**
 * RadioButton — public TypeScript types.
 * Source: ai-docs/RadioButton.stories.mdx + dcds-registry.json (id: radio-button, figmaNode 868:3073).
 * Figma axes: State (Enabled / Hover / Disabled) × Type (Selected / Unselected).
 */

import type { BaseComponentProps } from '../shared/types';

/** Interactive state. Hover is CSS-driven — do not set explicitly. */
export type RadioButtonState = 'Enabled' | 'Disabled';

/**
 * Props for the RadioButton component.
 *
 * **Always** group related options with the same `name` and wrap them in a
 * `<fieldset>` with a `<legend>`. Mutual exclusivity is enforced by the
 * browser when names match.
 */
export interface RadioButtonProps extends BaseComponentProps {
  /**
   * Interactive state.
   * @default 'Enabled'
   */
  State?: RadioButtonState;

  /** Form field name — must match the name used by sibling RadioButtons. */
  name: string;

  /** Value submitted when this option is the active choice. */
  value: string;

  /** Visible label rendered next to the radio dot. */
  label: string;

  /** Controlled selected state. */
  checked?: boolean;

  /** Uncontrolled initial selected state. */
  defaultChecked?: boolean;

  /** Triggered when the user selects this option. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

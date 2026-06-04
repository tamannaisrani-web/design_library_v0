/**
 * Stepper — public TypeScript types.
 *
 * Source: Figma node 776:61667 — Design Language System (Claude)
 * https://www.figma.com/design/P52nmDshYaKr963q1zBwQj/Design-Language-System--Claude-?node-id=776-61667
 *
 * @packageDocumentation
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Visual state of an individual step in the Stepper.
 *
 * - `active`    — The step currently in progress (exactly **one** step should be active at a time).
 * - `completed` — A step that has been successfully finished (renders a checkmark icon).
 * - `upcoming`  — A step not yet started (neutral hollow circle).
 * - `pending`   — A step that requires attention or has an unresolved warning (renders a warning icon).
 * - `disabled`  — A step that cannot be interacted with (muted colour, no pointer events).
 */
export type StepState = 'active' | 'completed' | 'upcoming' | 'pending' | 'disabled';

/**
 * Controls the layout direction of the Stepper container.
 *
 * - `Horizontal` — Steps flow left to right (default). Use at the top of a page or form.
 *   The Stepper spans the **full width** of its container.
 * - `Vertical`   — Steps flow top to bottom. Use in sidebars or narrow panels.
 */
export type StepperOrientation = 'Horizontal' | 'Vertical';

/**
 * Props for the `Step` sub-component.
 *
 * `Step` must only be used as a **direct child** of `Stepper`.
 * Never render it in isolation.
 *
 * @example Basic step
 * ```tsx
 * <Step state="active" label="KYC Verification" description="Verify your identity" />
 * ```
 *
 * @example Clickable completed step (navigate back)
 * ```tsx
 * <Step
 *   state="completed"
 *   label="Personal Info"
 *   onClick={(index, state) => handleStepNav(index)}
 * />
 * ```
 */
export interface StepProps extends BaseComponentProps {
  /**
   * Visual state of this step.
   * Exactly **one** step in the list must have `state="active"` at any given time.
   */
  state: StepState;

  /**
   * Primary label shown below (horizontal) or beside (vertical) the step indicator.
   * Always required — every step needs a meaningful label.
   */
  label: string;

  /**
   * Optional secondary description rendered below the label (12 px Regular).
   * Use to add brief contextual text when the label alone is insufficient.
   */
  description?: string;

  /**
   * Whether the `description` text is visible.
   *
   * Maps directly to the Figma `_BaseStepper` `showDescription` prop.
   * Useful when you want to keep the description string in state but hide it
   * in compact layouts or narrow containers without clearing the value.
   *
   * @default true
   */
  showDescription?: boolean;

  /**
   * Called when this step is clicked.
   * Only wire this up when your design explicitly allows navigating back to a prior step.
   *
   * @param index - Zero-based position of the step in the list.
   * @param state - Current state of the clicked step.
   */
  onClick?: (index: number, state: StepState) => void;

  /** Forwarded mouse-enter event on the step `<li>` element. */
  onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;

  /** Forwarded mouse-leave event on the step `<li>` element. */
  onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;

  /** Forwarded focus event on the step `<li>` element. */
  onFocus?: React.FocusEventHandler<HTMLLIElement>;

  /** Forwarded blur event on the step `<li>` element. */
  onBlur?: React.FocusEventHandler<HTMLLIElement>;

  /** Forwarded keydown event on the step `<li>` element. */
  onKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
}

/**
 * Props for the `Stepper` container component.
 *
 * @example Standard horizontal stepper — loan application flow
 * ```tsx
 * <Stepper isCompact={false} Orientation="Horizontal">
 *   <Step state="completed" label="Personal Info" />
 *   <Step state="active"    label="Employment" />
 *   <Step state="upcoming"  label="Documents" />
 *   <Step state="upcoming"  label="Review" />
 * </Stepper>
 * ```
 *
 * @example Compact horizontal — space-constrained layout
 * ```tsx
 * <Stepper isCompact={true} Orientation="Horizontal">
 *   <Step state="completed" label="Step 1" />
 *   <Step state="active"    label="Step 2" />
 *   <Step state="upcoming"  label="Step 3" />
 * </Stepper>
 * ```
 *
 * @example Vertical sidebar wizard
 * ```tsx
 * <Stepper isCompact={false} Orientation="Vertical">
 *   <Step state="completed" label="Account setup"    description="Profile ready" />
 *   <Step state="active"    label="KYC verification"                             />
 *   <Step state="upcoming"  label="Bank linking"                                 />
 * </Stepper>
 * ```
 */
export interface StepperProps extends BaseComponentProps {
  /**
   * When `true`, renders compact indicator bars instead of full circles.
   * Labels and descriptions are still shown. Use only in space-constrained layouts.
   *
   * @default false
   */
  isCompact?: boolean;

  /**
   * Layout direction.
   * - `Horizontal` (default) — spans the full width of the container.
   * - `Vertical` — stacks steps top to bottom.
   *
   * @default 'Horizontal'
   */
  Orientation?: StepperOrientation;

  /**
   * `Step` child components.
   * Only `<Step>` elements should be direct children.
   * Exactly **one** child must have `state="active"` at any time.
   */
  children: ReactNode;

  /**
   * Called when any step is clicked.
   * Receives the zero-based index and the state of the clicked step.
   *
   * @param index - Zero-based position in the step list.
   * @param state - Current state of the clicked step.
   */
  onStepClick?: (index: number, state: StepState) => void;

  /** Forwarded mouse-enter on the Stepper `<ol>` container. */
  onMouseEnter?: React.MouseEventHandler<HTMLOListElement>;

  /** Forwarded mouse-leave on the Stepper `<ol>` container. */
  onMouseLeave?: React.MouseEventHandler<HTMLOListElement>;

  /** Forwarded focus on the Stepper `<ol>` container. */
  onFocus?: React.FocusEventHandler<HTMLOListElement>;

  /** Forwarded blur on the Stepper `<ol>` container. */
  onBlur?: React.FocusEventHandler<HTMLOListElement>;

  /** Forwarded keydown on the Stepper `<ol>` container. */
  onKeyDown?: React.KeyboardEventHandler<HTMLOListElement>;
}

/**
 * Internal context value injected by `Stepper` into each `Step`.
 *
 * **Not exported** — consumers must not import or construct this.
 * @internal
 */
export interface StepContextValue {
  /** Whether the stepper is in compact (bar) mode. */
  isCompact: boolean;
  /** Layout orientation. */
  orientation: StepperOrientation;
  /** Zero-based position of this step. */
  stepIndex: number;
  /** Total number of steps in the list. */
  totalSteps: number;
  /**
   * Whether a connector line should be drawn after the indicator.
   * `true` for every step except the last.
   * Always `false` in compact mode.
   */
  showConnector: boolean;
  /** Bubbled up from `StepperProps.onStepClick`. */
  onStepClick?: (index: number, state: StepState) => void;
}

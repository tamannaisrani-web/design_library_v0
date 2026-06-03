/**
 * @dcds/components — Stepper barrel export.
 *
 * Usage:
 * ```ts
 * import { Stepper, Step } from '@dcds/components';
 * import type { StepperProps, StepProps, StepState, StepperOrientation } from '@dcds/components';
 * ```
 */

export { Stepper, Step } from './Stepper';
export type {
  StepperProps,
  StepProps,
  StepState,
  StepperOrientation,
  /** @internal — not for consumer use */
  StepContextValue,
} from './Stepper.types';

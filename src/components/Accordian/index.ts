/**
 * Accordian — collapsible content panel with configurable header.
 *
 * Usage:
 * ```tsx
 * import { Accordian } from '@dcds/components';
 * import type { AccordianProps, AccordianState } from '@dcds/components';
 * ```
 *
 * Subcomponents `_AccordianLeading` and `_AccordianActions` are internal —
 * they are not exported and must never be used directly.
 */
export { Accordian } from './Accordian';
export type {
  AccordianProps,
  AccordianState,
  AccordianStatusConfig,
  AccordianActionConfig,
} from './Accordian.types';

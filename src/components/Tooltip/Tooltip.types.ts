/**
 * Tooltip — public TypeScript types.
 *
 * Source: Figma node 478:30949 — Design Language System (Claude)
 * https://www.figma.com/design/P52nmDshYaKr963q1zBwQj/Design-Language-System--Claude-?node-id=478-30949
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Controls where the tooltip bubble appears relative to its trigger element.
 * The arrow/caret always points back toward the trigger.
 *
 * - `Top`    — (default) bubble above trigger, arrow below it pointing down.
 * - `Bottom` — bubble below trigger, arrow above it pointing up.
 * - `Left`   — bubble left of trigger, arrow on the right pointing right.
 * - `Right`  — bubble right of trigger, arrow on the left pointing left.
 */
export type TooltipPlacement = 'Top' | 'Bottom' | 'Left' | 'Right';

/**
 * Props for the Tooltip component.
 *
 * @example Default (info-circle trigger, Top placement)
 * ```tsx
 * <Tooltip heading="Upload limit" bodyText="Files must be under 10 MB each." />
 * ```
 *
 * @example Custom trigger
 * ```tsx
 * <Tooltip heading="Download CSV" Placement="Bottom">
 *   <button aria-label="Download CSV"><DownloadIcon size={16} /></button>
 * </Tooltip>
 * ```
 *
 * @example Right placement
 * ```tsx
 * <Tooltip bodyText="Must be at least 8 characters." Placement="Right">
 *   <InfoIcon size={16} />
 * </Tooltip>
 * ```
 */
export interface TooltipProps extends BaseComponentProps {
  /**
   * Bold heading inside the tooltip bubble (18 px Caption Bold).
   * Omit when you only need a short body text with no title.
   */
  heading?: string;

  /**
   * Descriptive body text inside the tooltip bubble (16 px Body Regular).
   * At least one of `heading` or `bodyText` must be supplied.
   */
  bodyText?: string;

  /**
   * The trigger element the tooltip anchors to.
   * When omitted, a default `info-circle` icon is rendered as the trigger.
   * The tooltip injects `aria-describedby` onto this element automatically.
   */
  children?: ReactNode;

  /**
   * Where the tooltip bubble appears relative to the trigger.
   * The arrow always points toward the trigger.
   * @default 'Top'
   */
  Placement?: TooltipPlacement;

  /**
   * When `true`, the tooltip bubble is always visible regardless of hover or
   * focus state. Mirrors the Figma `displayTooltip` variant property.
   * Useful for documentation, testing, and design-time previews.
   * @default false
   */
  forceVisible?: boolean;

  /**
   * Called when the tooltip becomes visible (hover enter or focus).
   */
  onShow?: () => void;

  /**
   * Called when the tooltip is hidden (hover leave, blur, or Escape).
   */
  onHide?: () => void;

  /**
   * Forwarded to the wrapper — fires on hover enter of the trigger region.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Forwarded to the wrapper — fires on hover leave of the trigger region.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Forwarded to the wrapper — fires when focus enters the trigger region.
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Forwarded to the wrapper — fires when focus leaves the trigger region.
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Forwarded to the wrapper — use to intercept Escape or other keys.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

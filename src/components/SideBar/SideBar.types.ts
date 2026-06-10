/**
 * SideBar — public TypeScript types.
 *
 * Source spec: NavElement.ai.md · "SideBar Context (Reference)" section + DripDesign.md.
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 694:17643 (Expanded), 1937:6590 (Collapsed)
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Props for the **SideBar** component.
 *
 * `SideBar` is the container that holds `NavElement` items vertically.
 * It controls the Expanded (240 px) / Collapsed (56 px) state and automatically
 * injects the `isCollapsed` flag into all `NavElement` children via React context —
 * consumers do not need to forward it manually.
 *
 * ### Sizing
 * | State     | Width   | Shows labels |
 * |-----------|---------|--------------|
 * | Expanded  | 240 px  | Yes          |
 * | Collapsed | 56 px   | No (icon only) |
 *
 * ### Shadows (Figma spec)
 * | State     | Shadow |
 * |-----------|--------|
 * | Expanded  | `4px 0 15px rgba(0,0,0,0.11)` |
 * | Collapsed | `4px 0 7.5px rgba(0,0,0,0.11)` |
 *
 * @see NavElement.ai.md · SideBar Context section
 * @see DripDesign.md · Rule 8 · Navigation · SideBar
 * @see Figma node 694:17643 — Design Language System (Claude)
 *
 * @example Controlled sidebar with toggle
 * ```tsx
 * const [state, setState] = React.useState<'Expanded' | 'Collapsed'>('Expanded');
 *
 * <SideBar state={state} onStateChange={setState}>
 *   <NavElement name="Dashboard" showDropdown={false} icon={Home2Bold} style="Selected" />
 *   <NavElement name="Invoices" showDropdown={false} icon={MoneySendBold} />
 *   <NavElement name="Payments" icon={MoneyReciveBold} showDropdown>
 *     <BaseNav name="Monthly" />
 *     <BaseNav name="Quarterly" property1="Selected" />
 *   </NavElement>
 * </SideBar>
 * ```
 */
export interface SideBarProps extends BaseComponentProps {
  /**
   * Controls the sidebar width and NavElement display mode.
   * - `Expanded` — 240 px; full icon + label view.
   * - `Collapsed` — 56 px; icon-only view (label and dropdown arrow hidden).
   * @default 'Expanded'
   */
  state?: 'Expanded' | 'Collapsed';

  /**
   * `NavElement` items (and any other allowed sidebar content).
   * Each `NavElement` child automatically receives the collapsed flag
   * from SideBar's React context — no manual prop forwarding needed.
   */
  children?: ReactNode;

  /**
   * Fired when the consumer triggers a state change (e.g., from a toggle button
   * rendered alongside this component). Receives the **next** state value.
   * The parent must update the `state` prop to reflect the change (controlled).
   */
  onStateChange?: (nextState: 'Expanded' | 'Collapsed') => void;
}

/**
 * Shape of the SideBar React context.
 * Consumed by `NavElement` children to detect collapsed mode.
 * @internal
 */
export interface SideBarContextValue {
  /** True when the SideBar is in Collapsed (56 px) mode. */
  isCollapsed: boolean;
}

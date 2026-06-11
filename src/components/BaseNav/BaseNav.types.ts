/**
 * BaseNav — public TypeScript types.
 *
 * Source spec: NavElement.ai.md · "BaseNav (Subsection Item)" section.
 * Figma: https://www.figma.com/design/P52nmDshYaKr963q1zBwQj · node 694:17486
 */

import type { BaseComponentProps, InteractiveEventHandlers } from '../shared/types';

/**
 * Props for the **BaseNav** component.
 *
 * `BaseNav` is the subsection row rendered inside a `NavElement` that has
 * `showDropdown={true}` and `style="Selected"`. It represents a sub-destination
 * within a section.
 *
 * ### Constraints (NavElement.ai.md)
 * - Only render `BaseNav` inside a `NavElement` with `showDropdown={true}` and `style="Selected"`.
 * - Only **one** `BaseNav` should have `property1="Selected"` within an expanded NavElement.
 * - Text uses `color/text/subdued` (`#4b4b4b`) — NOT `color/text/primary`.
 * - `property1="Hover"` is CSS-driven — **never** set it explicitly in code.
 *
 * @see NavElement.ai.md · BaseNav section
 * @see Figma node 694:17486 — Design Language System (Claude)
 *
 * @example Inside an expanded NavElement
 * ```tsx
 * <NavElement style="Selected" showDropdown name="Payments" icon={HomeIcon}>
 *   <BaseNav property1="Default" name="Monthly" />
 *   <BaseNav property1="Selected" name="Quarterly" aria-current="page" />
 *   <BaseNav property1="Default" name="Annual" />
 * </NavElement>
 * ```
 */
export interface BaseNavProps
  extends BaseComponentProps,
    InteractiveEventHandlers<HTMLButtonElement> {
  /**
   * Visual state of the subsection row.
   * - `Default` — idle; this is not the current sub-route. Transparent background, regular weight.
   * - `Selected` — active; this IS the current sub-route. `color/surface/3` background + bold 12 px label.
   *
   * **Do NOT set `"Hover"` in code** — hover is handled by CSS `:hover`. The Hover
   * state only exists in Figma for design documentation.
   * @default 'Default'
   */
  property1?: 'Default' | 'Selected';

  /**
   * The subsection label text. Always use the real sub-destination name.
   * @default 'SubSection'
   */
  name?: string;

  /**
   * Optional navigation target. When supplied the item renders as an `<a>` tag;
   * otherwise it renders as a `<button>`.
   */
  href?: string;
}

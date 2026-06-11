/**
 * Grid.types.ts
 * Exported TypeScript prop types for the Grid visualisation component.
 *
 * Figma: Design Language System (Claude) — node 1922:12350
 */

export type GridBreakpoint =
  | 'Mobile'
  | 'Tablet'
  | 'Desktop-S-No-Nav'
  | 'Desktop-S-Expanded'
  | 'Desktop-S-Collapsed'
  | 'Desktop-L-No-Nav'
  | 'Desktop-L-Expanded'
  | 'Desktop-L-Collapsed';

export interface GridProps {
  /**
   * Which breakpoint grid specification to visualise.
   * @default 'Mobile'
   */
  breakpoint?: GridBreakpoint;

  /**
   * Override the rendered viewport frame width in px.
   * Useful for the resizable interactive playground — the label inside the
   * ruler reflects this value rather than the canonical spec viewport width.
   * When omitted the component renders at the breakpoint's canonical width.
   */
  viewportWidth?: number;

  /**
   * Called when the user clicks the nav sidebar in a desktop breakpoint.
   * Use this to toggle between the Expanded / Collapsed nav state.
   * When provided the sidebar renders with `cursor: pointer` and a hover state.
   */
  onNavToggle?: () => void;

  /** Additional CSS class names to merge onto the root element. */
  className?: string;

  /** Root element id. */
  id?: string;

  /** `data-testid` attribute for automated tests. */
  dataTestId?: string;
}

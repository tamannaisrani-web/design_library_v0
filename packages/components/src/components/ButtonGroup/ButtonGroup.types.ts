/**
 * ButtonGroup — public TypeScript types.
 * Source: ButtonGroup.stories.mdx + dcds-registry.json (id: button-group, figmaNode 477:86124)
 * + Figma screenshot reference.
 *
 * The group is a layout primitive that pairs related action buttons with a
 * consistent horizontal gap. It does NOT merge children into a shared
 * container — each child keeps its own border-radius and border. Children
 * are free-form: typically two `Button`s for the Default style, or a
 * `LinkButton` + `Button` for the Link style.
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/**
 * Style axis. Drives only the semantic intent (and the gap token, in case
 * future versions want different spacing per style). Children determine the
 * actual visuals.
 */
export type ButtonGroupStyle = 'Default' | 'Link';

/**
 * Props for the ButtonGroup component.
 *
 * @example Default — Secondary + Primary pair
 * ```tsx
 * <ButtonGroup ariaLabel="Save or discard changes">
 *   <Button variant="Secondary">Cancel</Button>
 *   <Button variant="Primary">Save</Button>
 * </ButtonGroup>
 * ```
 *
 * @example Link — LinkButton + Button pair
 * ```tsx
 * <ButtonGroup Style="Link" ariaLabel="Learn more or get started">
 *   <LinkButton href="/docs">Learn more</LinkButton>
 *   <Button variant="Primary">Get started</Button>
 * </ButtonGroup>
 * ```
 */
export interface ButtonGroupProps extends BaseComponentProps {
  /**
   * Style axis (semantic intent).
   * - `Default` — paired action Buttons (e.g. Secondary + Primary)
   * - `Link` — LinkButton paired with a Button
   * @default 'Default'
   */
  Style?: ButtonGroupStyle;

  /** Convenience flag matching the Figma `isLink` variant prop. */
  isLink?: boolean;

  /**
   * When true, stacks children vertically (useful in narrow viewports).
   * @default false
   */
  isStacked?: boolean;

  /**
   * ARIA label describing the group's purpose (recommended).
   * Examples: "Confirm or cancel", "Primary actions".
   */
  ariaLabel?: string;

  /** Two or more related Button / LinkButton children. */
  children?: ReactNode;
}

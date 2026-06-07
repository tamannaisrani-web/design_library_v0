/**
 * Shared types used across multiple components in the Buttons family.
 */

import type { ReactNode } from 'react';
import type React from 'react';

/**
 * Props accepted by every icon component in `icons/src/linear/` and `icons/src/bold/`.
 * Matches the local `IconProps` interface defined inside each generated icon file.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Type for any icon from the repo's `icons/src/` directory.
 *
 * Pass the **component class** — not a pre-rendered element.
 * The receiving component renders it at the correct size internally.
 *
 * @example
 * ```tsx
 * import { GalleryLinear } from '../../../icons/src/linear/GalleryLinear';
 * <Accordian leadingIcon={GalleryLinear} showLeading />
 *
 * import { DocumentLinear } from '../../../icons/src/linear/DocumentLinear';
 * <Tabs tabs={[{ label: 'Docs', leading: { icon: DocumentLinear } }]} />
 *
 * import { InfoCircleLinear } from '../../../icons/src/linear/InfoCircleLinear';
 * <ModalHeader icon={InfoCircleLinear}>Title</ModalHeader>
 * ```
 */
export type IconComponent = React.ComponentType<IconComponentProps>;

/**
 * Common props every component accepts.
 * `className` is intentionally limited — never use it to override component
 * colour or border tokens. Use it only for layout (margin/grid placement).
 */
export interface BaseComponentProps {
  /** Optional className for layout-only overrides. Do NOT override colour or borders. */
  className?: string;
  /** Optional id, useful for label `htmlFor` association. */
  id?: string;
  /** Test id (rendered as `data-testid`) for use in unit/e2e tests. */
  dataTestId?: string;
}

/**
 * Generic event-handler bundle attached to interactive components.
 * Every action is surfaced so consumers can hook in analytics, validation,
 * focus management, keyboard shortcuts, etc.
 */
export interface InteractiveEventHandlers<E extends HTMLElement = HTMLButtonElement> {
  onClick?: React.MouseEventHandler<E>;
  onFocus?: React.FocusEventHandler<E>;
  onBlur?: React.FocusEventHandler<E>;
  onMouseEnter?: React.MouseEventHandler<E>;
  onMouseLeave?: React.MouseEventHandler<E>;
  onKeyDown?: React.KeyboardEventHandler<E>;
  onKeyUp?: React.KeyboardEventHandler<E>;
}

/**
 * Children prop with helpful narrowing.
 */
export interface ChildrenProps {
  children?: ReactNode;
}

/** Size axis shared across action components. */
export type ActionSize = 'L' | 'M' | 'S' | 'XS';

/** Variant axis shared across Button-family components. */
export type ActionVariant = 'Primary' | 'Secondary' | 'Tertiary';

/** Semantic colour axis. Error = irreversible / destructive. Warning = reversible caution. */
export type ActionColor = 'Primary' | 'Error' | 'Warning';

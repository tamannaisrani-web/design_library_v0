import type { ReactNode } from 'react';
import type { BaseComponentProps, IconComponent } from '../shared/types';
import type { BadgeState, BadgeEmphasis, BadgeSize } from '../Badge/Badge.types';
import type { ActionVariant, ActionColor, ActionSize } from '../shared/types';

export type { IconComponent };

/**
 * Visual state of the Accordian panel.
 * - `'open'`  — panel is expanded, content visible, chevron rotated 180°
 * - `'close'` — panel is collapsed, content hidden
 *
 * The hover state is CSS-driven — never set it programmatically.
 */
export type AccordianState = 'open' | 'close';

/**
 * Configuration for the Badge status chip in the header trailing area.
 * Rendered when `showStatus={true}`.
 *
 * @see Badge component at `src/components/Badge`
 */
export interface AccordianStatusConfig {
  /** Label text shown inside the badge. @default `'Status'` */
  label?: string;
  /** Semantic colour role driving background, border, and text. @default `'neutral'` */
  state?: BadgeState;
  /** Visual emphasis level. @default `'subtle'` */
  emphasis?: BadgeEmphasis;
  /** Badge size token. @default `'S'` (per Figma spec — 24 px height) */
  size?: BadgeSize;
  /** Show the leading state icon inside the badge. @default `false` (per Figma spec) */
  showIcon?: boolean;
  /** Accessible label for screen readers when badge text alone is insufficient. */
  'aria-label'?: string;
}

/**
 * Configuration for the Button action slot in the header trailing area.
 * Rendered when `showAction={true}`.
 *
 * @see Button component at `src/components/Button`
 */
export interface AccordianActionConfig {
  /** Button label text. @default `'Button'` */
  label?: string;
  /** Visual weight variant. @default `'Secondary'` (per Figma spec) */
  variant?: ActionVariant;
  /** Semantic colour role. @default `'Primary'` */
  color?: ActionColor;
  /** Height token. @default `'S'` (32 px, per Figma spec) */
  size?: ActionSize;
  /** Whether the button is non-interactive. @default `false` */
  isDisabled?: boolean;
  /** Icon rendered before the label (auto-sized to button scale). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label (auto-sized to button scale). */
  trailingIcon?: ReactNode;
  /** Click handler fired when the action button is pressed. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Focus handler on the action button. */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  /** Blur handler on the action button. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

/**
 * Props for the public `Accordian` component.
 *
 * **DCDS rules (from Accordian.ai.md + Figma node 443:547):**
 * - Spelling is `Accordian` (with an 'a') — match exactly when importing.
 * - `isRounded=true` → card-like standalone item, `rd-S` (8 px) corners.
 * - `isRounded=false` → flat full-bleed, for list-style groups sharing borders.
 * - Multiple items can be open simultaneously — manage exclusivity externally.
 * - Chevron must always rotate 180° on open — do not suppress the animation.
 * - `hover` state is CSS-driven; never set it via the `state` prop.
 * - `Badge` and `Button` subcomponents come from `src/components`.
 *
 * @example Basic controlled accordion
 * ```tsx
 * import { Accordian } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Accordian
 *   state={open ? 'open' : 'close'}
 *   isRounded={true}
 *   title="What documents are required?"
 *   subtitle="Loan application checklist"
 *   onToggle={setOpen}
 * >
 *   <p>PAN card, Aadhaar, last 3 months' bank statements.</p>
 * </Accordian>
 * ```
 *
 * @example With status badge and action button
 * ```tsx
 * <Accordian
 *   state={open ? 'open' : 'close'}
 *   title="Repayment schedule"
 *   showStatus={true}
 *   statusConfig={{ label: 'Active', state: 'success' }}
 *   showAction={true}
 *   actionConfig={{ label: 'View', onClick: handleView }}
 *   onToggle={setOpen}
 * >
 *   ...
 * </Accordian>
 * ```
 *
 * @example Minimal — title only, all optional slots hidden
 * ```tsx
 * <Accordian
 *   state="close"
 *   title="Terms and conditions"
 *   showSubtitle={false}
 *   showLeading={false}
 *   showStatus={false}
 *   showAction={false}
 *   onToggle={(isOpen) => setOpen(isOpen)}
 * >
 *   ...
 * </Accordian>
 * ```
 */
export interface AccordianProps extends BaseComponentProps {
  /**
   * Panel state.
   * - `'open'`  — expanded, chevron rotated 180°
   * - `'close'` — collapsed
   * @default 'close'
   */
  state?: AccordianState;

  /**
   * When `true`, applies `rd-S` (8 px) rounded corners for card-like standalone items.
   * When `false`, no rounding — use for flat full-bleed list-style items sharing borders.
   * @default false
   */
  isRounded?: boolean;

  /** Primary heading text rendered in the header. */
  title?: string;

  /** Secondary text below the title (`color/text/subdued`). */
  subtitle?: string;

  /**
   * Show the 32×32 leading icon slot. Provide an icon via `leadingIcon`.
   * The slot is hidden if `leadingIcon` is not provided, even when `true`.
   * @default true
   */
  showLeading?: boolean;

  /**
   * Show the title line.
   * @default true
   */
  showTitle?: boolean;

  /**
   * Show the subtitle line.
   * @default true
   */
  showSubtitle?: boolean;

  /**
   * Show the `Badge` status chip in the header trailing area.
   * Configure via `statusConfig`.
   * @default true
   */
  showStatus?: boolean;

  /**
   * Show the `Button` action in the header trailing area.
   * Configure via `actionConfig`.
   * @default true
   */
  showAction?: boolean;

  /**
   * Icon component to render in the 24×24 leading slot (rendered at 16 px internally).
   * Pass the component class from `icons/src/linear/` — **not** a rendered element.
   *
   * Only visible when `showLeading={true}` and a component is provided.
   *
   * @example
   * ```tsx
   * import { GalleryLinear } from '../../../icons/src/linear/GalleryLinear';
   * <Accordian leadingIcon={GalleryLinear} showLeading />
   * ```
   */
  leadingIcon?: IconComponent;

  /**
   * Configuration object for the `Badge` status chip.
   * Only active when `showStatus={true}`.
   * Defaults: `{ size: 'S', emphasis: 'subtle', showIcon: false, state: 'neutral' }`.
   */
  statusConfig?: AccordianStatusConfig;

  /**
   * Configuration object for the `Button` action slot.
   * Only active when `showAction={true}`.
   * Defaults: `{ variant: 'Secondary', color: 'Primary', size: 'S' }`.
   */
  actionConfig?: AccordianActionConfig;

  /**
   * Content rendered in the expanded body panel.
   * Only visible when `state='open'`.
   */
  children?: ReactNode;

  /**
   * Fired when the header toggle is clicked.
   * Receives `true` when the user requests open, `false` for close.
   * The parent must update the `state` prop to reflect the change (controlled).
   */
  onToggle?: (isOpen: boolean) => void;

  /** Click handler on the header `<button>`. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** Focus handler on the header `<button>`. */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /** Blur handler on the header `<button>`. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /** Key-down handler on the header `<button>`. */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  /** Key-up handler on the header `<button>`. */
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;

  /** Mouse-enter handler on the header `<button>`. */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  /** Mouse-leave handler on the header `<button>`. */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * @internal
 * Props for the `_AccordianLeading` internal sub-component.
 * Not exported — controlled via `AccordianProps.leadingIcon` + `showLeading`.
 */
export interface _AccordianLeadingProps {
  /** Icon component (from `icons/src/linear/`) rendered at 16 px inside the 24×24 container. */
  icon: IconComponent;
}

/**
 * @internal
 * Props for the `_AccordianActions` internal sub-component.
 * Not exported — controlled via `AccordianProps.actionConfig` + `showAction`.
 */
export interface _AccordianActionsProps {
  /** Full resolved action configuration. */
  config: Required<Pick<AccordianActionConfig, 'label' | 'variant' | 'color' | 'size' | 'isDisabled'>> &
    Pick<AccordianActionConfig, 'leadingIcon' | 'trailingIcon' | 'onClick' | 'onFocus' | 'onBlur'>;
}

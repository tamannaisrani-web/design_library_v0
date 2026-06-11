import type { ReactNode } from 'react';
import type { BaseComponentProps, IconComponent } from '../shared/types';

/** Variant matching Figma Property1: Partial Drawer | Full Drawer */
export type DrawerVariant = 'Partial' | 'Full';

/**
 * @internal
 * Context value passed from `Drawer` down to `DrawerHeader`, `DrawerBody`, and `DrawerFooter`.
 */
export interface DrawerContextValue {
  /** Auto-generated id for the heading element — wired to `aria-labelledby` on the dialog. */
  headerId: string;
  /** Auto-generated id for the body element — wired to `aria-describedby` on the dialog. */
  bodyId: string;
  /** `onClose` forwarded from `Drawer` so `DrawerHeader` can wire the X button automatically. */
  onClose?: () => void;
}

/**
 * Props for the public `Drawer` component.
 *
 * `Drawer` is a **non-blocking side panel** that slides in from the right edge of the viewport.
 * Use it for record detail views, edit forms, filter panels, and document previews — contexts
 * where the user may need to reference the underlying page while the panel is open.
 *
 * **DCDS rules (from Drawer.ai.md):**
 * - Use `'Partial'` for desktop detail views and filters — user sees the page behind the panel.
 * - Use `'Full'` sparingly — only for mobile viewports or very complex multi-field forms.
 * - Always include `DrawerHeader` — it renders the required close (X) button.
 * - `DrawerFooter`: Cancel (Secondary) left, primary action right.
 * - Never use Drawer for destructive confirmations — use `Modal`.
 * - Backdrop is `color/overlay/25` (lighter than Modal's 50%).
 *
 * @example Partial Drawer — record detail view
 * ```tsx
 * import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Drawer isOpen={open} onClose={() => setOpen(false)} variant="Partial">
 *   <DrawerHeader>Loan #1042</DrawerHeader>
 *   <DrawerBody>{/* loan details *‌/}</DrawerBody>
 *   <DrawerFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary">Save changes</Button>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 *
 * @example Full Drawer — complex edit form
 * ```tsx
 * <Drawer isOpen={open} onClose={() => setOpen(false)} variant="Full">
 *   <DrawerHeader>Edit customer profile</DrawerHeader>
 *   <DrawerBody>{/* long form *‌/}</DrawerBody>
 *   <DrawerFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary" type="submit">Save</Button>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 */
export interface DrawerProps extends BaseComponentProps {
  /** Controls whether the drawer is rendered and visible. */
  isOpen: boolean;

  /**
   * Panel variant.
   * - `'Partial'` — ~45 % viewport width. User sees the underlying page. Default.
   * - `'Full'` — 100 % viewport width. Mobile or very complex multi-field forms.
   * @default 'Partial'
   */
  variant?: DrawerVariant;

  /**
   * Fired when the drawer should close (X button, backdrop click, or Escape key).
   * The parent is responsible for setting `isOpen` to `false`.
   */
  onClose?: () => void;

  /**
   * Allow clicking the backdrop to close the drawer.
   * Defaults to `true` for `Partial` (user expects click-away), `false` for `Full`.
   * Set explicitly to override.
   */
  closeOnBackdrop?: boolean;

  /**
   * Allow pressing Escape to close the drawer.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Drawer content. Compose with `DrawerHeader`, `DrawerBody`, and `DrawerFooter`.
   * Always include `DrawerHeader` — it renders the required close (X) button.
   */
  children: ReactNode;
}

/**
 * Props for the `DrawerHeader` sub-component.
 *
 * Renders the drawer title (`Desktop/Heading/H3 - Bold`, `color/text/primary`) and a close (X)
 * button (`color/Icon/subdued`). The close handler is inherited from the parent `Drawer` via
 * context — pass `onClose` here only to override it explicitly.
 *
 * @example
 * ```tsx
 * <DrawerHeader>Loan #1042</DrawerHeader>
 * ```
 *
 * @example With subtitle and icon
 * ```tsx
 * import { InfoCircleLinear } from '../../../icons/src/linear/InfoCircleLinear';
 * <DrawerHeader icon={InfoCircleLinear} subtitle="Review details before saving">
 *   Loan #1042
 * </DrawerHeader>
 * ```
 */
export interface DrawerHeaderProps {
  /** Header title content. */
  children: ReactNode;

  /**
   * Optional leading icon placed before the title.
   * Pass the component class from `icons/src/linear/` — rendered at 20 px internally.
   *
   * @example
   * ```tsx
   * import { DocumentLinear } from '../../../icons/src/linear/DocumentLinear';
   * <DrawerHeader icon={DocumentLinear}>Document preview</DrawerHeader>
   * ```
   */
  icon?: IconComponent;

  /**
   * Optional subtitle rendered below the title in a smaller, subdued style.
   */
  subtitle?: ReactNode;

  /**
   * Optional element placed before the close button (e.g., a `Badge` or `Tag`).
   */
  badge?: ReactNode;

  /**
   * Override the close handler from `Drawer` context.
   * Prefer letting `Drawer` provide it automatically.
   */
  onClose?: () => void;

  /**
   * `id` for the heading element.
   * Auto-set by `Drawer` for `aria-labelledby` — omit unless you need a custom id.
   */
  id?: string;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

/**
 * Props for the `DrawerBody` sub-component.
 *
 * Scrollable content area between the header and footer.
 * Text uses `Desktop/Body/Body - Regular` (16 px) and `color/text/primary`.
 *
 * @example No padding (full-bleed content)
 * ```tsx
 * <DrawerBody padding={false}>
 *   <img src={previewUrl} style={{ width: '100%' }} />
 * </DrawerBody>
 * ```
 */
export interface DrawerBodyProps {
  /** Body content. */
  children: ReactNode;

  /**
   * Whether to apply the standard inner padding (`var(--gap-24)`).
   * Set to `false` for full-bleed content (images, tables, maps).
   * @default true
   */
  padding?: boolean;

  /**
   * `id` for the body container.
   * Auto-set by `Drawer` for `aria-describedby` — omit unless you need a custom id.
   */
  id?: string;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

/**
 * Props for the `DrawerFooter` sub-component.
 *
 * Action area at the bottom of the drawer.
 * **Always place Cancel (Secondary) first (left) and the primary action last (right).**
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button variant="Secondary" onClick={onClose}>Cancel</Button>
 *   <Button variant="Primary">Save changes</Button>
 * </DrawerFooter>
 * ```
 */
export interface DrawerFooterProps {
  /** Action buttons — typically Cancel + primary `Button` components. */
  children: ReactNode;

  /**
   * Optional tertiary element placed on the left side of the footer (e.g., "Learn more").
   */
  link?: ReactNode;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

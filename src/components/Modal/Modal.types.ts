import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../shared/types';

/** Size variant matching Figma Property1: S | M | L */
export type ModalSize = 'S' | 'M' | 'L';

/**
 * @internal
 * Context value passed from `Modal` down to `ModalHeader`, `ModalBody`, and `ModalFooter`.
 */
export interface ModalContextValue {
  /** Auto-generated id for the heading element — wired to `aria-labelledby` on the dialog. */
  headerId: string;
  /** Auto-generated id for the body element — wired to `aria-describedby` on the dialog. */
  bodyId: string;
  /** `onClose` forwarded from `Modal` so `ModalHeader` can wire the X button automatically. */
  onClose?: () => void;
}

/**
 * Props for the public `Modal` component.
 *
 * `Modal` is for **focused, blocking interactions** that require user attention before
 * returning to the main flow. Three sizes cover the range from simple confirmations
 * to complex forms.
 *
 * **DCDS rules (from Modal.ai.md):**
 * - Use `S` for confirmations and simple prompts (≤ 2 fields).
 * - Use `M` for standard forms and detail views (3–5 fields).
 * - Use `L` for complex forms and data-heavy content (> 5 fields / tables).
 * - Always include `ModalHeader` — it renders the required close (X) button.
 * - `ModalFooter`: Cancel left, primary action right.
 * - Destructive: `Button color="Error"` for confirm, `variant="Secondary"` for cancel.
 * - Never stack two Modals — only one modal at a time.
 * - Use `Drawer` for non-blocking side panels; `Alert` for inline confirmations.
 *
 * @example Destructive confirmation (S)
 * ```tsx
 * import { Modal, ModalHeader, ModalBody, ModalFooter } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="S">
 *   <ModalHeader>Delete loan record?</ModalHeader>
 *   <ModalBody>
 *     This will permanently delete Loan #1042. This action cannot be undone.
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="Secondary" color="Primary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary" color="Error" onClick={handleDelete}>Delete</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 *
 * @example Short form (M)
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="M">
 *   <ModalHeader>Add new customer</ModalHeader>
 *   <ModalBody>
 *     <InputFields Type="Default" label="Full name" name="name" />
 *     <InputFields Type="Default" label="Email" name="email" />
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary" type="submit">Add customer</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 *
 * @example Large content (L)
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="L">
 *   <ModalHeader>Loan details</ModalHeader>
 *   <ModalBody>{/* table or complex content *‌/}</ModalBody>
 *   <ModalFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Close</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
export interface ModalProps extends BaseComponentProps {
  /** Controls whether the modal is rendered and visible. */
  isOpen: boolean;

  /**
   * Width variant.
   * - `'S'` — ~400 px. Confirmations and simple prompts.
   * - `'M'` — ~560 px. Standard forms and detail views.
   * - `'L'` — ~720 px. Complex forms and data-heavy content.
   * @default 'M'
   */
  size?: ModalSize;

  /**
   * Fired when the modal should close (X button, backdrop click, or Escape key).
   * The parent is responsible for setting `isOpen` to `false`.
   */
  onClose?: () => void;

  /**
   * Allow clicking the backdrop to close the modal.
   * Set to `false` for critical / destructive flows.
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Allow pressing Escape to close the modal.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Modal content. Compose with `ModalHeader`, `ModalBody`, and `ModalFooter`.
   * Always include `ModalHeader` — it renders the required close (X) button.
   */
  children: ReactNode;
}

/**
 * Props for the `ModalHeader` sub-component.
 *
 * Renders the modal title (H3-Bold, `color/text/primary`) and a close (X) button
 * (`color/Icon/subdued`). The close handler is inherited from the parent `Modal`
 * via context — pass `onClose` here only to override it explicitly.
 *
 * @example With subtitle and badge
 * ```tsx
 * <ModalHeader
 *   subtitle="Review before confirming"
 *   badge={<Tag variant="Warning">Pending</Tag>}
 * >
 *   Approve loan application
 * </ModalHeader>
 * ```
 */
export interface ModalHeaderProps {
  /** Header title content. */
  children: ReactNode;

  /**
   * Optional leading icon placed before the title block.
   * Any icon component or element; sized and coloured by the header layout.
   * Slot — any node can be substituted.
   */
  icon?: ReactNode;

  /**
   * Optional subtitle rendered below the title in a smaller, subdued style.
   * Slot — accepts any node (string, badge, etc.).
   */
  subtitle?: ReactNode;

  /**
   * Optional element placed in the header's right action area, before the close button.
   * Intended for a `Badge` or `Tag` indicating status.
   * Slot — any node can be substituted.
   */
  badge?: ReactNode;

  /**
   * Override the close handler from `Modal` context.
   * Prefer letting `Modal` provide it automatically.
   */
  onClose?: () => void;

  /**
   * `id` for the heading element.
   * Auto-set by `Modal` for `aria-labelledby` — omit unless you need a custom id.
   */
  id?: string;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

/**
 * Props for the `ModalBody` sub-component.
 *
 * Scrollable content area between the header and footer.
 * Text uses `Desktop/Body/Body - Regular` (16 px) and `color/text/primary`.
 *
 * @example No padding (full-bleed content like an image or table)
 * ```tsx
 * <ModalBody padding={false}>
 *   <img src={previewUrl} style={{ width: '100%' }} />
 * </ModalBody>
 * ```
 */
export interface ModalBodyProps {
  /** Body content. Slot — any node can be substituted. */
  children: ReactNode;

  /**
   * Whether to apply the standard inner padding (`var(--gap-24)`).
   * Set to `false` for full-bleed content such as images, maps, or data tables.
   * @default true
   */
  padding?: boolean;

  /**
   * `id` for the body container.
   * Auto-set by `Modal` for `aria-describedby` — omit unless you need a custom id.
   */
  id?: string;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

/**
 * Props for the `ModalFooter` sub-component.
 *
 * Action area at the bottom of the modal.
 * **Always place Cancel first (left) and the primary action last (right).**
 * For destructive actions use `Button color="Error"` for confirm and
 * `variant="Secondary"` for cancel.
 *
 * @example With a tertiary link on the left
 * ```tsx
 * <ModalFooter link={<a href="/docs">Learn more</a>}>
 *   <Button variant="Secondary" onClick={onClose}>Cancel</Button>
 *   <Button variant="Primary">Save</Button>
 * </ModalFooter>
 * ```
 */
export interface ModalFooterProps {
  /** Primary action buttons — typically Cancel + Confirm `Button` components. */
  children: ReactNode;

  /**
   * Optional tertiary action placed on the left side of the footer, opposite the main buttons.
   * Intended for a link or text-only action (e.g. "Learn more", "Reset").
   * Slot — any node can be substituted.
   */
  link?: ReactNode;

  /** Extra `className` for layout-only overrides. */
  className?: string;
}

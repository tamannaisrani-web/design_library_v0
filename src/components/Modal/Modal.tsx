import React, { createContext, useContext, useEffect, useId, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CloseLinear } from '../../../icons/src/linear/CloseLinear';
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalContextValue,
} from './Modal.types';
import './Modal.css';

/* --------------------------------------------------------------------------
   Internal context — wires headerId / bodyId / onClose between Modal and
   its sub-components without requiring consumers to pass IDs manually.
   -------------------------------------------------------------------------- */

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error(
      'ModalHeader, ModalBody, and ModalFooter must be rendered inside a Modal component.',
    );
  }
  return ctx;
}

/* --------------------------------------------------------------------------
   Modal — public component
   -------------------------------------------------------------------------- */

/**
 * `Modal` is used for **focused, blocking interactions** that require user
 * attention before returning to the main flow.
 *
 * Compose with `ModalHeader`, `ModalBody`, and `ModalFooter`:
 *
 * ```tsx
 * import { Modal, ModalHeader, ModalBody, ModalFooter } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="M">
 *   <ModalHeader>Add new customer</ModalHeader>
 *   <ModalBody>…form fields…</ModalBody>
 *   <ModalFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary">Save</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 *
 * **DCDS rules:**
 * - `S` for confirmations (≤ 2 fields), `M` for forms (3–5 fields), `L` for complex content.
 * - Always include `ModalHeader` — it renders the required close (X) button.
 * - Footer: Cancel left, primary action right.
 * - Destructive: `Button color="Error"` for confirm, `variant="Secondary"` for cancel.
 * - Only one modal at a time — never stack.
 * - For non-blocking side panels use `Drawer`; for inline confirmations use `Alert`.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  size = 'M',
  onClose,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  className,
  id,
  dataTestId,
}) => {
  const instanceId = useId();
  const headerId = `dcds-modal-header-${instanceId}`;
  const bodyId = `dcds-modal-body-${instanceId}`;
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Prevent body scroll while the modal is open */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* Focus trap + Escape key handler */
  useEffect(() => {
    if (!isOpen) return;
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        dialogEl.querySelectorAll<HTMLElement>(
          'button:not(:disabled),[href],input:not(:disabled),select:not(:disabled),' +
            'textarea:not(:disabled),[tabindex]:not([tabindex="-1"])',
        ),
      );

    const prevFocused = document.activeElement as HTMLElement | null;

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      dialogEl.focus();
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const els = getFocusable();
        if (els.length === 0) {
          e.preventDefault();
          return;
        }
        const first = els[0];
        const last = els[els.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus();
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const dialogClass = [
    'dcds-Modal__dialog',
    `dcds-Modal__dialog--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ headerId, bodyId, onClose }}>
      <div className="dcds-Modal__overlay" onClick={handleOverlayClick}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headerId}
          aria-describedby={bodyId}
          id={id}
          data-testid={dataTestId}
          className={dialogClass}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
};

/* --------------------------------------------------------------------------
   ModalHeader
   -------------------------------------------------------------------------- */

/**
 * Header sub-component for `Modal`.
 *
 * Renders the modal title (`Desktop/Heading/H3 - Bold`, `color/text/primary`)
 * and a close (X) button (`color/Icon/subdued`). The close handler is inherited
 * from the parent `Modal` via context — pass `onClose` only to override explicitly.
 *
 * The DCDS spec requires a close button in every modal header.
 *
 * @example
 * ```tsx
 * <ModalHeader>Delete loan record?</ModalHeader>
 * ```
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  icon,
  subtitle,
  badge,
  onClose: onCloseProp,
  id: idProp,
  className,
}) => {
  const { headerId, onClose: ctxClose } = useModalContext();
  const closeHandler = onCloseProp ?? ctxClose;

  return (
    <div className={['dcds-Modal__header', className].filter(Boolean).join(' ')}>
      <div className="dcds-Modal__header-left">
        {icon && <span className="dcds-Modal__header-icon"><icon size={18} /></span>}
        <div className="dcds-Modal__header-text">
          <h2 id={idProp ?? headerId} className="dcds-Modal__header-title">
            {children}
          </h2>
          {subtitle && <p className="dcds-Modal__header-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="dcds-Modal__header-end">
        {badge && <span className="dcds-Modal__header-badge">{badge}</span>}
        {closeHandler && (
          <button
            type="button"
            className="dcds-Modal__close-btn"
            aria-label="Close modal"
            onClick={closeHandler}
          >
            <CloseLinear size={20} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   ModalBody
   -------------------------------------------------------------------------- */

/**
 * Scrollable body area for `Modal`.
 *
 * Sits between `ModalHeader` and `ModalFooter`. Text inherits
 * `Desktop/Body/Body - Regular` (16 px) and `color/text/primary`.
 *
 * @example
 * ```tsx
 * <ModalBody>
 *   This will permanently delete Loan #1042 and all associated data.
 *   This action cannot be undone.
 * </ModalBody>
 * ```
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  padding = true,
  id: idProp,
  className,
}) => {
  const { bodyId } = useModalContext();
  return (
    <div
      id={idProp ?? bodyId}
      className={[
        'dcds-Modal__body',
        !padding && 'dcds-Modal__body--no-padding',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};

/* --------------------------------------------------------------------------
   ModalFooter
   -------------------------------------------------------------------------- */

/**
 * Footer action area for `Modal`.
 *
 * **Always place Cancel first (left) and the primary action last (right).**
 * For destructive actions: `Button color="Error"` for confirm,
 * `variant="Secondary"` for cancel.
 *
 * @example
 * ```tsx
 * <ModalFooter>
 *   <Button variant="Secondary" onClick={onClose}>Cancel</Button>
 *   <Button variant="Primary">Save</Button>
 * </ModalFooter>
 * ```
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  link,
  className,
}) => (
  <div className={['dcds-Modal__footer', className].filter(Boolean).join(' ')}>
    {link && <span className="dcds-Modal__footer-link">{link}</span>}
    <div className="dcds-Modal__footer-actions">{children}</div>
  </div>
);

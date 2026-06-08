import React, { createContext, useContext, useEffect, useId, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CloseLinear } from '../../../icons/src/linear/CloseLinear';
import type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerContextValue,
} from './Drawer.types';
import './Drawer.css';

/* --------------------------------------------------------------------------
   Internal context — wires headerId / bodyId / onClose between Drawer and
   its sub-components without requiring consumers to pass IDs manually.
   -------------------------------------------------------------------------- */

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(
      'DrawerHeader, DrawerBody, and DrawerFooter must be rendered inside a Drawer component.',
    );
  }
  return ctx;
}

/* --------------------------------------------------------------------------
   Drawer — public component
   -------------------------------------------------------------------------- */

/**
 * `Drawer` is a **non-blocking side panel** that slides in from the right edge of the viewport.
 *
 * Use for record detail views, edit forms, filter panels, and document previews — contexts
 * where the user may need to see the underlying page while the panel is open.
 *
 * Compose with `DrawerHeader`, `DrawerBody`, and `DrawerFooter`:
 *
 * ```tsx
 * import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 *
 * <Drawer isOpen={open} onClose={() => setOpen(false)} variant="Partial">
 *   <DrawerHeader>Loan #1042</DrawerHeader>
 *   <DrawerBody>…details…</DrawerBody>
 *   <DrawerFooter>
 *     <Button variant="Secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="Primary">Save changes</Button>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 *
 * **DCDS rules:**
 * - Backdrop uses `color/overlay/25` — lighter than Modal's 50% so the page stays visible.
 * - Always include `DrawerHeader` — it renders the required close (X) button.
 * - Partial Drawer dismisses on backdrop click; Full Drawer does not by default.
 * - Footer: Cancel (Secondary) left, primary action right.
 * - Never use Drawer for destructive confirmations — use `Modal`.
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  variant = 'Partial',
  onClose,
  closeOnBackdrop,
  closeOnEscape = true,
  children,
  className,
  id,
  dataTestId,
}) => {
  const instanceId = useId();
  const headerId = `dcds-drawer-header-${instanceId}`;
  const bodyId = `dcds-drawer-body-${instanceId}`;
  const panelRef = useRef<HTMLDivElement>(null);

  /* Partial Drawer closes on backdrop click by default; Full does not */
  const resolvedCloseOnBackdrop = closeOnBackdrop ?? variant === 'Partial';

  /* Prevent body scroll while the drawer is open */
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
    const panelEl = panelRef.current;
    if (!panelEl) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        panelEl.querySelectorAll<HTMLElement>(
          'button:not(:disabled),[href],input:not(:disabled),select:not(:disabled),' +
            'textarea:not(:disabled),[tabindex]:not([tabindex="-1"])',
        ),
      );

    const prevFocused = document.activeElement as HTMLElement | null;

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      panelEl.focus();
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

  const overlayClass = [
    'dcds-Drawer__overlay',
    variant === 'Full' && 'dcds-Drawer__overlay--full',
  ]
    .filter(Boolean)
    .join(' ');

  const panelClass = [
    'dcds-Drawer__panel',
    variant === 'Partial' ? 'dcds-Drawer__panel--partial' : 'dcds-Drawer__panel--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (resolvedCloseOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return ReactDOM.createPortal(
    <DrawerContext.Provider value={{ headerId, bodyId, onClose }}>
      <div className={overlayClass} onClick={handleOverlayClick}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headerId}
          aria-describedby={bodyId}
          id={id}
          data-testid={dataTestId}
          className={panelClass}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>,
    document.body,
  );
};

/* --------------------------------------------------------------------------
   DrawerHeader
   -------------------------------------------------------------------------- */

/**
 * Header sub-component for `Drawer`.
 *
 * Renders the drawer title (`Desktop/Heading/H3 - Bold`, `color/text/primary`) and a
 * close (X) button (`color/Icon/subdued`). The close handler is inherited from the parent
 * `Drawer` via context — pass `onClose` only to override explicitly.
 *
 * The DCDS spec requires a close button in every drawer header.
 *
 * @example
 * ```tsx
 * <DrawerHeader>Loan #1042</DrawerHeader>
 * ```
 */
export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  icon: IconComponent,
  subtitle,
  badge,
  onClose: onCloseProp,
  id: idProp,
  className,
}) => {
  const { headerId, onClose: ctxClose } = useDrawerContext();
  const closeHandler = onCloseProp ?? ctxClose;

  return (
    <div className={['dcds-Drawer__header', className].filter(Boolean).join(' ')}>
      <div className="dcds-Drawer__header-left">
        {IconComponent && (
          <span className="dcds-Drawer__header-icon">
            <IconComponent size={20} aria-hidden />
          </span>
        )}
        <div className="dcds-Drawer__header-text">
          <h2 id={idProp ?? headerId} className="dcds-Drawer__header-title">
            {children}
          </h2>
          {subtitle && <p className="dcds-Drawer__header-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="dcds-Drawer__header-end">
        {badge && <span className="dcds-Drawer__header-badge">{badge}</span>}
        {closeHandler && (
          <button
            type="button"
            className="dcds-Drawer__close-btn"
            aria-label="Close drawer"
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
   DrawerBody
   -------------------------------------------------------------------------- */

/**
 * Scrollable body area for `Drawer`.
 *
 * Sits between `DrawerHeader` and `DrawerFooter`. Text inherits
 * `Desktop/Body/Body - Regular` (16 px) and `color/text/primary`.
 *
 * @example
 * ```tsx
 * <DrawerBody>
 *   <p>Loan amount: $45,000</p>
 * </DrawerBody>
 * ```
 */
export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  padding = true,
  id: idProp,
  className,
}) => {
  const { bodyId } = useDrawerContext();
  return (
    <div
      id={idProp ?? bodyId}
      className={[
        'dcds-Drawer__body',
        !padding && 'dcds-Drawer__body--no-padding',
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
   DrawerFooter
   -------------------------------------------------------------------------- */

/**
 * Footer action area for `Drawer`.
 *
 * **Always place Cancel first (left) and the primary action last (right).**
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button variant="Secondary" onClick={onClose}>Cancel</Button>
 *   <Button variant="Primary">Save changes</Button>
 * </DrawerFooter>
 * ```
 */
export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, link, className }) => (
  <div className={['dcds-Drawer__footer', className].filter(Boolean).join(' ')}>
    {link && <span className="dcds-Drawer__footer-link">{link}</span>}
    <div className="dcds-Drawer__footer-actions">{children}</div>
  </div>
);

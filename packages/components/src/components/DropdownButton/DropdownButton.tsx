import React, { useCallback, useEffect, useId, useRef } from 'react';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';
import { _BaseMenu } from './_BaseMenu';
import type { DropdownButtonProps, DropdownMenuItem } from './DropdownButton.types';
import './DropdownButton.css';

/**
 * **DropdownButton** — button that reveals a `_BaseMenu` of sub-actions.
 *
 * When `isOpen=true`, a floating menu is anchored directly below the button.
 * The menu auto-closes when:
 *   - the user clicks outside the wrapper
 *   - the user presses `Escape`
 *   - the user selects a menu item
 *
 * Pass `menuItems` for structured options, or `menuChildren` for fully
 * custom menu content.
 *
 * @see ai-docs/DropdownButton.ai.md
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <DropdownButton
 *   variant="Primary"
 *   size="M"
 *   isOpen={open}
 *   onToggle={setOpen}
 *   menuItems={[
 *     { id: 'option1', label: 'Option' },
 *     { id: 'option2', label: 'Option' },
 *   ]}
 *   onSelect={(id) => console.log('Selected:', id)}
 * >
 *   Button
 * </DropdownButton>
 * ```
 */
export const DropdownButton: React.FC<DropdownButtonProps> = ({
  variant = 'Secondary',
  state = 'Default',
  size = 'M',
  isOpen = false,
  isDisabled = false,
  menuItems,
  menuChildren,
  onToggle,
  onSelect,
  className,
  id,
  dataTestId,
  children,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}) => {
  const resolvedState: DropdownButtonProps['state'] = isDisabled
    ? 'Disabled'
    : isOpen
    ? 'Open'
    : state;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // --- Close on outside click ---
  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        onToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handlePointer);
    return () => document.removeEventListener('mousedown', handlePointer);
  }, [isOpen, onToggle]);

  // --- Close on Escape ---
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onToggle?.(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onToggle]);

  const handleTriggerClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onToggle?.(!isOpen);
    onClick?.(event);
  };

  const handleMenuSelect = useCallback(
    (item: DropdownMenuItem) => {
      onSelect?.(item.id);
      onToggle?.(false); // auto-close after selection
    },
    [onSelect, onToggle]
  );

  const buttonClasses = [
    'dcds-DropdownButton',
    `dcds-DropdownButton--variant-${variant}`,
    `dcds-DropdownButton--state-${resolvedState}`,
    `dcds-DropdownButton--size-${size}`,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = ['dcds-DropdownButton__wrapper', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={wrapperRef} className={wrapperClasses}>
      <button
        id={id}
        type="button"
        className={buttonClasses}
        disabled={isDisabled || resolvedState === 'Disabled'}
        aria-disabled={isDisabled || undefined}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        data-testid={dataTestId}
        onClick={handleTriggerClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        <span>{children}</span>
        <span className="dcds-DropdownButton__chevron">
          <ChevronDownIcon size={16} />
        </span>
      </button>

      {isOpen && (
        <>
          {menuChildren ? (
            <ul role="menu" id={menuId} className="dcds-DropdownButton__menu">
              {menuChildren}
            </ul>
          ) : (
            <_BaseMenu menuId={menuId} items={menuItems ?? []} onSelect={handleMenuSelect} />
          )}
        </>
      )}
    </div>
  );
};

DropdownButton.displayName = 'DropdownButton';

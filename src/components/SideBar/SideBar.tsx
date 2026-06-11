import React, { useMemo } from 'react';
import type { SideBarProps } from './SideBar.types';
import { SideBarContext } from './SideBar.context';
import './SideBar.css';

/**
 * **SideBar** — vertical navigation container that holds `NavElement` items.
 *
 * Controls the Expanded (240 px) / Collapsed (56 px) state and automatically
 * injects the collapsed flag into all `NavElement` children via React context.
 * Consumers do NOT need to pass `isCollapsed` to each `NavElement` manually.
 *
 * ### Figma spec
 * | State    | Width  | Shadow                                |
 * |----------|--------|---------------------------------------|
 * | Expanded | 240 px | `4px 0 15px rgba(0,0,0,0.11)`         |
 * | Collapsed| 56 px  | `4px 0 7.5px rgba(0,0,0,0.11)`        |
 *
 * Background is always `color/surface/1` (white).
 * Padding is `gap-40` top and bottom, 0 horizontal.
 * Items have a `gap-4` gap between them.
 *
 * @see NavElement.ai.md · SideBar Context section
 * @see DripDesign.md · Rule 8 · Navigation · SideBar
 * @see Figma node 694:17643 (Expanded) · 1937:6590 (Collapsed)
 *
 * @example Controlled sidebar
 * ```tsx
 * import { SideBar, NavElement, BaseNav } from '@dcds/components';
 * import { Home2Bold } from '../icons/src/bold/Home2Bold';
 *
 * const [state, setState] = React.useState<'Expanded' | 'Collapsed'>('Expanded');
 *
 * <SideBar state={state} onStateChange={setState}>
 *   <NavElement name="Dashboard" showDropdown={false} icon={Home2Bold} style="Selected" />
 *   <NavElement name="Invoices" showDropdown={false} icon={MoneySendBold} />
 * </SideBar>
 * ```
 */
export const SideBar: React.FC<SideBarProps> = ({
  state = 'Expanded',
  children,
  className,
  id,
  dataTestId,
  // onStateChange is a consumer-managed callback; SideBar itself is uncontrolled
  // regarding the toggle — the parent drives state via the `state` prop.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStateChange: _onStateChange,
}) => {
  const isCollapsed = state === 'Collapsed';

  /* Memoised context value to avoid needless re-renders of every NavElement */
  const contextValue = useMemo(() => ({ isCollapsed }), [isCollapsed]);

  const classes = [
    'dcds-SideBar',
    isCollapsed ? 'dcds-SideBar--collapsed' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SideBarContext.Provider value={contextValue}>
      <nav
        id={id}
        className={classes}
        aria-label="Primary navigation"
        data-testid={dataTestId}
      >
        {children}
      </nav>
    </SideBarContext.Provider>
  );
};

SideBar.displayName = 'SideBar';

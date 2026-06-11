/**
 * SideBar React context.
 *
 * Provides the collapsed state to all `NavElement` descendants without
 * requiring manual prop forwarding. `NavElement` consumes this context
 * automatically — consumers never interact with it directly.
 *
 * @internal
 */

import { createContext } from 'react';
import type { SideBarContextValue } from './SideBar.types';

/**
 * Default context value — non-collapsed (expanded).
 * Ensures NavElement works correctly even when rendered outside a SideBar.
 */
export const SideBarContext = createContext<SideBarContextValue>({
  isCollapsed: false,
});

SideBarContext.displayName = 'SideBarContext';

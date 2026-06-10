/**
 * DropdownMenu — barrel re-export.
 *
 * Internal sub-components (`_BaseHelpText`, `_BaseTrailng`, `_BaseMenu`,
 * `_BaseMenuItemLeading`) are NOT exported. Per DCDS convention, any name
 * starting with `_Base` is for internal composition only.
 */

export { DropdownMenu } from './DropdownMenu';
export type { DropdownMenuProps, DropdownMenuProperty1, DropdownMenuItem } from './DropdownMenu.types';

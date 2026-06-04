/**
 * Modal component family.
 *
 * Usage:
 * ```ts
 * import { Modal, ModalHeader, ModalBody, ModalFooter } from '@dcds/components';
 * ```
 *
 * `_BaseModal` is intentionally NOT exported — it is for internal composition only.
 * All prop types are re-exported for TypeScript consumers.
 */

export { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from './Modal.types';

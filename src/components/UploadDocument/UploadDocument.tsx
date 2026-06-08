import React from 'react';
import type { UploadDocumentProps } from './UploadDocument.types';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { DeterminateLoader } from '../DeterminateLoader';
import { IndeterminateLoader } from '../IndeterminateLoader';
import './UploadDocument.css';

/**
 * **UploadDocument** — file row shown during and after an upload.
 *
 * Combines a document icon, filename, neutral status Badge, view/delete icon
 * buttons, and an optional progress loader below the row.
 *
 * Use below `UploadDragDrop` or `UploadCTA` to represent each queued or
 * completed file. Wrap multiple rows in `<ul>` / `<li>` for screen-reader
 * list announcement.
 *
 * - `"Determinate"`   → renders **DeterminateLoader** (bar + %) — use when % is known
 * - `"Indeterminate"` → renders **IndeterminateLoader** (scan)   — use when duration unknown
 * - `"Default"`       → no loader
 *
 * Always switch `status` from `"Uploading"` to `"Uploaded"` once
 * the transfer completes.
 *
 * @see DripDesign.md · Rule 8 · Document
 * @see ai-docs/Upload.ai.md
 * @see Figma node 1510:592 — Design Language System (Claude)
 *
 * @example Uploading with known progress (DeterminateLoader)
 * ```tsx
 * <UploadDocument
 *   status="Uploading"
 *   loaderType="Determinate"
 *   documentName="statement_2024.pdf"
 *   progress={62}
 *   onDelete={() => cancelUpload()}
 * />
 * ```
 *
 * @example Uploading with unknown duration (IndeterminateLoader)
 * ```tsx
 * <UploadDocument
 *   status="Uploading"
 *   loaderType="Indeterminate"
 *   documentName="invoice.pdf"
 * />
 * ```
 *
 * @example Upload complete
 * ```tsx
 * <UploadDocument
 *   status="Uploaded"
 *   loaderType="Default"
 *   documentName="statement_2024.pdf"
 *   onView={() => openFile()}
 *   onDelete={() => removeFile()}
 * />
 * ```
 */
export const UploadDocument: React.FC<UploadDocumentProps> = ({
  status = 'Uploading',
  loaderType = 'Determinate',
  documentName = 'Document Name',
  displayStatus = true,
  statusText = 'Status',
  badgeState = 'neutral',
  badgeEmphasis = 'subtle',
  showBadgeIcon = true,
  displayView = true,
  displayDelete = true,
  progress = 0,
  helperText,
  displayHelperText = true,
  displayPercentage = true,
  loaderSize = 'Small',
  onProgressComplete,
  onProgressChange,
  viewButtonState = 'Default',
  deleteButtonState = 'Default',
  isViewDisabled = false,
  isDeleteDisabled = false,
  onView,
  onDelete,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  className,
  id,
  dataTestId,
}) => {
  const isUploading = status === 'Uploading';

  const rootClasses = [
    'dcds-UploadDocument',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  /* Determinate = progress bar (known %), Indeterminate = sweeping scan (unknown duration) */
  const showDeterminate = isUploading && loaderType === 'Determinate';
  const showIndeterminate = isUploading && loaderType === 'Indeterminate';

  return (
    <div
      id={id}
      className={rootClasses}
      data-testid={dataTestId}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── File row ── */}
      <div className="dcds-UploadDocument__row">
        {/* Document icon — vuesax/linear/document-text at 16 px */}
        <span className="dcds-UploadDocument__doc-icon" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h8M8 17h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Filename */}
        <span className="dcds-UploadDocument__name" title={documentName}>
          {documentName}
        </span>

        {/* Actions: badge + icon buttons */}
        <div className="dcds-UploadDocument__actions">
          {displayStatus && (
            <Badge
              size="S"
              emphasis={badgeEmphasis}
              state={badgeState}
              showIcon={showBadgeIcon}
            >
              {statusText}
            </Badge>
          )}

          {displayView && (
            <Button
              variant="Tertiary"
              color="Primary"
              size="XS"
              isIconOnly
              isDisabled={isViewDisabled}
              ariaLabel={`View ${documentName}`}
              onClick={() => onView?.(documentName)}
              leadingIcon={
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z" fill="currentColor" />
                  <path d="M12.0001 21.02C8.24008 21.02 4.69008 18.82 2.25008 15C1.19008 13.35 1.19008 10.66 2.25008 8.99998C4.70008 5.17998 8.25008 2.97998 12.0001 2.97998C15.7501 2.97998 19.3001 5.17998 21.7401 8.99998C22.8001 10.65 22.8001 13.34 21.7401 15C19.3001 18.82 15.7501 21.02 12.0001 21.02ZM12.0001 4.47998C8.77008 4.47998 5.68008 6.41998 3.52008 9.80998C2.77008 10.98 2.77008 13.02 3.52008 14.19C5.68008 17.58 8.77008 19.52 12.0001 19.52C15.2301 19.52 18.3201 17.58 20.4801 14.19C21.2301 13.02 21.2301 10.98 20.4801 9.80998C18.3201 6.41998 15.2301 4.47998 12.0001 4.47998Z" fill="currentColor" />
                </svg>
              }
            />
          )}

          {displayDelete && (
            <Button
              variant="Tertiary"
              color="Error"
              size="XS"
              isIconOnly
              isDisabled={isDeleteDisabled}
              ariaLabel={`Delete ${documentName}`}
              onClick={() => onDelete?.(documentName)}
              leadingIcon={
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M21 6.72998C20.98 6.72998 20.95 6.72998 20.92 6.72998C15.63 6.19998 10.35 5.99998 5.12001 6.52998L3.08001 6.72998C2.66001 6.76998 2.29001 6.46998 2.25001 6.04998C2.21001 5.62998 2.51001 5.26998 2.92001 5.22998L4.96001 5.02998C10.28 4.48998 15.67 4.69998 21.07 5.22998C21.48 5.26998 21.78 5.63998 21.74 6.04998C21.71 6.43998 21.38 6.72998 21 6.72998Z" fill="currentColor" />
                  <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="currentColor" />
                  <path d="M15.21 22.75H8.78999C5.29999 22.75 5.15999 20.82 5.04999 19.26L4.39999 9.19001C4.36999 8.78001 4.68999 8.42001 5.09999 8.39001C5.51999 8.37001 5.86999 8.68001 5.89999 9.09001L6.54999 19.16C6.65999 20.68 6.69999 21.25 8.78999 21.25H15.21C17.31 21.25 17.35 20.68 17.45 19.16L18.1 9.09001C18.13 8.68001 18.49 8.37001 18.9 8.39001C19.31 8.42001 19.63 8.77001 19.6 9.19001L18.95 19.26C18.84 20.82 18.7 22.75 15.21 22.75Z" fill="currentColor" />
                  <path d="M13.66 17.25H10.33C9.91999 17.25 9.57999 16.91 9.57999 16.5C9.57999 16.09 9.91999 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z" fill="currentColor" />
                  <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="currentColor" />
                </svg>
              }
            />
          )}
        </div>
      </div>

      {/* ── Optional loader below row ── */}
      {showDeterminate && (
        <div className="dcds-UploadDocument__loader">
          <DeterminateLoader
            progress={progress}
            helperText={helperText ?? `Uploading ${documentName}`}
            displayHelperText={displayHelperText}
            displayPercentage={displayPercentage}
            onProgressComplete={onProgressComplete}
            onProgressChange={onProgressChange}
            aria-label={`Uploading ${documentName}: ${Math.round(progress)}% complete`}
          />
        </div>
      )}

      {showIndeterminate && (
        <div className="dcds-UploadDocument__loader">
          <IndeterminateLoader
            size={loaderSize}
            helperText={displayHelperText}
            label={helperText ?? `Uploading ${documentName}…`}
            aria-label={`Uploading ${documentName}`}
          />
        </div>
      )}
    </div>
  );
};

UploadDocument.displayName = 'UploadDocument';

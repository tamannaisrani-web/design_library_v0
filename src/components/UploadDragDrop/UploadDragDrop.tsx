import React, { useRef, useState } from 'react';
import type { UploadDragDropProps } from './UploadDragDrop.types';
import './UploadDragDrop.css';

/**
 * **UploadDragDrop** — primary file upload drop zone.
 *
 * A fixed 350×112 px zone with a dashed green border for flows where uploading
 * is the **primary focus** of the page or section. Includes a click-to-browse
 * fallback so the interaction is keyboard accessible.
 *
 * Always pair with `UploadDocument` rows rendered below the zone to show
 * per-file upload progress and final state.
 *
 * **Do NOT use** for photo / avatar upload — use `Avatar` with edit affordance.
 *
 * @see DripDesign.md · Rule 8 · UploadDragDrop
 * @see ai-docs/Upload.ai.md
 * @see Figma node 633:7822 — Design Language System (Claude)
 *
 * @example Default drop zone
 * ```tsx
 * <UploadDragDrop
 *   states="Default"
 *   label="Upload Statement"
 *   requirementsText="PDF only, max 50 MB, no password protection"
 *   onFileSelect={(files) => handleUpload(files)}
 * />
 * ```
 *
 * @example Disabled (upload not available)
 * ```tsx
 * <UploadDragDrop states="Disabled" label="Upload Statement" />
 * ```
 *
 * @example Without label and validation text
 * ```tsx
 * <UploadDragDrop
 *   states="Default"
 *   showLabel={false}
 *   displayValidation={false}
 *   requirementsText="PDF only, max 10 MB"
 *   onFileSelect={handleUpload}
 * />
 * ```
 */
export const UploadDragDrop: React.FC<UploadDragDropProps> = ({
  states = 'Default',
  showLabel = true,
  label = 'Label',
  displayRequirements = true,
  requirementsText = 'PDF format only, max 50MB, with no password protection or encryption',
  displayValidation = true,
  validationText = 'Validation',
  validationType = 'error',
  isDisabled: isDisabledProp = false,
  accept,
  multiple = false,
  onFileSelect,
  onDragEnter,
  onDragLeave,
  onDrop,
  onClick,
  onChange,
  onFocus,
  onBlur,
  className,
  id,
  dataTestId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // Internal drag-over state for visual feedback when consumer controls `states`
  const [isDragOver, setIsDragOver] = useState(false);

  const effectiveDisabled = isDisabledProp || states === 'Disabled';

  const rootClasses = [
    'dcds-UploadDragDrop',
    `dcds-UploadDragDrop--state-${states}`,
    isDragOver && !effectiveDisabled ? 'dcds-UploadDragDrop--drag-over' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (effectiveDisabled) return;
    setIsDragOver(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (effectiveDisabled) return;
    setIsDragOver(true);
    onDragEnter?.(e);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (effectiveDisabled) return;
    setIsDragOver(false);
    onDragLeave?.(e);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (effectiveDisabled) return;
    setIsDragOver(false);
    onDrop?.(e);
    if (e.dataTransfer.files?.length) {
      onFileSelect?.(e.dataTransfer.files);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.files?.length) {
      onFileSelect?.(e.target.files);
      // Reset so the same file can be re-selected
      e.target.value = '';
    }
  }

  function handleCtaClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (effectiveDisabled) return;
    onClick?.(e);
    inputRef.current?.click();
  }

  return (
    <div
      id={id}
      className={rootClasses}
      data-testid={dataTestId}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {showLabel && (
        <span className="dcds-UploadDragDrop__label">{label}</span>
      )}

      <div
        className="dcds-UploadDragDrop__zone"
        role="region"
        aria-label={`${label} drop zone`}
        aria-disabled={effectiveDisabled || undefined}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden file input — click triggered programmatically */}
        <input
          ref={inputRef}
          type="file"
          className="dcds-UploadDragDrop__input"
          accept={accept}
          multiple={multiple}
          disabled={effectiveDisabled}
          aria-hidden="true"
          tabIndex={-1}
          onChange={handleInputChange}
        />

        {/* Icon container — white bg in Default/Disabled, transparent in Hover per Figma */}
        <div
          className={`dcds-UploadDragDrop__icon-wrap${states === 'Hover' ? ' dcds-UploadDragDrop__icon-wrap--hover' : ''}`}
          aria-hidden="true"
        >
          {/* solar:upload-linear — exact paths from icons/svg/linear/upload.svg */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`dcds-UploadDragDrop__icon-svg${effectiveDisabled ? ' dcds-UploadDragDrop__icon-svg--disabled' : ''}`}
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M17 9.00195C19.175 9.01395 20.353 9.11095 21.121 9.87895C22 10.758 22 12.172 22 15V16C22 18.829 22 20.243 21.121 21.122C20.243 22 18.828 22 16 22H8C5.172 22 3.757 22 2.879 21.122C2 20.242 2 18.829 2 16V15C2 12.172 2 10.758 2.879 9.87895C3.647 9.11095 4.825 9.01395 7 9.00195"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 15V2M9 5.5L12 2L15 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text content */}
        <div className="dcds-UploadDragDrop__content">
          <div className="dcds-UploadDragDrop__cta-row">
            <span className="dcds-UploadDragDrop__cta-text">Drag files here or</span>
            {/* Click-to-browse — required for keyboard accessibility. Bold green, no underline. */}
            <button
              type="button"
              className="dcds-UploadDragDrop__cta-link"
              disabled={effectiveDisabled}
              aria-disabled={effectiveDisabled || undefined}
              onClick={handleCtaClick}
            >
              Upload
            </button>
          </div>

          {displayRequirements && (
            <span className="dcds-UploadDragDrop__requirements">{requirementsText}</span>
          )}
        </div>
      </div>

      {displayValidation && (
        <div
          className={`dcds-UploadDragDrop__validation dcds-UploadDragDrop__validation--${validationType}`}
          role="alert"
        >
          {/* Icon: information (error/warning) or tick-circle (success) — from project icons/svg/bold/ */}
          <svg
            className="dcds-UploadDragDrop__validation-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {validationType === 'success' ? (
              /* vuesax/bold/tick-circle */
              <path
                d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                fill="currentColor"
              />
            ) : (
              /* vuesax/bold/information — error (red) and warning (amber) */
              <path
                d="M21.56 10.74L20.21 9.16002C19.96 8.86002 19.75 8.30002 19.75 7.90002V6.20002C19.75 5.14002 18.88 4.27002 17.82 4.27002H16.12C15.72 4.27002 15.15 4.06002 14.85 3.81002L13.27 2.46002C12.58 1.87002 11.45 1.87002 10.76 2.46002L9.16 3.81002C8.86 4.06002 8.3 4.27002 7.9 4.27002H6.17C5.11 4.27002 4.24 5.14002 4.24 6.20002V7.90002C4.24 8.29002 4.04 8.85002 3.79 9.15002L2.44 10.74C1.86 11.44 1.86 12.56 2.44 13.24L3.79 14.83C4.04 15.12 4.24 15.69 4.24 16.08V17.79C4.24 18.85 5.11 19.72 6.17 19.72H7.91C8.3 19.72 8.87 19.93 9.17 20.18L10.75 21.53C11.44 22.12 12.57 22.12 13.26 21.53L14.84 20.18C15.14 19.93 15.7 19.72 16.1 19.72H17.8C18.86 19.72 19.73 18.85 19.73 17.79V16.09C19.73 15.69 19.94 15.13 20.19 14.83L21.54 13.25C22.15 12.57 22.15 11.44 21.56 10.74ZM11.25 8.13002C11.25 7.72002 11.59 7.38002 12 7.38002C12.41 7.38002 12.75 7.72002 12.75 8.13002V12.96C12.75 13.37 12.41 13.71 12 13.71C11.59 13.71 11.25 13.37 11.25 12.96V8.13002ZM12 16.87C11.45 16.87 11 16.42 11 15.87C11 15.32 11.44 14.87 12 14.87C12.55 14.87 13 15.32 13 15.87C13 16.42 12.56 16.87 12 16.87Z"
                fill="currentColor"
              />
            )}
          </svg>
          <span className="dcds-UploadDragDrop__validation-text">{validationText}</span>
        </div>
      )}
    </div>
  );
};

UploadDragDrop.displayName = 'UploadDragDrop';

import React, { useRef } from 'react';
import type { UploadCTAProps } from './UploadCTA.types';
import './UploadCTA.css';

/**
 * **UploadCTA** — compact dashed-border upload button.
 *
 * Four sizes (XS / S / M / L) for inline or secondary upload actions within
 * forms, toolbars, or tight layouts. Wraps a hidden `<input type="file">` so
 * the file picker opens on click.
 *
 * **Size guidance:**
 * - `XS` / `S` — toolbars, table rows, tight inline contexts
 * - `M` — standard form upload field
 * - `L` — prominent standalone upload action
 *
 * Always pair `isDisabled={true}` with `state="Disabled"`.
 *
 * @see DripDesign.md · Rule 8 · UploadCTA
 * @see ai-docs/Upload.ai.md
 * @see Figma node 1505:1470 — Design Language System (Claude)
 *
 * @example L full-width (default)
 * ```tsx
 * <UploadCTA size="L" state="Default" label="Upload statement" isFullWidth />
 * ```
 *
 * @example S inline content-sized
 * ```tsx
 * <UploadCTA
 *   size="S"
 *   state="Default"
 *   label="Upload document"
 *   isFullWidth={false}
 *   onFileSelect={(files) => handleFiles(files)}
 * />
 * ```
 *
 * @example Disabled
 * ```tsx
 * <UploadCTA size="L" state="Disabled" isDisabled label="Upload statement" />
 * ```
 */
export const UploadCTA: React.FC<UploadCTAProps> = ({
  size = 'L',
  state = 'Default',
  isDisabled = false,
  isFullWidth = true,
  label = 'Upload',
  accept,
  multiple = false,
  onFileSelect,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  className,
  id,
  dataTestId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const disabled = isDisabled || state === 'Disabled';

  const classes = [
    'dcds-UploadCTA',
    `dcds-UploadCTA--size-${size}`,
    `dcds-UploadCTA--state-${state}`,
    isFullWidth ? 'dcds-UploadCTA--full-width' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    onClick?.(e);
    inputRef.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.files?.length) {
      onFileSelect?.(e.target.files);
      e.target.value = '';
    }
  }

  return (
    <button
      id={id}
      type="button"
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      data-testid={dataTestId}
      onClick={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        className="dcds-UploadCTA__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
      />

      {/* Label — comes BEFORE the icon per Figma */}
      <span className="dcds-UploadCTA__label">{label}</span>

      {/* Upload icon TRAILING — exact paths from icons/svg/linear/upload.svg */}
      <span className="dcds-UploadCTA__icon" aria-hidden="true">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
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
      </span>
    </button>
  );
};

UploadCTA.displayName = 'UploadCTA';

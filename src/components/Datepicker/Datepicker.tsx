/**
 * Datepicker — composite trigger + floating calendar panel.
 *
 * The trigger is an InputFields-style calendar input (48 px tall, `rd-S`
 * border radius, `calendar-2` trailing icon). The panel shows a month/year
 * navigation row, a weekday header, and a 6-row × 7-column day grid.
 * Month selection uses an internal `_BaseDatePicker` overlay.
 *
 * Design source: Figma P52nmDshYaKr963q1zBwQj nodes 1709:8986, 1223:7583–7587.
 *
 * @example
 * ```tsx
 * import { Datepicker } from '@dcds/components';
 *
 * const [open, setOpen] = React.useState(false);
 * const [date, setDate] = React.useState<Date | null>(null);
 *
 * <Datepicker
 *   label="Date of birth"
 *   property1={open ? 'open' : 'close'}
 *   value={date}
 *   onToggle={setOpen}
 *   onChange={(d) => { setDate(d); setOpen(false); }}
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownLinear } from '../../../icons/src/linear/ArrowDownLinear';
import { ArrowLeftLinear } from '../../../icons/src/linear/ArrowLeftLinear';
import { ArrowRightLinear } from '../../../icons/src/linear/ArrowRightLinear';
import { InputFields } from '../InputFields/InputFields';
import type { InputFieldsState } from '../InputFields/InputFields.types';
import type { DatepickerProps } from './Datepicker.types';
import './Datepicker.css';

/* --------------------------------------------------------------------------
   Date utilities
   -------------------------------------------------------------------------- */

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec',
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Returns true if two dates represent the same calendar day. */
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns day cells for a month grid, omitting the last row if it is entirely outside-month days. */
function buildMonthGrid(year: number, month: number): { date: Date; outside: boolean }[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const cells: { date: Date; outside: boolean }[] = [];

  // Leading outside days (from previous month)
  for (let i = 0; i < first.getDay(); i++) {
    const d = new Date(year, month, 1 - (first.getDay() - i));
    cells.push({ date: d, outside: true });
  }

  // Current month days
  for (let d = 1; d <= last.getDate(); d++) {
    cells.push({ date: new Date(year, month, d), outside: false });
  }

  // Trailing outside days — fill to next full week (not always 6 rows)
  while (cells.length % 7 !== 0) {
    const i = cells.length - first.getDay() - last.getDate() + 1;
    cells.push({ date: new Date(year, month + 1, i), outside: true });
  }

  // Drop the last row if every cell in it is outside-month
  const lastRowStart = cells.length - 7;
  if (cells.slice(lastRowStart).every((c) => c.outside)) {
    cells.splice(lastRowStart, 7);
  }

  return cells;
}

/** Formats a Date to DD/MM/YYYY string. */
function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/* --------------------------------------------------------------------------
   Internal sub-components — never export, never use directly
   -------------------------------------------------------------------------- */

const YEAR_START = 1975;
const YEAR_END   = 2028;
const YEAR_ANCHOR = 2000; // year visible at the top on open

/**
 * @internal
 * Year selection overlay — 1975–2028, opens scrolled so 2000 is at the top.
 */
const _YearOverlay: React.FC<{
  currentYear: number;
  onSelect: (year: number) => void;
  onClose: () => void;
}> = ({ currentYear, onSelect, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Scroll so YEAR_ANCHOR is at the top on first render */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const anchorBtn = el.querySelector<HTMLElement>(`[data-year="${YEAR_ANCHOR}"]`);
    if (anchorBtn) el.scrollTop = anchorBtn.offsetTop;
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div ref={overlayRef} className="dcds-Datepicker__month-overlay" role="dialog" aria-label="Select year">
      {Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i).map((yr) => (
        <button
          key={yr}
          type="button"
          data-year={yr}
          className={[
            'dcds-Datepicker__month-option',
            yr === currentYear ? 'dcds-Datepicker__month-option--current' : '',
          ].filter(Boolean).join(' ')}
          onClick={() => { onSelect(yr); onClose(); }}
        >
          {yr}
        </button>
      ))}
    </div>
  );
};

_YearOverlay.displayName = '_YearOverlay';

/**
 * @internal
 * Month selection overlay shown when the month nav button is clicked.
 * Figma node 1223:7585: 152×228px overlay with 4 month options visible,
 * current month bold, white bg, rd-S, border color/fill/primary-1.
 */
const _BaseDatePicker: React.FC<{
  currentMonth: number;
  onSelect: (month: number) => void;
  onClose: () => void;
}> = ({ currentMonth, onSelect, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div ref={overlayRef} className="dcds-Datepicker__month-overlay" role="listbox" aria-label="Select month">
      {MONTHS_SHORT.map((name, idx) => (
        <button
          key={name}
          type="button"
          role="option"
          aria-selected={idx === currentMonth}
          className={[
            'dcds-Datepicker__month-option',
            idx === currentMonth ? 'dcds-Datepicker__month-option--current' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => { onSelect(idx); onClose(); }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

_BaseDatePicker.displayName = '_BaseDatePicker';

/* --------------------------------------------------------------------------
   Datepicker — public component
   -------------------------------------------------------------------------- */

/**
 * `Datepicker` renders a date-picker composite:
 * - Trigger: InputFields-style box (48 px, `rd-S`, `calendar-2` trailing icon)
 * - Panel: month/year nav + weekday header + day grid (6 × 7)
 * - Month overlay: `_BaseDatePicker` — internal, never use directly
 *
 * **Rules:**
 * - Never render as `open` on page load.
 * - Dismiss on `Escape` key and outside click — handled internally.
 * - `_BaseDatePicker`, `_BaseHelpText` are internal — never import directly.
 */
export const Datepicker: React.FC<DatepickerProps> = ({
  property1 = 'close',
  label,
  isMandatory = true,
  showLabel = true,
  value = null,
  viewDate: viewDateProp,
  showHelpText = false,
  helpText,
  State,
  disabled = false,
  showValidation = false,
  validationMessage,
  validationProperty = 'error',
  showTooltip = false,
  tooltipHeading,
  tooltipBody,
  minDate,
  maxDate,
  onToggle,
  onChange,
  onMonthChange,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  className,
  id,
  dataTestId,
}) => {
  const isOpen = property1 === 'open' && !disabled;

  /* Internal text input state — keeps the typed string in sync with value prop */
  const [inputText, setInputText] = useState(value ? formatDate(value) : '');

  /* Sync text when the value prop changes (e.g. calendar day picked) */
  useEffect(() => {
    setInputText(value ? formatDate(value) : '');
  }, [value]);

  /* Parse "dd/mm/yyyy" → Date, returns null on failure */
  const parseInputDate = (s: string): Date | null => {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const d = new Date(+m[3], +m[2] - 1, +m[1]);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  /* Internal view month/year — controlled by viewDateProp or defaults */
  const initialView = viewDateProp ?? value ?? new Date();
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());
  const [monthOverlayOpen, setMonthOverlayOpen] = useState(false);
  const [yearOverlayOpen, setYearOverlayOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Sync view when viewDateProp changes */
  useEffect(() => {
    if (viewDateProp) {
      setViewYear(viewDateProp.getFullYear());
      setViewMonth(viewDateProp.getMonth());
    }
  }, [viewDateProp]);

  /* Close sub-overlays whenever the datepicker itself closes */
  useEffect(() => {
    if (!isOpen) {
      setMonthOverlayOpen(false);
      setYearOverlayOpen(false);
    }
  }, [isOpen]);

  /* Close panel on outside click */
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, onToggle]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMonthOverlayOpen(false);
        setYearOverlayOpen(false);
        onToggle?.(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onToggle]);

  const rootClass = [
    'dcds-Datepicker',
    isOpen ? 'dcds-Datepicker--open' : '',
    disabled ? 'dcds-Datepicker--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cells = buildMonthGrid(viewYear, viewMonth);

  const handlePrevMonth = () => {
    let y = viewYear;
    let m = viewMonth - 1;
    if (m < 0) { m = 11; y -= 1; }
    setViewMonth(m);
    setViewYear(y);
    onMonthChange?.(new Date(y, m, 1));
  };

  const handleNextMonth = () => {
    let y = viewYear;
    let m = viewMonth + 1;
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
    onMonthChange?.(new Date(y, m, 1));
  };

  const handleDayClick = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    onChange?.(date);
  };

  const getDayClass = (date: Date, outside: boolean): string => {
    const classes = ['dcds-Datepicker__day'];
    if (outside) {
      classes.push('dcds-Datepicker__day--outside');
      return classes.join(' ');
    }
    const isDisabledDay =
      (minDate != null && date < minDate) ||
      (maxDate != null && date > maxDate);
    if (isDisabledDay) {
      classes.push('dcds-Datepicker__day--disabled');
      return classes.join(' ');
    }
    if (value && isSameDay(date, value)) {
      classes.push('dcds-Datepicker__day--selected');
    }
    return classes.join(' ');
  };

  /* Derive InputFields state from local props */
  const resolvedState: InputFieldsState = disabled
    ? 'Disabled'
    : State ?? (inputText ? 'Filled' : 'Default');

  return (
    <div
      ref={wrapperRef}
      className={rootClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Trigger wrap — positioning parent for the calendar panel */}
      <div className="dcds-Datepicker__trigger-wrap">
        <InputFields
          Type="Default"
          trailingProperty="calendar-2"
          showTrailing
          label={label}
          isMandatory={isMandatory}
          showLabel={showLabel}
          showHelpText={showHelpText}
          helpText={helpText}
          State={resolvedState}
          showValidation={showValidation}
          validationMessage={validationMessage}
          validationProperty={validationProperty}
          showTooltip={showTooltip}
          tooltipHeading={tooltipHeading}
          tooltipBody={tooltipBody}
          placeholder="dd/mm/yyyy"
          value={inputText}
          onChange={(val) => {
            setInputText(val);
            // Auto-insert slashes as the user types
            const cleaned = val.replace(/[^\d/]/g, '');
            let formatted = cleaned;
            if (/^\d{2}$/.test(cleaned)) formatted = cleaned + '/';
            else if (/^\d{2}\/\d{2}$/.test(cleaned)) formatted = cleaned + '/';
            if (formatted !== val) setInputText(formatted);
          }}
          onBlur={(e) => {
            const parsed = parseInputDate(inputText);
            if (parsed) {
              onChange?.(parsed);
              // Update calendar view to match typed date
              setViewMonth(parsed.getMonth());
              setViewYear(parsed.getFullYear());
            }
            onBlur?.(e);
          }}
          onTrailingClick={() => {
            if (!disabled) onToggle?.(!isOpen);
          }}
          onFocus={onFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const parsed = parseInputDate(inputText);
              if (parsed) {
                onChange?.(parsed);
                onToggle?.(false);
              }
            }
            if (e.key === 'Escape') onToggle?.(false);
            onKeyDown?.(e);
          }}
          onKeyUp={onKeyUp}
          onClick={onClick}
          id={id}
          dataTestId={dataTestId}
          className={className}
        />

      {/* Calendar panel */}
      {isOpen && (
        <div className="dcds-Datepicker__panel" role="dialog" aria-label="Date picker">
          {/* Month/Year nav */}
          <div className="dcds-Datepicker__nav">
            {/* Month button — wrapper is positioning parent for month overlay */}
            <div className="dcds-Datepicker__nav-btn-wrap">
              <button
                type="button"
                className="dcds-Datepicker__nav-btn"
                onClick={() => { setMonthOverlayOpen((v) => !v); setYearOverlayOpen(false); }}
                aria-expanded={monthOverlayOpen}
                aria-haspopup="listbox"
              >
                {MONTHS_SHORT[viewMonth]}
                <span
                  className={[
                    'dcds-Datepicker__nav-btn-icon',
                    monthOverlayOpen ? 'dcds-Datepicker__nav-btn-icon--open' : '',
                  ].filter(Boolean).join(' ')}
                  aria-hidden="true"
                >
                  <ArrowDownLinear size={16} />
                </span>
              </button>
              {monthOverlayOpen && (
                <_BaseDatePicker
                  currentMonth={viewMonth}
                  onSelect={(m) => { setViewMonth(m); }}
                  onClose={() => setMonthOverlayOpen(false)}
                />
              )}
            </div>

            {/* Year button — wrapper is positioning parent for year overlay */}
            <div className="dcds-Datepicker__nav-btn-wrap">
              <button
                type="button"
                className="dcds-Datepicker__nav-btn"
                onClick={() => { setYearOverlayOpen((v) => !v); setMonthOverlayOpen(false); }}
                aria-expanded={yearOverlayOpen}
                aria-haspopup="listbox"
              >
                {viewYear}
                <span
                  className={[
                    'dcds-Datepicker__nav-btn-icon',
                    yearOverlayOpen ? 'dcds-Datepicker__nav-btn-icon--open' : '',
                  ].filter(Boolean).join(' ')}
                  aria-hidden="true"
                >
                  <ArrowDownLinear size={16} />
                </span>
              </button>
              {yearOverlayOpen && (
                <_YearOverlay
                  currentYear={viewYear}
                  onSelect={(yr) => setViewYear(yr)}
                  onClose={() => setYearOverlayOpen(false)}
                />
              )}
            </div>

            <div className="dcds-Datepicker__nav-arrows">
              <button
                type="button"
                className="dcds-Datepicker__arrow-btn"
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                <ArrowLeftLinear size={16} />
              </button>
              <button
                type="button"
                className="dcds-Datepicker__arrow-btn"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <ArrowRightLinear size={16} />
              </button>
            </div>
          </div>

          {/* Week header */}
          <div className="dcds-Datepicker__week-header" aria-hidden="true">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="dcds-Datepicker__week-day">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="dcds-Datepicker__days" role="grid" aria-label={`${MONTHS[viewMonth]} ${viewYear}`}>
            {cells.map(({ date, outside }, idx) => (
              <button
                key={idx}
                type="button"
                role="gridcell"
                className={getDayClass(date, outside)}
                aria-label={formatDate(date)}
                aria-selected={value ? isSameDay(date, value) : undefined}
                tabIndex={outside ? -1 : 0}
                onClick={() => !outside && handleDayClick(date)}
              >
                {date.getDate()}
              </button>
            ))}
          </div>

        </div>
      )}
      </div>{/* end dcds-Datepicker__trigger-wrap */}
    </div>
  );
};

Datepicker.displayName = 'Datepicker';

import React, { createContext, useContext, Children } from 'react';
import type { StepProps, StepperProps, StepContextValue, StepState } from './Stepper.types';
import './Stepper.css';

/* ─── Internal Context ─────────────────────────────────────────────────────── */

/**
 * React context through which `Stepper` injects positional metadata into each
 * `Step`. Consumers must **never** import or create this directly.
 */
const StepContext = createContext<StepContextValue | null>(null);

/**
 * Internal hook — throws a descriptive error when `Step` is rendered outside
 * of a `Stepper`.
 */
function useStepContext(): StepContextValue {
  const ctx = useContext(StepContext);
  if (!ctx) {
    throw new Error('[dcds] <Step> must be a direct child of <Stepper>.');
  }
  return ctx;
}

/* ─── Icon atoms ────────────────────────────────────────────────────────────── */

/**
 * Tick-circle (checkmark) icon used inside completed step circles.
 * Mirrors Figma's vuesax/bold/tick-circle at 18 × 18 px.
 */
const CheckmarkIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      // eslint-disable-next-line max-len
      d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Warning icon used inside pending step circles.
 *
 * Sourced from `icons/svg/bold/warning-2.svg` — a **hexagonal** badge shape
 * (vuesax/bold/warning-2) matching the Figma Stepper pending-state indicator exactly.
 * 18 × 18 px, inherits colour via `currentColor`.
 */
const WarningIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      // eslint-disable-next-line max-len
      d="M19.51 5.85L13.57 2.42C12.6 1.86 11.4 1.86 10.42 2.42L4.49004 5.85C3.52004 6.41 2.92004 7.45 2.92004 8.58V15.42C2.92004 16.54 3.52004 17.58 4.49004 18.15L10.43 21.58C11.4 22.14 12.6 22.14 13.58 21.58L19.52 18.15C20.49 17.59 21.09 16.55 21.09 15.42V8.58C21.08 7.45 20.48 6.42 19.51 5.85ZM11.25 7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75ZM12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25C11.87 17.25 11.74 17.22 11.62 17.17C11.49 17.12 11.39 17.05 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.1 15.73 11.29 15.54C11.39 15.45 11.49 15.38 11.62 15.33C11.99 15.17 12.43 15.26 12.71 15.54C12.8 15.64 12.87 15.74 12.92 15.87C12.97 15.99 13 16.12 13 16.25C13 16.38 12.97 16.51 12.92 16.63Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Active-state step circle indicator (24 × 24 px).
 *
 * Recreates the Figma `Frame26853` / `Frame26854` image assets as an inline SVG.
 * Verified against the Figma asset pixel values:
 * - Outer ring: white fill (`color/surface/1`) + Noble Blue-400 stroke 1.5 px (`color/stroke/focus`)
 * - Inner disc: Noble Blue-500 solid fill (`color/surface/inverse` = `#0a2e57`)
 *
 * The white annular gap between the stroke and the inner disc creates the
 * distinctive "ring" appearance for the current step.
 */
const ActiveCircleSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/*
     * Outer ring: white fill + Noble Blue-400 (#1355A1) stroke 1.5 px.
     * Verified from the raw Figma SVG asset (Frame 26853):
     *   fill="var(--fill-0, white)"  stroke="var(--stroke-0, #1355A1)"  stroke-width="1.5"
     * Ring fill is WHITE — the thin white area between inner disc and stroke is only ~1.45 px.
     */}
    <circle
      cx="12"
      cy="12"
      r="11.25"
      fill="var(--color-surface-1)"
      stroke="var(--color-stroke-focus)"
      strokeWidth="1.5"
    />
    {/*
     * Inner disc: Noble Blue-500 (#0A2E57), radius 9.05 px.
     * Verified from raw Figma SVG: r="9.05138"
     * This leaves only a ~1.45 px white ring between the disc edge (r=9.05)
     * and the stroke inner edge (r=10.5), which is the thin ring visible in Figma.
     */}
    <circle cx="12" cy="12" r="9.05" fill="var(--color-surface-inverse)" />
  </svg>
);

/* ─── StepIndicator (internal) ─────────────────────────────────────────────── */

/**
 * Renders the correct indicator for a single step based on mode and state.
 *
 * - **Normal** mode → 24 px circle with state-specific content.
 * - **Compact** mode → 4 px coloured bar.
 *
 * This is the React equivalent of Figma's `_BaseStepper` indicator area.
 * Do **not** use directly — it is internal to the `Step` component.
 *
 * @internal
 */
const StepIndicator: React.FC<{
  state: StepState;
  isCompact: boolean;
}> = ({ state, isCompact }) => {
  if (isCompact) {
    return (
      <div
        className={['dcds-Step__bar', `dcds-Step__bar--${state}`].join(' ')}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={['dcds-Step__circle', `dcds-Step__circle--${state}`].join(' ')}
      aria-hidden="true"
    >
      {state === 'active' && <ActiveCircleSvg />}
      {state === 'completed' && (
        <span className="dcds-Step__circle-icon dcds-Step__circle-icon--completed">
          <CheckmarkIcon />
        </span>
      )}
      {state === 'pending' && (
        <span className="dcds-Step__circle-icon dcds-Step__circle-icon--pending">
          <WarningIcon />
        </span>
      )}
    </div>
  );
};

/* ─── Step (public component) ───────────────────────────────────────────────── */

/**
 * Step
 *
 * Represents a single step inside a `Stepper`. Must be a **direct child** of
 * `Stepper` — rendering `Step` in isolation will throw a runtime error.
 *
 * The step automatically receives its ordinal position, total count, and
 * connector visibility from the surrounding `Stepper` via React context.
 *
 * Figma reference: `_BaseStepper` sub-component (node 776:61667)
 *
 * @example
 * ```tsx
 * <Stepper Orientation="Horizontal">
 *   <Step state="completed" label="Personal Info" />
 *   <Step state="active"    label="Employment"    />
 *   <Step state="upcoming"  label="Documents"     />
 * </Stepper>
 * ```
 */
export const Step: React.FC<StepProps> = ({
  state,
  label,
  description,
  showDescription = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
  className,
  id,
  dataTestId,
}) => {
  const { isCompact, stepIndex, totalSteps, showConnector, onStepClick } = useStepContext();

  const stepNumber = stepIndex + 1;

  /**
   * Descriptive `aria-label` covering position, name, and state.
   * e.g. "Step 2 of 4 — Employment — active"
   */
  const ariaLabel = `Step ${stepNumber} of ${totalSteps} — ${label} — ${state}`;

  const handleClick = () => {
    onClick?.(stepIndex, state);
    onStepClick?.(stepIndex, state);
  };

  const isClickable = (!!onClick || !!onStepClick) && state !== 'disabled';

  const liClasses = [
    'dcds-Step',
    `dcds-Step--${state}`,
    isCompact ? 'dcds-Step--compact' : 'dcds-Step--normal',
    !showConnector ? 'dcds-Step--last' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      id={id}
      className={liClasses}
      role="listitem"
      aria-current={state === 'active' ? 'step' : undefined}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      onClick={isClickable ? handleClick : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      /* Make clickable steps keyboard-reachable */
      tabIndex={isClickable ? 0 : undefined}
    >
      {isCompact ? (
        /*
         * Compact mode — bar is a **direct child** of <li> so `align-self: stretch`
         * on the bar element works within the row flex context and the bar height
         * matches the label + description height exactly (Fix #7).
         */
        <>
          <div
            className={['dcds-Step__bar', `dcds-Step__bar--${state}`].join(' ')}
            aria-hidden="true"
          />
          <div className="dcds-Step__content">
            <span className="dcds-Step__label">{label}</span>
            {showDescription && description && (
              <span className="dcds-Step__description">{description}</span>
            )}
          </div>
        </>
      ) : (
        /*
         * Normal mode — track wraps the circle + optional connector.
         * The track spans the full step width in horizontal orientation so the
         * connector can flex-grow to fill the space between adjacent circles.
         */
        <>
          <div className="dcds-Step__track">
            <StepIndicator state={state} isCompact={isCompact} />
            {showConnector && (
              <div
                className={['dcds-Step__connector', `dcds-Step__connector--${state}`].join(' ')}
                aria-hidden="true"
              />
            )}
          </div>

          <div className="dcds-Step__content">
            <span className="dcds-Step__label">{label}</span>
            {showDescription && description && (
              <span className="dcds-Step__description">{description}</span>
            )}
          </div>
        </>
      )}
    </li>
  );
};

Step.displayName = 'Step';

/* ─── Stepper (public component) ────────────────────────────────────────────── */

/**
 * Stepper
 *
 * Renders progress through a discrete, **sequentially ordered** multi-step
 * process — loan application flows, onboarding wizards, multi-page forms,
 * and checkout sequences.
 *
 * Figma reference: node 776:61667 — Design Language System (Claude)
 *
 * **Constraints (from AI doc):**
 * - Exactly **one** `Step` must have `state="active"` at any given time.
 * - Completed steps render a checkmark; pending steps render a warning icon.
 * - `Orientation="Horizontal"` spans the **full width** of its container.
 * - `isCompact=true` shows bar indicators — use only in space-constrained layouts.
 * - `_BaseStepper` is internal; never import or render it directly.
 *
 * **Accessibility:**
 * - Container: `role="list"` + `aria-label="Progress steps"`.
 * - Each item: `role="listitem"` + position-aware `aria-label`.
 * - Active step: `aria-current="step"`.
 * - State is communicated via label text + icons, never colour alone.
 *
 * @example Horizontal 4-step loan application
 * ```tsx
 * <Stepper Orientation="Horizontal">
 *   <Step state="completed" label="Personal Info" />
 *   <Step state="active"    label="Employment"    />
 *   <Step state="upcoming"  label="Documents"     />
 *   <Step state="upcoming"  label="Review"        />
 * </Stepper>
 * ```
 *
 * @example Compact horizontal — space-constrained toolbar header
 * ```tsx
 * <Stepper isCompact Orientation="Horizontal">
 *   <Step state="completed" label="Setup"  />
 *   <Step state="active"    label="Config" />
 *   <Step state="upcoming"  label="Deploy" />
 * </Stepper>
 * ```
 *
 * @example Vertical sidebar wizard with descriptions
 * ```tsx
 * <Stepper Orientation="Vertical">
 *   <Step state="completed" label="Account setup"    description="Profile ready" />
 *   <Step state="active"    label="KYC verification"                             />
 *   <Step state="upcoming"  label="Bank linking"                                 />
 * </Stepper>
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  isCompact = false,
  Orientation = 'Horizontal',
  children,
  onStepClick,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onFocus,
  onBlur,
  className,
  id,
  dataTestId,
}) => {
  /* Resolve children array to calculate positions */
  const stepChildren = Children.toArray(children);
  const totalSteps = stepChildren.length;

  const olClasses = [
    'dcds-Stepper',
    `dcds-Stepper--${Orientation}`,
    isCompact ? 'dcds-Stepper--compact' : 'dcds-Stepper--normal',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ol
      id={id}
      className={olClasses}
      role="list"
      aria-label="Progress steps"
      data-testid={dataTestId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {stepChildren.map((child, index) => {
        const ctxValue: StepContextValue = {
          isCompact,
          orientation: Orientation,
          stepIndex: index,
          totalSteps,
          /*
           * showConnector = true for every step except the last AND only in
           * normal mode. Compact mode never shows connector lines.
           */
          showConnector: !isCompact && index < totalSteps - 1,
          onStepClick,
        };

        return (
          /* Each Step gets its own Provider so it can read its own index */
          <StepContext.Provider key={index} value={ctxValue}>
            {child}
          </StepContext.Provider>
        );
      })}
    </ol>
  );
};

Stepper.displayName = 'Stepper';

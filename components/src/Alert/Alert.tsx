import React, { useEffect, useRef } from 'react';
import type { AlertProps } from './Alert.types';
import { InfoCircleBold } from '../../assets/icons/bold/InfoCircleBold';
import { CloseLinear } from '../../assets/icons/linear/CloseLinear';
import './Alert.css';

const TOAST_AUTO_DISMISS_MS = 5000;

const stateIcons: Record<string, React.ReactElement> = {
  success: <InfoCircleBold size={16} />,
  error:   <InfoCircleBold size={16} />,
  warning: <InfoCircleBold size={16} />,
  info:    <InfoCircleBold size={16} />,
};

export const Alert: React.FC<AlertProps> = ({
  state = 'info',
  emphasis = 'subtle',
  isFlag = false,
  title,
  children,
  onClose,
  actions,
  className,
  id,
  dataTestId,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss toast after timeout when onClose is provided
  useEffect(() => {
    if (!isFlag || !onClose) return;
    timerRef.current = setTimeout(onClose, TOAST_AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [isFlag, onClose]);

  const role = state === 'error' || state === 'warning' ? 'alert' : 'status';
  const ariaLive = state === 'error' ? 'assertive' : 'polite';
  // Close button shown only for subtle emphasis (not subtler) when onClose is supplied
  const showClose = emphasis === 'subtle' && !!onClose;

  const classes = [
    'dcds-Alert',
    `dcds-Alert--state-${state}`,
    `dcds-Alert--emphasis-${emphasis}`,
    isFlag ? 'dcds-Alert--flag' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={classes}
      role={role}
      aria-live={ariaLive}
      data-testid={dataTestId}
    >
      <div className="dcds-Alert__inner">
        <div className="dcds-Alert__content">
          <span className="dcds-Alert__icon">{stateIcons[state]}</span>
          <div className="dcds-Alert__body">
            <div className="dcds-Alert__text">
              {title && <p className="dcds-Alert__title">{title}</p>}
              {children && <p className="dcds-Alert__message">{children}</p>}
            </div>
            {actions && emphasis === 'subtle' && (
              <div className="dcds-Alert__actions">{actions}</div>
            )}
          </div>
        </div>
        {showClose && (
          <button
            type="button"
            className="dcds-Alert__close"
            aria-label="Dismiss"
            onClick={onClose}
          >
            <CloseLinear size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';

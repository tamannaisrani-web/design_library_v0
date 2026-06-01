import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { CssOverrideType } from '../types/common';
import { PALETTE_COLORS, FONT_FAMILY, FONT_WEIGHTS } from '../theme/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertState = 'success' | 'error' | 'warning' | 'info';
export type AlertEmphasis = 'subtle' | 'subtler';

export type AlertProps = CssOverrideType & {
  /**
   * The severity / state of the alert.
   * @default 'info'
   */
  state?: AlertState;
  /**
   * Visual weight of the alert.
   * - 'subtle'  → colored background + 1px full border (card) or left border only (flag)
   * - 'subtler' → white background + 2px full border (no flag variant)
   * @default 'subtle'
   */
  emphasis?: AlertEmphasis;
  /**
   * When true, renders as a full-width horizontal flag banner with a left accent border only.
   * Only applies when emphasis is 'subtle'.
   * @default false
   */
  isFlag?: boolean;
  /**
   * The bold heading text of the alert.
   */
  title?: string;
  /**
   * The supporting body message.
   */
  message?: string;
  /**
   * Show or hide the title.
   * @default true
   */
  showTitle?: boolean;
  /**
   * Show the action button + link row.
   * Only rendered when emphasis is 'subtle'.
   * @default false
   */
  showActions?: boolean;
  /**
   * Label for the primary action button.
   * @default 'Button'
   */
  actionLabel?: string;
  /**
   * Callback fired when the primary action button is clicked.
   */
  onAction?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Label for the secondary link action.
   * @default 'Link'
   */
  linkLabel?: string;
  /**
   * Callback fired when the link action is clicked.
   */
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * Show the dismiss (×) button.
   * Only rendered when emphasis is 'subtle'.
   * @default false
   */
  showDismiss?: boolean;
  /**
   * Callback fired when the dismiss button is clicked.
   */
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Optional slot content rendered below the message (only when isFlag is false).
   */
  children?: React.ReactNode;
  /**
   * Override styles of the icon via the sx prop.
   */
  _iconSx?: SxProps<Theme>;
  /**
   * id for querying the component during testing.
   */
  dataTestId?: string;
};

// ─── State configuration ──────────────────────────────────────────────────────

type StateConfig = {
  fill: string;
  stroke: string;
  iconColor: string;
  Icon: React.ElementType;
  flagBorderWidth?: number;
};

const STATE_CONFIG: Record<AlertState, StateConfig> = {
  success: {
    fill: PALETTE_COLORS.SPRING_GREEN[50],
    stroke: PALETTE_COLORS.SPRING_GREEN[600],
    iconColor: PALETTE_COLORS.SPRING_GREEN[600],
    Icon: CheckCircleIcon,
    flagBorderWidth: 2,
  },
  error: {
    fill: PALETTE_COLORS.ORANGE[50],
    stroke: PALETTE_COLORS.ORANGE[600],
    iconColor: PALETTE_COLORS.ORANGE[600],
    Icon: ErrorIcon,
    flagBorderWidth: 4,
  },
  warning: {
    fill: PALETTE_COLORS.MUSTARD_YELLOW[50],
    stroke: PALETTE_COLORS.MUSTARD_YELLOW[600],
    iconColor: PALETTE_COLORS.MUSTARD_YELLOW[600],
    Icon: WarningAmberIcon,
    flagBorderWidth: 2,
  },
  info: {
    fill: PALETTE_COLORS.SKY_BLUE[50],
    stroke: PALETTE_COLORS.SKY_BLUE[600],
    iconColor: PALETTE_COLORS.SKY_BLUE[600],
    Icon: InfoIcon,
    flagBorderWidth: 2,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getContainerSx(
  state: AlertState,
  emphasis: AlertEmphasis,
  isFlag: boolean
): React.CSSProperties {
  const { fill, stroke, flagBorderWidth = 2 } = STATE_CONFIG[state];

  if (isFlag && emphasis === 'subtle') {
    // Full-width horizontal banner — left accent border only
    return {
      backgroundColor: fill,
      borderLeft: `${flagBorderWidth}px solid ${stroke}`,
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      borderRadius: 0,
      width: '100%',
      overflow: 'hidden',
    };
  }

  if (emphasis === 'subtler') {
    // White background, 2px full border
    return {
      backgroundColor: '#FFFFFF',
      border: `2px solid ${stroke}`,
      borderRadius: 8,
    };
  }

  // Default: subtle card — colored background, 1px full border
  return {
    backgroundColor: fill,
    border: `1px solid ${stroke}`,
    borderRadius: 8,
    overflow: 'hidden',
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Alert = ({
  state = 'info',
  emphasis = 'subtle',
  isFlag = false,
  title,
  message = 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.',
  showTitle = true,
  showActions = false,
  actionLabel = 'Button',
  onAction,
  linkLabel = 'Link',
  onLinkClick,
  showDismiss = false,
  onDismiss,
  children,
  _sx,
  _iconSx,
  className = '',
  dataTestId,
}: AlertProps) => {
  const { Icon, iconColor } = STATE_CONFIG[state];
  const containerStyle = getContainerSx(state, emphasis, isFlag);
  const showActionsRow = showActions && emphasis === 'subtle';
  const showDismissButton = showDismiss && emphasis === 'subtle';

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      sx={{
        ...containerStyle,
        display: 'flex',
        alignItems: isFlag ? 'center' : 'flex-start',
        padding: '12px',
        gap: '8px',
        fontFamily: FONT_FAMILY,
        ..._sx,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          flexShrink: 0,
          width: 16,
          height: 20,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: '2px',
          ..._iconSx,
        }}
      >
        <Icon
          sx={{
            fontSize: 16,
            color: iconColor,
          }}
        />
      </Box>

      {/* Content area */}
      <Box
        sx={{
          flex: '1 0 0',
          minWidth: 0,
          display: 'flex',
          flexDirection: isFlag ? 'row' : 'column',
          alignItems: isFlag ? 'center' : 'flex-start',
          gap: '8px',
        }}
      >
        {/* Text block */}
        <Box
          sx={{
            flex: isFlag ? '1 0 0' : undefined,
            minWidth: isFlag ? 0 : undefined,
            width: isFlag ? undefined : '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {showTitle && title && (
            <Box
              component="p"
              sx={{
                margin: 0,
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: FONT_WEIGHTS.BOLD,
                lineHeight: 1,
                color: PALETTE_COLORS.NOBLE_BLUE[500],
              }}
            >
              {title}
            </Box>
          )}
          <Box
            component="p"
            sx={{
              margin: 0,
              fontFamily: FONT_FAMILY,
              fontSize: 12,
              fontWeight: FONT_WEIGHTS.REGULAR,
              lineHeight: 1,
              color: '#4B4B4B',
            }}
          >
            {message}
          </Box>
        </Box>

        {/* Actions row */}
        {showActionsRow && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              width: isFlag ? undefined : '100%',
            }}
          >
            <MuiButton
              variant="outlined"
              onClick={onAction}
              disableRipple
              disableElevation
              sx={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: FONT_WEIGHTS.BOLD,
                height: 32,
                padding: '0 12px',
                borderRadius: '4px',
                textTransform: 'none',
                color: PALETTE_COLORS.WEALTHY_GREEN[500],
                borderColor: PALETTE_COLORS.WEALTHY_GREEN[500],
                backgroundColor: '#FFFFFF',
                '&:hover': {
                  borderColor: PALETTE_COLORS.WEALTHY_GREEN[600],
                  backgroundColor: PALETTE_COLORS.WEALTHY_GREEN[50],
                  color: PALETTE_COLORS.WEALTHY_GREEN[600],
                },
              }}
            >
              {actionLabel}
            </MuiButton>
            <MuiLink
              component="button"
              onClick={onLinkClick}
              sx={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: FONT_WEIGHTS.REGULAR,
                color: PALETTE_COLORS.SKY_BLUE[600],
                textDecoration: 'underline',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                lineHeight: 'normal',
              }}
            >
              {linkLabel}
            </MuiLink>
          </Box>
        )}

        {/* Slot — optional children, only for non-flag alerts */}
        {!isFlag && children && (
          <Box sx={{ width: '100%', minHeight: 25 }}>{children}</Box>
        )}
      </Box>

      {/* Dismiss button — only for subtle emphasis */}
      {showDismissButton && (
        <MuiIconButton
          onClick={onDismiss}
          disableRipple
          size="small"
          sx={{
            flexShrink: 0,
            padding: 0,
            color: PALETTE_COLORS.NEUTRAL_GRAY[500],
            '&:hover': {
              backgroundColor: 'transparent',
              color: PALETTE_COLORS.NOBLE_BLUE[500],
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </MuiIconButton>
      )}
    </Box>
  );
};

export default Alert;

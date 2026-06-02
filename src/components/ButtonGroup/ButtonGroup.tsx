import React from 'react';
import type { ButtonGroupProps } from './ButtonGroup.types';
import './ButtonGroup.css';

/**
 * **ButtonGroup** — paired-action layout.
 *
 * A simple flex-row wrapper that places related action buttons next to each
 * other with a consistent gap. Each child keeps its own border-radius and
 * border — the group does **not** merge children into a shared container.
 *
 * Per the Figma reference, the typical pairings are:
 * - **Default**: Secondary (outlined) + Primary (filled) Buttons
 * - **Link**: LinkButton + Primary Button
 *
 * @see ai-docs/ButtonGroup.stories.mdx
 *
 * @example
 * ```tsx
 * <ButtonGroup ariaLabel="Save or discard">
 *   <Button variant="Secondary">Cancel</Button>
 *   <Button variant="Primary">Save</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  Style = 'Default',
  isLink = false,
  isStacked = false,
  ariaLabel,
  className,
  id,
  dataTestId,
  children,
}) => {
  // The `isLink` convenience flag overrides `Style` when true.
  const resolvedStyle: NonNullable<ButtonGroupProps['Style']> = isLink ? 'Link' : Style;

  const classes = [
    'dcds-ButtonGroup',
    `dcds-ButtonGroup--Style-${resolvedStyle}`,
    isStacked ? 'dcds-ButtonGroup--stack' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div id={id} role="group" aria-label={ariaLabel} className={classes} data-testid={dataTestId}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

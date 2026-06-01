import { SxProps, Theme } from '@mui/material';

export type CssOverrideType = {
  /**
   * Classname of the component
   */
  className?: string;
  /**
   * ⚠️ Override styles of the component using the sx prop.
   * This will be deprecated later, so use it only when absolutely necessary.
   */
  _sx?: SxProps<Theme>;
};

export type ColorEnum =
  | 'primary'
  | 'secondary'
  | 'black'
  | 'white'
  | 'gray'
  | 'lightGray'
  | 'transparent'
  | 'orange';

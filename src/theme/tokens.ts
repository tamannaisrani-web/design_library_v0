/**
 * DCDS Design Tokens — TypeScript constants.
 *
 * These mirror the CSS variables defined in `tokens.css`. Prefer the CSS
 * variables in component styles (so consumers can theme via :root). Use this
 * TS object only when you need a token value at runtime (e.g. inline SVG fill,
 * dynamic style calculation).
 *
 * Two-tier model — always reach for the semantic layer first.
 */

export const primitives = {
  nobleBlue: {
    0: '#EFF6FF',
    50: '#DAE9FB',
    100: '#B5D4F6',
    200: '#6BA8EE',
    300: '#217CE5',
    400: '#1355A1',
    500: '#0A2E57',
    600: '#082546',
    700: '#061B34',
    800: '#041223',
    900: '#020911',
  },
  wealthyGreen: {
    0: '#F3FFF9',
    50: '#E7FAF2',
    100: '#CFF3E6',
    200: '#9FEBCC',
    300: '#6FE1B3',
    400: '#3FD79A',
    500: '#26B67F',
    600: '#1E9263',
    700: '#176D4A',
    800: '#0F4932',
    900: '#082419',
  },
  skyBlue: {
    0: '#F1F9FF',
    50: '#EBF5FB',
    100: '#DAECF7',
    200: '#B5D8EF',
    300: '#8FC5E8',
    400: '#6AB1E1',
    500: '#459ED9',
    600: '#2782BE',
    700: '#1D618E',
    800: '#13405F',
    900: '#0A202F',
  },
  mustardYellow: {
    0: '#FFFBF4',
    50: '#FEF7EC',
    100: '#FCF0D8',
    200: '#FAE0B1',
    300: '#F7D18B',
    400: '#F5C164',
    500: '#F2B23D',
    600: '#E3980F',
    700: '#AA720B',
    800: '#724C08',
    900: '#392604',
  },
  zestyOrange: {
    0: '#FFF7F5',
    50: '#FAEFEC',
    100: '#F5E0D9',
    200: '#EBC1B3',
    300: '#E0A18C',
    400: '#D68266',
    500: '#CC6340',
    600: '#A94C2D',
    700: '#7F3922',
    800: '#552617',
    900: '#2A130B',
  },
  springGreen: {
    0: '#E3FCEB',
    50: '#CEEDD9',
    100: '#B9DEC8',
    200: '#8FC1A8',
    300: '#66A486',
    400: '#3C8765',
    500: '#126A43',
    600: '#0E5535',
    700: '#0B4028',
    800: '#072B1B',
    900: '#04150D',
  },
  coolGrey: {
    0: '#FFFFFF',
    50: '#F9F9F9',
    100: '#F5F5F5',
    200: '#F0F0F0',
    300: '#DEDEDE',
    400: '#B5B5B5',
    500: '#989898',
    600: '#737171',
    700: '#4B4B4B',
    800: '#292929',
    900: '#121212',
  },
} as const;

export const spacing = {
  'gap-0': 0,
  'gap-2': 2,
  'gap-4': 4,
  'gap-8': 8,
  'gap-12': 12,
  'gap-16': 16,
  'gap-20': 20,
  'gap-24': 24,
  'gap-32': 32,
  'gap-40': 40,
  'gap-48': 48,
  'gap-56': 56,
  'gap-64': 64,
  'gap-80': 80,
  'gap-108': 108,
} as const;

export const radius = {
  'rd-Nil': 0,
  'rd-XS': 4,
  'rd-S': 8,
  'rd-M': 12,
  'rd-L': 24,
  'rd-XL': 40,
  'rd-Max': 1000,
} as const;

export const typography = {
  fontFamily: "'Nunito Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  sizes: {
    h1: 44,
    h2: 32,
    h3: 24,
    h4: 20,
    caption: 18,
    body: 16,
    label: 14,
    bodySmall: 12,
    validation: 10,
  },
  weights: {
    regular: 400,
    bold: 700,
  },
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;

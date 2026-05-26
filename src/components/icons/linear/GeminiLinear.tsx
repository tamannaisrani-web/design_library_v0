import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const GeminiLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={true}
    focusable="false"
    {...props}
  >
<path d="M2 2C8.16 5.69 15.84 5.69 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 21.9999C8.16 18.3099 15.84 18.3099 22 21.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.2998 3.58008L5.42981 3.82007C8.16981 9.03007 8.11981 15.25 5.32981 20.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.6703 20.41C15.8903 15.25 15.8403 9.03007 18.5703 3.82007L18.7003 3.58008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

GeminiLinear.displayName = 'GeminiLinear'

export { GeminiLinear }
export default GeminiLinear

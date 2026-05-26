import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const PreviousLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M20.24 7.21999V16.79C20.24 18.75 18.11 19.98 16.41 19L12.26 16.61L8.10996 14.21C6.40996 13.23 6.40996 10.78 8.10996 9.79998L12.26 7.39998L16.41 5.01C18.11 4.03 20.24 5.24999 20.24 7.21999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.75977 18.1802V5.82025" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

PreviousLinear.displayName = 'PreviousLinear'

export { PreviousLinear }
export default PreviousLinear

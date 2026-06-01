import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const NextLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M3.75977 7.21999V16.79C3.75977 18.75 5.88975 19.98 7.58975 19L11.7397 16.61L15.8898 14.21C17.5898 13.23 17.5898 10.78 15.8898 9.79998L11.7397 7.39998L7.58975 5.01C5.88975 4.03 3.75977 5.24999 3.75977 7.21999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.2397 18.1802V5.82025" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

NextLinear.displayName = 'NextLinear'

export { NextLinear }
export default NextLinear

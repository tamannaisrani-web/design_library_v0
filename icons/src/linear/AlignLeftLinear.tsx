import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const AlignLeftLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M5.1001 19.25H16.9001C18.4001 19.25 19.0001 18.61 19.0001 17.02V15.98C19.0001 14.39 18.4001 13.75 16.9001 13.75H5.1001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.1001 5.25H11.9001C13.4001 5.25 14.0001 5.89 14.0001 7.48V8.52C14.0001 10.11 13.4001 10.75 11.9001 10.75H5.1001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5 1.98999V21.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

AlignLeftLinear.displayName = 'AlignLeftLinear'

export { AlignLeftLinear }
export default AlignLeftLinear

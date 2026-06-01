import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const AlignRightLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M18.9 19.25H7.1C5.6 19.25 5 18.61 5 17.02V15.98C5 14.39 5.6 13.75 7.1 13.75H18.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.9 5.25H12.1C10.6 5.25 10 5.89 10 7.48V8.52C10 10.11 10.6 10.75 12.1 10.75H18.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 1.98999V21.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

AlignRightLinear.displayName = 'AlignRightLinear'

export { AlignRightLinear }
export default AlignRightLinear

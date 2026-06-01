import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const RulerLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<g clipPath="url(#clip0_332_18884)">
<path d="M5 17H19C21 17 22 16 22 14V10C22 8 21 7 19 7H5C3 7 2 8 2 10V14C2 16 3 17 5 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M18 7V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M6 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M10.05 7L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M14 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
</g>
<defs>
<clipPath id="clip0_332_18884">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
  </svg>
)

RulerLinear.displayName = 'RulerLinear'

export { RulerLinear }
export default RulerLinear

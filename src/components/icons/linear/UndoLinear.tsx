import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const UndoLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M7.12988 18.3101H15.1299C17.8899 18.3101 20.1299 16.0701 20.1299 13.3101C20.1299 10.5501 17.8899 8.31006 15.1299 8.31006H4.12988" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.43012 10.8099L3.87012 8.24994L6.43012 5.68994" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

UndoLinear.displayName = 'UndoLinear'

export { UndoLinear }
export default UndoLinear

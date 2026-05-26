import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const Grid1Bold = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill="currentColor"/>
<path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill="currentColor"/>
<path d="M22 16.3C21.96 19.85 19.82 21.98 16.25 22V16.3H22Z" fill="currentColor"/>
<path d="M7.75 16.3V22C4.18 21.98 2.04 19.85 2 16.3H7.75Z" fill="currentColor"/>
<path d="M7.75 9.30005H2V14.8H7.75V9.30005Z" fill="currentColor"/>
<path d="M22 9.30005H16.25V14.8H22V9.30005Z" fill="currentColor"/>
<path d="M14.75 9.30005H9.25V14.8H14.75V9.30005Z" fill="currentColor"/>
<path d="M14.75 2H9.25V7.8H14.75V2Z" fill="currentColor"/>
<path d="M14.75 16.3H9.25V22H14.75V16.3Z" fill="currentColor"/>
  </svg>
)

Grid1Bold.displayName = 'Grid1Bold'

export { Grid1Bold }
export default Grid1Bold

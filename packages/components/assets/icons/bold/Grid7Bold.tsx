import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const Grid7Bold = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M11.25 10.5V22H7.81C4.17 22 2 19.83 2 16.19V10.5H11.25Z" fill="currentColor"/>
<path d="M22 10.5V16.19C22 19.83 19.83 22 16.19 22H12.75V10.5H22Z" fill="currentColor"/>
<path d="M22 7.81V9H2V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81Z" fill="currentColor"/>
  </svg>
)

Grid7Bold.displayName = 'Grid7Bold'

export { Grid7Bold }
export default Grid7Bold

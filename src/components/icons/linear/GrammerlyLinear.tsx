import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const GrammerlyLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M19.07 4.95002C23.04 8.92002 22.97 15.4 18.87 19.29C15.08 22.88 8.92996 22.88 5.12996 19.29C1.01996 15.4 0.94995 8.92002 4.92995 4.95002C8.82995 1.04002 15.17 1.04002 19.07 4.95002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8399 16.0703C13.7199 18.0703 10.2799 18.0703 8.16992 16.0703" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

GrammerlyLinear.displayName = 'GrammerlyLinear'

export { GrammerlyLinear }
export default GrammerlyLinear

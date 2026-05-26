import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const TriangleLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M12.0001 21.41H5.94005C2.47005 21.41 1.02005 18.93 2.70005 15.9L5.82006 10.28L8.76006 5.00003C10.5401 1.79003 13.4601 1.79003 15.2401 5.00003L18.1801 10.29L21.3001 15.91C22.9801 18.94 21.5201 21.42 18.0601 21.42H12.0001V21.41Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.4401 20L12.0001 13.39L2.56006 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 3V13.39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

TriangleLinear.displayName = 'TriangleLinear'

export { TriangleLinear }
export default TriangleLinear

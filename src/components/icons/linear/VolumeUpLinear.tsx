import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const VolumeUpLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M2 9.96003V14.04C2 16.08 3.02 17.1 5.06 17.1H6.52C6.9 17.1 7.28 17.21 7.6 17.41L10.58 19.27C13.16 20.88 15.26 19.71 15.26 16.67V7.32003C15.26 4.28003 13.15 3.11003 10.58 4.72003L7.6 6.59003C7.27 6.79003 6.9 6.90003 6.52 6.90003H5.06C3.02 6.90003 2 7.92003 2 9.96003Z" stroke="currentColor" strokeWidth="1.5"/>
<path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20 14V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

VolumeUpLinear.displayName = 'VolumeUpLinear'

export { VolumeUpLinear }
export default VolumeUpLinear

import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const CloudLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M7.27004 13.0098C6.74004 12.7398 6.15004 12.5998 5.55004 12.5998C0.870039 12.9298 0.870039 19.7398 5.55004 20.0698H16.64C17.99 20.0798 19.29 19.5798 20.28 18.6698C23.57 15.7998 21.81 10.0298 17.48 9.47976C15.92 0.109757 2.39004 3.66976 5.60004 12.5998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8501 9.91977C16.3701 9.65977 16.9401 9.51977 17.5201 9.50977" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

CloudLinear.displayName = 'CloudLinear'

export { CloudLinear }
export default CloudLinear

import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const FingerScanLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M11.9996 14.8799C11.0896 14.8799 10.3496 14.1399 10.3496 13.2299V10.7599C10.3496 9.84989 11.0896 9.10986 11.9996 9.10986C12.9096 9.10986 13.6496 9.84989 13.6496 10.7599V13.2299C13.6496 14.1399 12.9096 14.8799 11.9996 14.8799Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M16.98 13.4702C16.78 16.0502 14.62 18.0702 12 18.0702C9.24 18.0702 7 15.8302 7 13.0702V10.9302C7 8.17018 9.24 5.93018 12 5.93018C14.59 5.93018 16.72 7.90017 16.97 10.4202" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M15 2H17C20 2 22 4 22 7V9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 9V7C2 4 4 2 7 2H9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15 22H17C20 22 22 20 22 17V15" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 15V17C2 20 4 22 7 22H9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

FingerScanLinear.displayName = 'FingerScanLinear'

export { FingerScanLinear }
export default FingerScanLinear

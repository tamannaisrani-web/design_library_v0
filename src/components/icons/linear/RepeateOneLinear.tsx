import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const RepeateOneLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M14.0002 3L16.4402 5.34003L8.49023 5.32001C4.92023 5.32001 1.99023 8.25003 1.99023 11.84C1.99023 13.63 2.72024 15.26 3.90024 16.44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.0001 21L7.56006 18.66L15.5101 18.68C19.0801 18.68 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74 20.1001 7.56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.25 14.67V9.33002L10.75 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

RepeateOneLinear.displayName = 'RepeateOneLinear'

export { RepeateOneLinear }
export default RepeateOneLinear

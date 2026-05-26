import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const House2Linear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.9502 22.0003L3.0002 9.97023C3.0002 9.36023 3.2902 8.78029 3.7702 8.40029L10.7702 2.95027C11.4902 2.39027 12.5002 2.39027 13.2302 2.95027L20.2302 8.39028C20.7202 8.77028 21.0002 9.35023 21.0002 9.97023V22.0003" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
<path d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 16.25V17.75" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.5 7.5H13.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

House2Linear.displayName = 'House2Linear'

export { House2Linear }
export default House2Linear

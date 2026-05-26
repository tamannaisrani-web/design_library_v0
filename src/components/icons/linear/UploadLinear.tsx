import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const UploadLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M17 9.00195C19.175 9.01395 20.353 9.11095 21.121 9.87895C22 10.758 22 12.172 22 15V16C22 18.829 22 20.243 21.121 21.122C20.243 22 18.828 22 16 22H8C5.172 22 3.757 22 2.879 21.122C2 20.242 2 18.829 2 16V15C2 12.172 2 10.758 2.879 9.87895C3.647 9.11095 4.825 9.01395 7 9.00195" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M12 15V2M9 5.5L12 2L15 5.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

UploadLinear.displayName = 'UploadLinear'

export { UploadLinear }
export default UploadLinear

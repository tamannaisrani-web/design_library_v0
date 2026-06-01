import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const DocumentSketchLinear = ({ size = 24, ...props }: IconProps): React.ReactElement => (
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
<path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path fillRule="evenodd" clipRule="evenodd" d="M8.31975 12H10.9698C11.2398 12 11.5798 12.18 11.7198 12.4L12.8498 14.1C13.0798 14.44 13.0298 14.95 12.7398 15.24L10.2798 17.7C9.92975 18.05 9.34975 18.05 8.99975 17.7L6.53975 15.24C6.24975 14.95 6.19975 14.44 6.42975 14.1L7.55975 12.4C7.71975 12.18 8.05975 12 8.31975 12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

DocumentSketchLinear.displayName = 'DocumentSketchLinear'

export { DocumentSketchLinear }
export default DocumentSketchLinear

import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.1002 7.10005C5.59725 7.10005 6.0002 6.6971 6.0002 6.20005C6.0002 5.70299 5.59725 5.30005 5.1002 5.30005C4.60314 5.30005 4.2002 5.70299 4.2002 6.20005C4.2002 6.6971 4.60314 7.10005 5.1002 7.10005Z"
      fill={color}
    />
    <path
      d="M10.9 7.10005C11.3971 7.10005 11.8 6.6971 11.8 6.20005C11.8 5.70299 11.3971 5.30005 10.9 5.30005C10.4029 5.30005 10 5.70299 10 6.20005C10 6.6971 10.4029 7.10005 10.9 7.10005Z"
      fill={color}
    />
    <path
      d="M3.90039 9.40002C4.30039 11.1 6.00039 12.4 8.00039 12.4C10.0004 12.4 11.7004 11.1 12.1004 9.40002"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
))

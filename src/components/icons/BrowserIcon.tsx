import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 14.6V3.10002C0.5 2.50002 1 1.90002 1.7 1.90002H13.5"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 1.40002V12.9C15.5 13.5 15 14.1 14.3 14.1H2.5"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
    <path
      d="M3.2002 5.69995C3.75248 5.69995 4.2002 5.25224 4.2002 4.69995C4.2002 4.14767 3.75248 3.69995 3.2002 3.69995C2.64791 3.69995 2.2002 4.14767 2.2002 4.69995C2.2002 5.25224 2.64791 5.69995 3.2002 5.69995Z"
      fill={color}
    />
    <path
      d="M6.3999 5.69995C6.95219 5.69995 7.3999 5.25224 7.3999 4.69995C7.3999 4.14767 6.95219 3.69995 6.3999 3.69995C5.84762 3.69995 5.3999 4.14767 5.3999 4.69995C5.3999 5.25224 5.84762 5.69995 6.3999 5.69995Z"
      fill={color}
    />
    <path
      d="M9.3999 5.69995C9.95219 5.69995 10.3999 5.25224 10.3999 4.69995C10.3999 4.14767 9.95219 3.69995 9.3999 3.69995C8.84762 3.69995 8.3999 4.14767 8.3999 4.69995C8.3999 5.25224 8.84762 5.69995 9.3999 5.69995Z"
      fill={color}
    />
  </svg>

))

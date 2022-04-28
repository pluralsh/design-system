import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
      >
    <path
      d="M13.7998 2.8999H5.7998"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M2.2002 2.8999L6.2002 9.8999"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M8 13.1L12 6.09998"
      stroke={color}
      strokeMiterlimit="10"
    />
    <path
      d="M2.2 5.09995C3.41503 5.09995 4.4 4.11498 4.4 2.89995C4.4 1.68492 3.41503 0.699951 2.2 0.699951C0.984974 0.699951 0 1.68492 0 2.89995C0 4.11498 0.984974 5.09995 2.2 5.09995Z"
      fill={color}
    />
    <path
      d="M13.7996 5.09995C15.0146 5.09995 15.9996 4.11498 15.9996 2.89995C15.9996 1.68492 15.0146 0.699951 13.7996 0.699951C12.5846 0.699951 11.5996 1.68492 11.5996 2.89995C11.5996 4.11498 12.5846 5.09995 13.7996 5.09995Z"
      fill={color}
    />
    <path
      d="M7.9998 15.2999C9.21483 15.2999 10.1998 14.3149 10.1998 13.0999C10.1998 11.8849 9.21483 10.8999 7.9998 10.8999C6.78478 10.8999 5.7998 11.8849 5.7998 13.0999C5.7998 14.3149 6.78478 15.2999 7.9998 15.2999Z"
      fill={color}
    />
  </svg>
))

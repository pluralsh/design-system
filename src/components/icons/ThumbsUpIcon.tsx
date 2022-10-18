import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_667_44679)">
      <path
        d="M3.23418 7.18878H1.16977C0.871164 7.18878 0.629089 7.43085 0.629089 7.72946V14.3221C0.629089 14.6207 0.871164 14.8628 1.16977 14.8628H3.23418C3.53279 14.8628 3.77487 14.6207 3.77487 14.3221V7.72946C3.77487 7.43085 3.53279 7.18878 3.23418 7.18878Z"
        stroke={color}
        strokeWidth="0.89"
        strokeMiterlimit="10"
      />
      <path
        d="M4.86249 8.35618V14.2177H5.74109C5.74109 14.2177 11.0373 15.9687 13.3168 14.7583C13.3168 14.7583 13.9926 14.4327 14.4657 13.6155L15.3075 8.06741C15.3075 8.06741 15.9219 6.18117 13.3229 6.40236L10.7977 6.78329C10.7977 6.78329 11.3691 4.92777 11.7439 4.35637C12.7146 2.55614 13.2983 -0.0735328 10.7485 1.11228C10.2079 1.48093 7.94682 5.62205 7.94682 5.62205C7.94682 5.62205 6.84703 7.50215 6.09131 7.69262C5.33558 7.88308 4.86249 8.01826 4.86249 8.35618Z"
        stroke={color}
        strokeWidth="1.04"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_667_44679">
        <rect
          width="16"
          height="16"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
))

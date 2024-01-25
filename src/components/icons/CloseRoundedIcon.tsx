import createIcon from './createIcon'

export default createIcon(({ size, color, secondaryColor = 'transparent' }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      fill={secondaryColor}
    />
    <path
      d="m8 0c-4.41829427 0-8 3.58170573-8 8s3.58170573 8 8 8 8-3.58170573 8-8-3.58170573-8-8-8zm4.47135417 11.52864583-.94270833.94270833-3.52864583-3.52864583-3.52864583 3.52864583-.94270833-.94270833 3.52864583-3.52864583-3.52864583-3.52864583.94270833-.94270833 3.52864583 3.52864583 3.52864583-3.52864583.94270833.94270833-3.52864583 3.52864583z"
      fill={color}
    />
  </svg>
))

import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
    >
      <path d="m.9515 8.4484 6.289 3.924c.255.157.54-.097.54-.485v-7.775c0-.382-.285-.643-.54-.485l-6.289 3.851c-.303.188-.303.782 0 .976z" />
      <path d="m8.4472 8.4484 3.145 1.962 3.144 1.962c.255.157.54-.097.54-.485v-7.775c0-.382-.285-.643-.54-.485l-6.289 3.851c-.303.188-.303.782 0 .976z" />
    </g>
  </svg>
))

import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m17.4557 2.95218h-14.91011c-1.07283 0-1.942074 1.00236-1.942074 2.23181v9.63201c0 1.2295.869244 2.2318 1.942074 2.2318h14.91011c1.0728 0 1.942-1.0023 1.942-2.2318v-9.63201c0-1.22945-.8692-2.23181-1.942-2.23181zm-3.0541 7.53332-6.82073 4.2522c-.27408.1723-.58732-.1096-.58732-.5247v-8.42603c0-.41504.31324-.69695.58732-.5325l6.82073 4.17388c.3289.20361.3289.85355 0 1.05715z"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="1.07"
      transform="matrix(.80546978 0 0 .80546978 -.055188 -.05469)"
    />
  </svg>
))
import { useId } from 'react'

import createIcon from './createIcon'

export default createIcon(({ size, color }) => {
  const id1 = useId()

  return (
    <svg
      width={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id={id1}>
        <path d="m0 0h20v20h-20z" />
      </clipPath>
      <g
        clipPath={`url(#${id1})`}
        transform="scale(.8)"
      >
        <path
          d="m8.47655 7.03785c.27134-.2035.60298-.28641.93462-.23365s.62563.22612.82913.49746l9.0372 10.19794-2.2009 1.8843-8.84879-10.57479c-.2035-.2638-.28641-.60298-.24119-.92708.04523-.33164.21858-.6256.48239-.8291z"
          stroke={color}
          strokeMiterlimit="10"
        />
        <g fill={color}>
          <path d="m4.02957.616104-.91201 2.351636-2.396857 1.16074 2.253647.9723 1.51499 2.12552 1.29642-2.36671 1.91447-1.17581-2.43455-.8291z" />
          <path d="m3.33789 11.3567 1.03261 1.3341-.15828 1.7713 1.33409-.9573 1.74111-.1356-.91201-1.5603-.01507-1.4999-1.31149 1.1155z" />
          <path d="m12.5459 1.2869.1507 2.20842-1.4622 1.82402 2.1556-.07537 2.005 1.12305.1432-2.3667 1.0703-1.65067-2.2386.25627z" />
        </g>
      </g>
    </svg>
  )
})
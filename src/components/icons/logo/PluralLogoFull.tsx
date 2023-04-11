import { ComponentPropsWithRef } from 'react'

export type PluralLogoProps = ComponentPropsWithRef<'svg'> & {
  color?: string
  width?: string | number
  height?: string | number
}

export default function PluralLogoFull({
  width,
  height,
  color = 'currentColor',
}: PluralLogoProps): JSX.Element {
  if (!width && !height) {
    width = 320
    height = 79
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 79"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M31.8223 51.3445C38.469 51.3445 43.8573 45.9562 43.8573 39.3095C43.8573 32.6627 38.469 27.2744 31.8223 27.2744C25.1755 27.2744 19.7873 32.6627 19.7873 39.3095C19.7873 45.9562 25.1755 51.3445 31.8223 51.3445Z" />
      <path d="M20.0558 71.3084V61.4383H51.9101C53.0289 61.4383 53.9372 60.5203 53.9372 59.3894V7.31055H64.0001V67.2279C64.0001 71.3106 59.6971 71.3106 59.6971 71.3106H20.0558V71.3084Z" />
      <path d="M43.9422 7.31055V17.1807H12.09C10.9712 17.1807 10.0629 18.0987 10.0629 19.2295V71.3084H0V11.3932C0 7.31055 4.30297 7.31055 4.30297 7.31055H43.9422V7.31055Z" />
      <path d="M96 78.6212V17.3969H103.74V23.647C105.635 21.1166 107.004 20.0072 109.429 18.5156C111.853 17.0241 114.618 16.2767 117.727 16.2767C121.705 16.2767 125.342 17.3018 128.638 19.3535C131.932 21.4051 134.512 24.1887 136.378 27.6997C138.242 31.2122 139.175 35.0516 139.175 39.2163C139.175 43.381 138.242 46.9564 136.378 50.4996C134.513 54.0428 131.949 56.8878 128.685 59.0315C125.421 61.1768 121.769 62.2494 117.729 62.2494C114.62 62.2494 111.855 61.5036 109.43 60.0121C107.006 58.5205 105.505 57.2454 103.742 55.1047V78.6212H96.0015H96ZM117.448 54.7901C121.798 54.7901 125.219 53.2986 127.706 50.3139C130.192 47.3293 131.437 43.6004 131.437 39.1242C131.437 34.648 130.178 30.9652 127.66 28.0741C125.142 25.1831 121.738 23.7376 117.45 23.7376C113.161 23.7376 109.725 25.1831 107.331 28.0741C104.937 30.9652 103.742 34.7416 103.742 39.4035C103.742 44.0654 104.922 47.719 107.285 50.5472C109.646 53.3768 113.035 54.7901 117.45 54.7901H117.448Z" />
      <path d="M209.817 61.2244H202.17V55.1047C201.4 56.2172 199.715 57.8745 197.554 59.4536C195.182 61.1876 192.067 62.251 187.902 62.251C182.927 62.251 179.09 60.4955 176.386 56.983C173.682 53.472 172.328 48.916 172.328 43.3211V17.397H180.069V41.4552C180.069 45.3099 180.923 48.4955 182.633 51.0137C184.342 53.5318 186.906 54.7901 190.325 54.7901C194.117 54.7901 197.039 53.4382 199.09 50.7329C201.142 48.029 202.167 44.4076 202.167 39.8685V17.397H209.814V61.2244H209.817Z" />
      <path d="M220.074 61.2243V17.3969H227.814V24.1135C229.222 21.6859 231.045 20.3202 233.223 18.8885C235.399 17.4598 238.258 16.7432 241.802 16.7432C242.982 16.7432 244.133 16.9304 245.252 17.3033V24.9498C244.007 24.6398 242.764 24.4833 241.523 24.4833C232.385 24.4833 227.815 30.2347 227.815 41.7344V61.2243H220.075H220.074Z" />
      <path d="M283.19 61.2244V55.1047C281.909 56.9645 279.926 58.5205 277.501 60.0121C275.077 61.5036 272.31 62.2494 269.203 62.2494C265.161 62.2494 261.51 61.1768 258.245 59.0315C254.981 56.8863 252.417 54.0428 250.552 50.4996C248.688 46.9564 247.755 43.1953 247.755 39.2163C247.755 35.2373 248.688 31.2122 250.552 27.6997C252.418 24.1887 254.996 21.4051 258.292 19.3535C261.587 17.3018 265.224 16.2767 269.203 16.2767C272.31 16.2767 275.077 17.0225 277.501 18.5156C279.926 20.0072 281.444 20.9217 283.19 23.647V17.3969H290.836V61.2244H283.19V61.2244ZM279.601 50.5472C281.993 47.719 283.19 44.0055 283.19 39.4035C283.19 34.8015 281.991 30.9636 279.601 28.0741C277.207 25.1831 273.803 23.7376 269.39 23.7376C264.977 23.7376 261.697 25.1831 259.178 28.0741C256.66 30.9652 255.401 34.648 255.401 39.1242C255.401 43.6004 256.644 47.3308 259.132 50.3139C261.618 53.2986 265.036 54.7901 269.39 54.7901C273.743 54.7901 277.207 53.3768 279.601 50.5472V50.5472Z" />
      <path d="M166.35 53.854V61.2243H152.608C152.608 61.2243 147.273 61.2243 147.273 56.2171V0H155.013V51.3404C155.013 52.7276 156.138 53.8524 157.525 53.8524H166.35V53.854Z" />
      <path d="M320 53.854V61.2243H306.258C306.258 61.2243 300.923 61.2243 300.923 56.2171V0H308.663V51.3404C308.663 52.7276 309.788 53.8524 311.175 53.8524H320V53.854Z" />
    </svg>
  )
}

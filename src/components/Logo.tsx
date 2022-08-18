import { ComponentPropsWithRef, HTMLAttributes, forwardRef } from 'react'

import PluralLogoFull from './icons/logo/PluralLogoFull'
import PluralLogoMark from './icons/logo/PluralLogoMark'
import PluralLogoWord from './icons/logo/PluralLogoWord'

import { scaling } from './LoopingLogo'

export type LogoProps = ComponentPropsWithRef<'div'> & {
  isDark?: boolean
  scale?: number;
  type?: LogoType;
}

export enum LogoType {
  Full = 'full',
  Word = 'word',
  Mark = 'mark',
}

const LoopingLogo = forwardRef<HTMLDivElement, LogoProps & HTMLAttributes<HTMLDivElement>>(({
  isDark = false,
  scale,
  type = LogoType.Full,
  ...props
},
ref): JSX.Element => {
  const color = isDark ? '#000' : '#FFF'

  return (
    <div
      ref={ref}
      style={scaling(scale)}
      {...props}
    >
      {type === LogoType.Full && <PluralLogoFull color={color} />}
      {type === LogoType.Word && <PluralLogoWord color={color} />}
      {type === LogoType.Mark && <PluralLogoMark color={color} />}
    </div>
  )
})

export default LoopingLogo

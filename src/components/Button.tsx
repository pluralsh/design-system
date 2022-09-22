import { ExtendTheme, Button as HonorableButton, mergeTheme } from 'honorable'
import type { ButtonProps as HonorableButtonProps } from 'honorable'
import styled from 'styled-components'

export type ButtonProps = HonorableButtonProps & {pulse?: boolean}

const ButtonWrapper = styled.div`
@keyframes pulse {
  0% { box-shadow: 0 0 8px 1px #fff1; }
  70% { box-shadow: 0 0 8px 3px #fff2; }
  100% { box-shadow: 0 0 8px 1px #fff1; }
}`

export default function Button({ pulse = false, ...props }: ButtonProps) {
  let themeExtension: any = {}

  if (pulse) {
    themeExtension = mergeTheme(themeExtension, {
      Button: {
        Root: [{
          boxShadow: '0 0 8px 1px #fff1',
          animation: 'pulse 4s infinite',
        }],
      },
    })
  }

  return (
    <ButtonWrapper>
      <ExtendTheme theme={themeExtension}>
        <HonorableButton {...props} />
      </ExtendTheme>
    </ButtonWrapper>
  )
}

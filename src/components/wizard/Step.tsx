import { ReactElement } from 'react'
import styled from 'styled-components'

type StepProps = {
  children: any
}

const Step = styled(UnstyledStep)(({ theme: _theme }) => ({
  maxHeight: '592px',
}))

function UnstyledStep({ children, ...props }: StepProps): ReactElement<StepProps> {
  return <div {...props}>{children}</div>
}

export { Step }

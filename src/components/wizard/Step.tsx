import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import { useActive } from './hooks'

type StepProps<T = unknown> = {
  children: ReactElement
  valid: boolean
  data: T
}

const Step = styled<StepProps>(UnstyledStep)(({ theme: _theme }) => ({
  maxHeight: '576px',
  height: '100%',
  overflow: 'auto',
}))

function UnstyledStep({
  valid, data, children, ...props
}: StepProps): ReactElement<StepProps> {
  const { active, setValid, setData } = useActive()

  useEffect(() => (!active.isDefault && !active.isPlaceholder ? setValid(valid) : undefined), [valid, setValid, active])
  useEffect(() => setData(data), [data, setData])

  return <div {...props}>{children}</div>
}

export type { StepProps }
export { Step }

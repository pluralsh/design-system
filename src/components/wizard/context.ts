import { Dispatch, createContext } from 'react'

import createIcon from '../icons/createIcon'

import { Step } from './Step'

type ContextProps = {
  steps: Array<StepConfig>
  setSteps: Dispatch<Array<StepConfig>>
  active: number
  setActive: Dispatch<number>
  completed: boolean
  setCompleted: Dispatch<boolean>
  limit: number
}

type StepConfig<T = unknown> = {
  key: string
  label?: string
  imageUrl?: string
  Icon?: ReturnType<typeof createIcon>
  isDefault?: boolean
  isPlaceholder?: boolean
  isCompleted?: boolean
  isValid?: boolean
  node?: Step
  data?: T | null
}

const WizardContext = createContext<ContextProps>(null)

export type { ContextProps, StepConfig }
export { WizardContext }

import { Dispatch, createContext } from 'react'

import { Item } from './Picker'

export type WizardState = {
  steps: Array<Item>
  setSteps: Dispatch<Array<Item>>
} & PickerState & NavigationState & StepperState & StepState

type PickerState = {
  onSelect: Dispatch<Item>
}

type NavigationState = {
  isFirst: boolean
  isLast: boolean
  current: Item

  onEdit: Dispatch<Item>
  onBack: Dispatch<void>
  onNext: Dispatch<void>
  onReset: Dispatch<void>
}

type StepState = {
  onActivate: Dispatch<Item>
}

type StepperState = {
  // steps: StepperSteps
}

const next = (steps: Array<Item>, current: number): number => {
  const currentItem = steps.at(current)
  const idx = steps.findIndex(s => s.key === currentItem.key)
  let nextIdx = idx + 1

  if (idx < 0) return -1
  if (idx === steps.length - 1) return idx

  while (steps.at(nextIdx).isPlaceholder) nextIdx++

  return nextIdx
}

const back = (steps: Array<Item>, current: number): number => {
  const currentItem = steps.at(current)
  const idx = steps.findIndex(s => s.key === currentItem.key)
  let prevIdx = idx - 1

  if (idx < 0) return -1
  if (idx === 0) return idx

  while (steps.at(prevIdx).isPlaceholder) prevIdx--

  return prevIdx
}

const WizardContext = createContext<WizardState>({} as WizardState)

export { back, next }
export default WizardContext

import { useContext } from 'react'

import Stepper, { StepperSteps } from '../Stepper'

import WizardContext from './context'
import { Item } from './Picker'

type StepperProps = {
  children?: any,
}

const toStep = (item : Item, size = 40, canComplete = true): StepperSteps[number] => ({
  key: item.key,
  stepTitle: item.label,
  imageUrl: item.imageUrl,
  IconComponent: item.Icon,
  collapseTitle: true,
  iconSize: 16,
  circleSize: size,
  hue: 'lighter',
  canComplete,
})

const toSteps = (items: Array<Item>): StepperSteps => items.map((item, idx) => {
  const [first, last] = [idx === 0, idx === items.length - 1]
  const size = first || last ? 40 : 32

  return toStep(item, size, !(first || last))
})

function ContextAwareStepper({ ...props }: StepperProps): JSX.Element {
  const { steps: items, current, isFirst } = useContext(WizardContext)
  const filteredItems = isFirst ? items : items.filter(i => !i.isPlaceholder)
  const steps: StepperSteps = Array.from(toSteps(filteredItems))

  return (
    <Stepper
      stepIndex={filteredItems.findIndex(i => i.key === current.key)}
      steps={steps}
      compact
      {...props}
    />
  )
}

export type { StepperProps }
export { ContextAwareStepper as Stepper }

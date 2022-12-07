import { useContext } from 'react'

import Stepper, { StepperSteps } from '../Stepper'

import { StepConfig } from './Picker'
import { WizardContext } from './context'
import { useActive, useNavigation } from './hooks'

type StepperProps = {}

const toStep = (item : StepConfig, size = 40, canComplete = true): StepperSteps[number] => ({
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

const toSteps = (items: Array<StepConfig>): StepperSteps => items.map((item, idx) => {
  const [first, last] = [idx === 0, idx === items.length - 1]
  const size = first || last ? 40 : 32

  return toStep(item, size, !(first || last))
})

function ContextAwareStepper(_props: StepperProps): JSX.Element {
  const { steps: items } = useContext(WizardContext)
  const { isFirst } = useNavigation()
  const { active } = useActive()
  const filteredItems = isFirst ? items : items.filter(i => !i.isPlaceholder)
  const steps: StepperSteps = Array.from(toSteps(filteredItems))

  return (
    <Stepper
      stepIndex={filteredItems.findIndex(i => i.key === active.key)}
      steps={steps}
      compact
    />
  )
}

export type { StepperProps }
export { ContextAwareStepper as Stepper }

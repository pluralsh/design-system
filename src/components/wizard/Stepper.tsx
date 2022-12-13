import { useContext } from 'react'

import Stepper, { StepperSteps } from '../Stepper'

import { StepConfig } from './Picker'
import { useActive, useNavigation } from './hooks'
import { WizardContext } from './context'

const toStepperStep = (item: StepConfig, size = 40, canComplete = true): StepperSteps[number] => ({
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

const toStepperSteps = (items: Array<StepConfig>): StepperSteps => items.map((item, idx) => {
  const [first, last] = [idx === 0, idx === items.length - 1]
  const size = first || last ? 40 : 32

  return toStepperStep(item, size, !(first || last))
})

function ContextAwareStepper(): JSX.Element {
  const { steps: wizardSteps, limit } = useContext(WizardContext)
  const { isFirst } = useNavigation()
  const { active } = useActive()
  const selected = wizardSteps.filter(step => !step.isDefault && !step.isPlaceholder)?.length || 0
  const filteredWizardSteps = isFirst && selected < limit ? wizardSteps : wizardSteps.filter(i => !i.isPlaceholder)
  const stepperSteps: StepperSteps = Array.from(toStepperSteps(filteredWizardSteps))

  return (
    <Stepper
      stepIndex={filteredWizardSteps.findIndex(i => i.key === active.key)}
      steps={stepperSteps}
      compact
    />
  )
}

export { ContextAwareStepper as Stepper }

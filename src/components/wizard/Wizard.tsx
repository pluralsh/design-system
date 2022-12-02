import styled from 'styled-components'
import { Flex } from 'honorable'
import {
  Dispatch,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import IconFrame from '../IconFrame'
import { CloseIcon } from '../../icons'

import { Navigation, NavigationProps } from './Navigation'
import WizardContext, { WizardState, back, next } from './context'
import { StepperProps } from './Stepper'
import { Step } from './Step'
import { Item } from './Picker'

const Wizard = styled(WizardUnstyled)(({ theme: _theme }) => ({
  '.top': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '40px',
    marginBottom: '24px',
  },

  '.navigation': {
    marginTop: '24px',
  },
}))

type WizardProps = {
  children?: {
    stepper?: ReactElement<StepperProps>,
    navigation?: ReactElement<NavigationProps>
  }
  steps: Array<Item>
  onClose?: Dispatch<void>
}

function WizardUnstyled({ onClose, children, ...props }: WizardProps): ReactElement<WizardProps> {
  const { current } = useContext(WizardContext)
  const { stepper, navigation } = children

  return (
    <div {...props}>
      {/* Top bar */}
      <div className="top">
        {/* Stepper */}
        {stepper && stepper}
        <Flex flexGrow={1} />
        {onClose && (
          <IconFrame
            icon={<CloseIcon color="icon-light" />}
            onClick={onClose}
            textValue="close"
            clickable
          />
        )}
      </div>
      <Step>
        {current?.node}
      </Step>
      {/* Navigation */}
      <div className="navigation">
        {navigation && navigation}
      </div>
    </div>
  )
}

function ContextAwareWizard({ steps: initialSteps, ...props }: WizardProps): JSX.Element {
  const [steps, setSteps] = useState<Array<Item>>(initialSteps)
  const [current, setCurrent] = useState<number>(0)
  const onSelect = useCallback((elem: Item) => {
    const idx = steps.findIndex(s => s.label === elem.label)
    const arr = Array.from(steps)

    if (idx > -1) {
      arr.splice(idx, 1)
    }
    else {
      arr.splice(-2, 0, elem)
    }

    setSteps(arr)
  }, [steps, setSteps])

  const onReset = useCallback(() => {
    setSteps(initialSteps)
  }, [setSteps, initialSteps])

  const onNext = useCallback(() => {
    const idx = next(steps, current)

    setCurrent(idx)
  }, [setCurrent, steps, current])

  const onBack = useCallback(() => {
    const idx = back(steps, current)

    setCurrent(idx)
  }, [setCurrent, steps, current])

  const onEdit = useCallback((item: Item) => {
    const idx = steps.findIndex(s => s.key === item.key)

    if (idx < 0) return

    setCurrent(idx)
  }, [steps])

  const context = useMemo(() => ({
    steps, setSteps, onSelect, onReset, isFirst: current === 0, isLast: current === steps.length - 1, current: steps.at(current), onNext, onBack, onEdit,
  } as WizardState), [steps, setSteps, onSelect, onReset, current, onNext])

  return (
    <WizardContext.Provider value={context}>
      <Wizard
        steps={steps}
        {...props}
      />
    </WizardContext.Provider>
  )
}

export { ContextAwareWizard as Wizard }

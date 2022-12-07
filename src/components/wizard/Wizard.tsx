import styled from 'styled-components'
import { Flex } from 'honorable'
import {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'

import IconFrame from '../IconFrame'
import { CloseIcon } from '../../icons'

import { NavigationProps } from './Navigation'
import { StepperProps } from './Stepper'
import { StepConfig } from './Picker'
import { WizardContext } from './context'
import { useActive, useWizard } from './hooks'

const Wizard = styled(WizardUnstyled)(({ theme: _theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '.header': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '40px',
    marginBottom: '24px',
  },

  '.footer': {
    marginTop: '24px',
  },
}))

type WizardProps = {
  children?: {
    stepper?: ReactElement<StepperProps>,
    navigation?: ReactElement<NavigationProps>
  }
  steps: Array<StepConfig>
  onClose: MouseEventHandler<void>
}

function WizardUnstyled({ onClose, children, ...props }: WizardProps): ReactElement<WizardProps> {
  const { active } = useActive()
  const { stepper, navigation } = children
  const hasHeader = useCallback(() => stepper || onClose, [stepper, onClose])

  return (
    <div {...props}>
      {/* Top bar */}
      {hasHeader && (
        <div className="header">
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
      )}
      {/* Step */}
      {active?.node}
      {/* Navigation */}
      {navigation && (
        <div className="footer">
          {navigation}
        </div>
      )}
    </div>
  )
}

function ContextAwareWizard({ steps: initialSteps, ...props }: WizardProps): ReactElement<WizardProps> {
  const context = useWizard(initialSteps)
  const memo = useMemo(() => context, [context])

  return (
    <WizardContext.Provider value={memo}>
      <Wizard
        steps={memo?.steps}
        {...props}
      />
    </WizardContext.Provider>
  )
}

export { ContextAwareWizard as Wizard }

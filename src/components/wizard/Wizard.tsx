import styled from 'styled-components'
import { Flex } from 'honorable'
import {
  Dispatch,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import IconFrame from '../IconFrame'
import { CloseIcon } from '../../icons'

import { NavigationProps } from './Navigation'
import { StepConfig } from './Picker'
import { WizardContext } from './context'
import { useActive, useNavigation, useWizard } from './hooks'

const Wizard = styled(WizardUnstyled)(({ theme }) => ({
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

    '&.divider': {
      paddingTop: '24px',
      borderTop: '1px solid',
      borderColor: theme.colors.border,
    },
  },
}))

type WizardProps = {
  children?: {
    stepper?: ReactElement,
    navigation?: ReactElement<NavigationProps>
  }
  steps: Array<StepConfig>
  onClose?: MouseEventHandler<void>
  onNext?: Dispatch<void>
}

function WizardUnstyled({
  onClose, onNext, children, ...props
}: WizardProps): ReactElement<WizardProps> {
  const { active: activeIdx } = useContext(WizardContext)
  const { active } = useActive()
  const { isFirst } = useNavigation()
  const { stepper, navigation } = children
  const hasHeader = useCallback(() => stepper || onClose, [stepper, onClose])

  useEffect(() => (!isFirst ? onNext && onNext() : undefined), [activeIdx, onNext, isFirst])

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
        <div className={isFirst ? 'footer' : 'footer divider'}>
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

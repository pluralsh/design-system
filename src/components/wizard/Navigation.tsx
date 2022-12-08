import styled from 'styled-components'
import {
  Dispatch,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import Button from '../Button'
import InstallIcon from '../icons/InstallIcon'

import { ReturnIcon } from '../../icons'

import { WizardContext } from './context'
import { useActive, useNavigation } from './hooks'

const Navigation = styled(NavigationUnstyled)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.medium,

  '.spacer': {
    flex: 1,
  },

  '.text': {
    color: theme.colors['text-xlight'],
    whiteSpace: 'nowrap',
    alignSelf: 'center',
  },
}))

type NavigationProps = {
  onInstall: Dispatch<void>
}

function NavigationUnstyled({ onInstall, ...props }: NavigationProps): ReactElement<NavigationProps> {
  const {
    steps, completed, setCompleted, limit,
  } = useContext(WizardContext)
  const { active, setCompleted: setStepCompleted } = useActive()
  const {
    isLast, isFirst, onReset, onBack, onNext, onReturn,
  } = useNavigation()
  const selected = steps.filter(step => !step.isDefault && !step.isPlaceholder)
  const valid = useMemo(() => active.isDefault || active.isValid, [active])
  const stepCompleted = useMemo(() => !active.isDefault && active.isCompleted, [active])

  useEffect(() => {
    const stepsCompleted = selected.every(s => s.isCompleted)

    if (!stepsCompleted) {
      setCompleted(false)

      return
    }

    return isLast ? setCompleted(true) : undefined
  }, [isLast, setCompleted, selected])

  return (
    <div {...props}>
      {completed && stepCompleted && (
        <Button
          secondary
          startIcon={<ReturnIcon />}
          disabled={!valid}
          onClick={() => onReturn()}
        >Return to install
        </Button>
      )}
      <div className="spacer" />
      {isFirst && <div className="text">{selected?.length || 0} selected {selected?.length >= limit ? '(max)' : ''}</div>}
      {isFirst && (
        <Button
          secondary
          onClick={() => onReset()}
        >Reset
        </Button>
      )}
      {!isFirst && (
        <Button
          secondary
          onClick={() => onBack()}
        >Back
        </Button>
      )}
      {!isLast && (
        <Button
          disabled={selected?.length === 0 || !valid}
          onClick={() => {
            setStepCompleted(true)
            onNext()
          }}
        >Continue
        </Button>
      )}
      {isLast && (
        <Button
          startIcon={<InstallIcon />}
          onClick={() => onInstall()}
        >Install
        </Button>
      )}
    </div>
  )
}

export type { NavigationProps }
export { Navigation }

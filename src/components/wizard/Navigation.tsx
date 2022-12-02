import styled from 'styled-components'
import { ReactElement, useContext } from 'react'

import Button from '../Button'
import InstallIcon from '../icons/InstallIcon'

import WizardContext from './context'

const Navigation = styled(NavigationUnstyled)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.medium,

  '.grid': {
    marginTop: theme.spacing.medium,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.spacing.medium,
  },

  '.spacer': {
    width: '100%',
  },

  '.text': {
    color: theme.colors['text-xlight'],
    whiteSpace: 'nowrap',
    alignSelf: 'center',
  },
}))

type NavigationProps = {
  children?: any,
}

function NavigationUnstyled({ ...props }: NavigationProps): ReactElement<NavigationProps> {
  const {
    steps, onReset, onNext, onBack, isFirst, isLast,
  } = useContext(WizardContext)
  const selected = steps.filter(step => !step.isDefault && !step.isPlaceholder)

  return (
    <div {...props}>
      <div className="spacer" />
      {isFirst && <div className="text">{selected?.length || 0} selected</div>}
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
          disabled={selected?.length === 0}
          onClick={() => onNext()}
        >Continue
        </Button>
      )}
      {isLast && (
        <Button
          startIcon={<InstallIcon />}
          disabled={selected?.length === 0}
          onClick={() => onNext()}
        >Install
        </Button>
      )}
    </div>
  )
}

export type { NavigationProps }
export { Navigation }

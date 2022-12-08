import styled, { StyledProps } from 'styled-components'
import {
  Key,
  ReactElement,
  useContext,
  useState,
} from 'react'

import { ListBox } from '../ListBox'
import { ListBoxItem } from '../ListBoxItem'
import { AppIcon } from '../../index'
import PencilIcon from '../icons/PencilIcon'

import { useNavigation } from './hooks'
import { WizardContext } from './context'

const Installer = styled(InstallerUnstyled)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '576px',
  height: '100%',
  minHeight: '200px',
  gap: theme.spacing.small,

  '.text': {
    color: theme.colors.text,
    whiteSpace: 'nowrap',
    ...theme.partials.text.body2Bold,
  },
}))

function InstallerUnstyled({ ...props }: StyledProps<unknown>): ReactElement {
  const { steps } = useContext(WizardContext)
  const { onEdit } = useNavigation()
  const apps = steps.filter(step => !step.isDefault && !step.isPlaceholder)
  const [_, setSelectedKey] = useState<Key>()

  return (
    <div {...props}>
      <div className="text">Apps to install ({apps.length}):</div>
      <ListBox
        selectedKey={null}
        onSelectionChange={key => {
          setSelectedKey(key)
        }}
      >
        {apps.map(app => (
          <ListBoxItem
            key={app.key}
            label={app.label}
            leftContent={(
              <AppIcon
                size="xsmall"
                url={app.imageUrl}
                icon={app.Icon && <app.Icon />}
              />
            )}
            rightContent={(
              <PencilIcon
                color="icon-light"
                onClick={() => onEdit(app)}
              />
            )}
          />
        ))}
      </ListBox>
    </div>
  )
}

export { Installer }

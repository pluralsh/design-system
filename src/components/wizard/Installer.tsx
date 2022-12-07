import styled from 'styled-components'
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

import { WizardContext } from './context'
import { useNavigation } from './hooks'

const Installer = styled(InstallerUnstyled)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.small,

  '.text': {
    color: theme.colors.text,
    whiteSpace: 'nowrap',
    ...theme.partials.text.body2Bold,
  },
}))

type InstallerProps = {
  children?: any,
}

function InstallerUnstyled({ ...props }: InstallerProps): ReactElement<InstallerProps> {
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

export type { InstallerProps }
export { Installer }

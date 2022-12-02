import { Button, Flex, Modal } from 'honorable'

import { useState } from 'react'

import { Wizard } from '../components/wizard/Wizard'
import { Item, Picker } from '../components/wizard/Picker'
import { Stepper } from '../components/wizard/Stepper'
import AppsIcon from '../components/icons/AppsIcon'
import InstallIcon from '../components/icons/InstallIcon'
import { Navigation } from '../components/wizard/Navigation'
import { Installer } from '../components/wizard/Installer'

export default {
  title: 'Wizard',
  component: Wizard,
}

const PICKER_ITEMS: Array<Item> = [
  {
    key: 'airflow',
    label: 'Airflow',
    imageUrl: '/logos/airflow-logo.svg',
    node: <div>Airflow</div>,
  },
  {
    key: 'airbyte',
    label: 'Airbyte',
    imageUrl: '/logos/airbyte-logo.svg',
    node: <div>Airbyte</div>,
  },
  {
    key: 'console',
    label: 'Console',
    imageUrl: '/logos/console-logo.png',
    node: <div>Console</div>,
  },
  {
    key: 'crossplane',
    label: 'Crossplane',
    imageUrl: '/logos/crossplane-logo.png',
    node: <div>Crossplane</div>,
  },
]

const INITIAL_STEPS: Array<Item> = [
  {
    key: 'apps',
    label: 'Apps',
    Icon: AppsIcon,
    node: <Picker items={PICKER_ITEMS} />,
    isDefault: true,
  },
  {
    key: 'placeholder',
    isPlaceholder: true,
  },
  {
    key: 'install',
    label: 'Install',
    Icon: InstallIcon,
    node: <Installer />,
    isDefault: true,
  },
]

function Template() {
  const [open, setOpen] = useState(true)

  return (
    <Flex>
      <Button onClick={() => setOpen(true)}>
        Open
      </Button>

      <Modal
        open={open}
        form={false}
        fontSize={16}
        onClose={() => setOpen(false)}
        width={768}
        maxWidth={768}
      >
        <Wizard
          steps={INITIAL_STEPS}
        >
          {{
            stepper: <Stepper />,
            navigation: <Navigation />,
          }}
        </Wizard>
      </Modal>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}


import {
  Button,
  Flex,
  Modal,
  P,
} from 'honorable'

import {
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Wizard } from '../components/wizard/Wizard'
import { Picker, StepConfig } from '../components/wizard/Picker'
import { Stepper } from '../components/wizard/Stepper'
import AppsIcon from '../components/icons/AppsIcon'
import InstallIcon from '../components/icons/InstallIcon'
import { Navigation } from '../components/wizard/Navigation'
import { Installer } from '../components/wizard/Installer'
import { Step } from '../components/wizard/Step'
import Input from '../components/Input'
import { useActive, useNavigation } from '../components/wizard/hooks'
import { Toast } from '../components/Toast'

export default {
  title: 'Wizard',
  component: Wizard,
}

interface FormData {
  domain: string
}

function Application({ ...props }: unknown): ReactElement {
  const { active, setData } = useActive<FormData>()
  const [domain, setDomain] = useState<string>(active?.data?.domain)

  // Build our form data
  const data = useMemo<FormData>(() => ({ domain }), [domain])

  // Update step data on change
  useEffect(() => setData(data), [domain, setData, data])

  return (
    <Step
      valid={domain?.length > 0}
      data={data}
      {...props}
    >
      <P
        overline
        color="text-xlight"
      >configure {active.label}
      </P>
      <Input
        placeholder={`${active.label} Domain`}
        value={domain}
        onChange={event => setDomain(event.target.value)}
      />
    </Step>
  )
}

const PICKER_ITEMS: Array<StepConfig> = [
  {
    key: 'airflow',
    label: 'Airflow',
    imageUrl: '/logos/airflow-logo.svg',
    node: <Application key="airflow" />,
  },
  {
    key: 'airbyte',
    label: 'Airbyte',
    imageUrl: '/logos/airbyte-logo.svg',
    node: <Application key="airbyte" />,
  },
  {
    key: 'console',
    label: 'Console',
    imageUrl: '/logos/console-logo.png',
    node: <Application key="console" />,
  },
  {
    key: 'crossplane',
    label: 'Crossplane',
    imageUrl: '/logos/crossplane-logo.png',
    node: <Application key="crossplane" />,
  },
]

const INITIAL_STEPS: Array<StepConfig> = [
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

function ModalTemplate() {
  const [open, setOpen] = useState(true)
  const [visible, setVisible] = useState(false)

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
        overflow="hidden"
      >
        <Wizard
          onClose={() => setOpen(false)}
          steps={INITIAL_STEPS}
        >
          {{
            stepper: <Stepper />,
            navigation: <Navigation onInstall={() => {
              setOpen(false)
              setVisible(true)
            }}
            />,
          }}
        </Wizard>
      </Modal>

      {visible
        && (
          <Toast
            position="bottom-right"
            onClose={() => setVisible(false)}
            margin="large"
            severity="success"
          >
            Successfully installed selected applications.
          </Toast>
        )}
    </Flex>
  )
}

function StandaloneTemplate() {
  const [visible, setVisible] = useState(false)

  return (
    <Flex
      width="100%"
      height="400px"
    >
      <Wizard
        steps={INITIAL_STEPS}
      >
        {{
          stepper: <Stepper />,
          navigation: <Navigation onInstall={() => {
            setVisible(true)
          }}
          />,
        }}
      </Wizard>

      {visible
        && (
          <Toast
            position="bottom-right"
            onClose={() => setVisible(false)}
            margin="large"
            severity="success"
          >
            Successfully installed selected applications.
          </Toast>
        )}
    </Flex>
  )
}

export const Default = ModalTemplate.bind({})

Default.args = {}

export const Standalone = StandaloneTemplate.bind({})

Standalone.args = {}

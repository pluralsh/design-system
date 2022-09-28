import {
  A, Button, Div, Flex, Span,
} from 'honorable'
import { useCallback, useState } from 'react'

import { Checklist, ChecklistItem } from '../components/Checklist'
import DownloadIcon from '../components/icons/DownloadIcon'
import GitHubLogoIcon from '../components/icons/GitHubLogoIcon'
import MarketIcon from '../components/icons/MarketIcon'
import SourcererIcon from '../components/icons/SourcererIcon'
import TerminalIcon from '../components/icons/TerminalIcon'

export default {
  title: 'Checklist',
  component: Checklist,
}

function Template() {
  const [selected, setSelected] = useState<number>(0)
  const [completed, setCompleted] = useState<number>(-1)
  const [dismiss, setDismiss] = useState(false)
  const setCompletedWrapper = useCallback((stepNr: number) => (stepNr >= completed ? setCompleted(stepNr) : null), [completed, setCompleted])

  const isCompleted = useCallback(() => completed >= selected, [completed, selected])
  const canComplete = useCallback(() => Math.abs(selected - completed) === 1, [selected, completed])

  const doneButton = (
    <Button
      small
      onClick={() => setCompletedWrapper(selected)}
      disabled={isCompleted() || !canComplete()}
    >Mark as done
    </Button>
  )

  return (
    <Flex
      grow={1}
      justify="center"
      style={{
        bottom: 0,
        position: 'fixed',
      }}
    >
      <Checklist
        headerTitle="Getting Started"
        onSelectionChange={idx => setSelected(idx)}
        active={selected}
        completed={completed}
        dismiss={dismiss}
        footerChildren={(
          <Flex
            gap="small"
          >
            <Button
              secondary
              small
            >Support
            </Button>

            <Button
              secondary
              small
            >Docs
            </Button>

            <Button
              secondary
              small
            >GitHub
            </Button>

            <Flex flex="1" />

            <Button
              small
              tertiary
              padding="none"
              onClick={() => setDismiss(true)}
            >Dismiss
            </Button>
          </Flex>
        )}
        completeChildren={(
          <Flex
            direction="column"
            gap="medium"
          >
            <Flex
              paddingHorizontal="large"
              gap="medium"
            >
              <SourcererIcon />
              <Flex
                gap="xxsmall"
                direction="column"
              >
                <Span subtitle1>Congratulations!</Span>
                <Span body2>You're well on your way to becoming an open-sourcerer.</Span>
              </Flex>
            </Flex>
            <Div
              height={1}
              backgroundColor="border-input"
            />
            <Flex
              gap="small"
              paddingHorizontal="large"
            >
              <Button
                small
                secondary
                startIcon={<GitHubLogoIcon />}
              >Star us on GitHub
              </Button>
              <Flex grow={1} />
              <Button
                small
                secondary
                onClick={() => {
                  setCompleted(-1)
                  setSelected(0)
                }}
              >Restart
              </Button>
              <Button
                small
                onClick={() => setDismiss(true)}
              >Complete
              </Button>
            </Flex>
          </Flex>
        )}
      >
        <ChecklistItem title="Setup on your own cloud">
          <Flex
            direction="column"
            gap="medium"
          >
            <Span>
              If you'd prefer to use Plural on your local machine, get started with the <A inline>Plural CLI</A>.
            </Span>
            <Flex gap="small">
              <Button
                small
                secondary
                startIcon={<TerminalIcon />}
              >Launch Cloud Shell
              </Button>

              {doneButton}
            </Flex>
          </Flex>
        </ChecklistItem>

        <ChecklistItem title="Install Plural Console">
          <Flex
            direction="column"
            gap="medium"
          >
            This will enable out-of-the-box monitoring, scaling, and security for all your applications.
            <Flex gap="small">
              <Button
                small
                secondary
                startIcon={<DownloadIcon />}
              >Install
              </Button>

              {doneButton}
            </Flex>
          </Flex>
        </ChecklistItem>
        <ChecklistItem title="Install another app">
          <Flex
            gap="small"
          >
            <Button
              small
              secondary
              startIcon={<MarketIcon />}
            >View marketplace
            </Button>

            {doneButton}
          </Flex>
        </ChecklistItem>
      </Checklist>
    </Flex>
  )
}

export const Default = Template.bind({})

Default.args = {}

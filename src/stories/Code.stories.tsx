import { Flex } from 'honorable'
import { useTheme } from 'styled-components'

import { Card, Code, WrapWithIf } from '..'

import {
  cCode,
  elixirCode,
  goCode,
  jsCode,
  rustCode,
  tfCode,
} from '../constants'

export default {
  title: 'Code',
  component: Code,
  argTypes: {
    title: {
      control: 'text',
    },
    showLineNumbers: {
      control: {
        type: 'boolean',
      },
    },
    showHeader: {
      options: [undefined, true, false],
      control: {
        type: 'select',
      },
    },
    onFillLevel: {
      options: [0, 1, 2, 3],
      control: {
        type: 'select',
        labels: {
          0: '0',
          1: '1',
          2: "2 - Shouldn't be used",
          3: "3 - Shouldn't be used",
        },
      },
    },
    height: {
      control: {
        type: 'number',
      },
    },
  },
}

function Template({ onFillLevel, ...args }: any) {
  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          fillLevel={onFillLevel}
          padding="medium"
        />
      }
    >
      <Flex
        direction="column"
        gap="medium"
      >
        <Code
          language="javascript"
          width="600px"
          {...args}
        >
          {jsCode}
        </Code>
        <Code
          language="terraform"
          width="600px"
          height="200px"
          {...args}
        >
          {tfCode}
        </Code>
        <Code
          width="600px"
          height="100px"
          {...args}
        >
          {jsCode}
        </Code>
        <Code
          language="go"
          width="400px"
          {...args}
        >
          {goCode}
        </Code>
        <Code
          width="400px"
          language="js"
          {...args}
        >
          console.warn('test')
        </Code>
        <Code
          width="400px"
          {...args}
        >
          One line
        </Code>
        <Code
          width="400px"
          height="300px"
          {...args}
        >
          One line with `height` specified
        </Code>
        <Code
          width="400px"
          {...args}
        >
          {'Two lines\nTwo lines'}
        </Code>
        <Code
          width="400px"
          {...args}
        >
          {'Three lines\nThree lines\nThree lines'}
        </Code>
        <Code
          language="javascript"
          {...args}
        >
          {jsCode}
        </Code>
      </Flex>
    </WrapWithIf>
  )
}

const tabs = [
  {
    key: 'go',
    label: 'Go',
    language: 'golang',
    content: goCode,
  },
  {
    key: 'tf',
    label: 'Terraform',
    language: 'terraform',
    content: tfCode,
  },
  {
    key: 'js',
    label: 'Javascript',
    language: 'javascript',
    content: "const oneLine = 'Just one line'",
  },
  {
    key: 'elixir',
    label: 'Elixir',
    language: 'elixir',
    content: elixirCode,
  },
  {
    key: 'c',
    label: 'C',
    language: 'c',
    content: cCode,
  },
  {
    key: 'rust',
    label: 'Rust',
    language: 'rust',
    content: rustCode,
  },
]

function WithTabsTemplate({ onFillLevel, title, ...args }: any) {
  const theme = useTheme()

  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          fillLevel={onFillLevel}
          padding="medium"
        />
      }
    >
      {' '}
      <Flex
        flexDirection="column"
        gap={theme.spacing.xxlarge}
        width="100%"
      >
        <Flex
          direction="column"
          gap="medium"
        >
          <Code
            title={title}
            tabs={tabs.slice(0, 3)}
            {...args}
          />
        </Flex>

        <Flex
          direction="column"
          gap="medium"
        >
          <Code
            title={title}
            tabs={tabs.slice(0, 3)}
            {...args}
          />
        </Flex>

        <Flex
          direction="column"
          gap="medium"
        >
          <Code
            title={title}
            tabs={tabs.slice(0, 6)}
            {...args}
          />
        </Flex>
      </Flex>
    </WrapWithIf>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: '',
  showLineNumbers: true,
  showHeader: undefined,
}

export const WithTabs = WithTabsTemplate.bind({})
WithTabs.args = {
  title: 'This is an optional title',
  showLineNumbers: true,
  showHeader: undefined,
  onFillLevel: 0,
  height: 300,
}

const flowchartMermaid = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix issue]
    E --> B
    C --> F[End]`

const sequenceMermaid = `sequenceDiagram
    participant User
    participant API
    participant Database
    
    User->>API: Request data
    API->>Database: Query
    Database-->>API: Return results
    API-->>User: Response`

const ganttMermaid = `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1           :a1, 2024-01-01, 30d
    Task 2           :a2, after a1, 20d
    section Phase 2
    Task 3           :a3, 2024-02-15, 15d`

function MermaidTemplate({ onFillLevel, ...args }: any) {
  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          fillLevel={onFillLevel}
          padding="medium"
        />
      }
    >
      <Flex
        direction="column"
        gap="medium"
      >
        <Code
          language="mermaid"
          {...args}
        >
          {`graph LR
              A[Start] --> B[Process]
              B --> C[End]`}
        </Code>
        <Code
          language="mermaid"
          {...args}
        >
          {flowchartMermaid}
        </Code>
        <Code
          language="mermaid"
          {...args}
        >
          {sequenceMermaid}
        </Code>
        <Code
          language="mermaid"
          {...args}
        >
          {ganttMermaid}
        </Code>
      </Flex>
    </WrapWithIf>
  )
}

export const Mermaid = MermaidTemplate.bind({})
Mermaid.args = {
  title: '',
  showLineNumbers: false,
  showHeader: undefined,
  onFillLevel: 0,
}

const mermaidTabs = [
  {
    key: 'flowchart',
    label: 'Flowchart',
    language: 'mermaid',
    content: flowchartMermaid,
  },
  {
    key: 'sequence',
    label: 'Sequence',
    language: 'mermaid',
    content: sequenceMermaid,
  },
  {
    key: 'gantt',
    label: 'Gantt',
    language: 'mermaid',
    content: ganttMermaid,
  },
]

function MermaidWithTabsTemplate({ onFillLevel, title, ...args }: any) {
  const theme = useTheme()

  return (
    <WrapWithIf
      condition={onFillLevel > 0}
      wrapper={
        <Card
          fillLevel={onFillLevel}
          padding="medium"
        />
      }
    >
      <Flex
        flexDirection="column"
        gap={theme.spacing.xxlarge}
        width="100%"
      >
        <Flex
          direction="column"
          gap="medium"
        >
          <Code
            title={title}
            tabs={mermaidTabs}
            width="800px"
            height="400px"
            {...args}
          />
        </Flex>
      </Flex>
    </WrapWithIf>
  )
}

export const MermaidWithTabs = MermaidWithTabsTemplate.bind({})
MermaidWithTabs.args = {
  title: 'Mermaid Diagrams',
  showLineNumbers: false,
  showHeader: undefined,
  onFillLevel: 0,
}

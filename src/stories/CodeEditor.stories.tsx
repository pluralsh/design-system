import { Flex } from 'honorable'

import { Card, CodeEditor, WrapWithIf } from '..'

import { goCode, jsCode, tfCode } from '../constants'

export default {
  title: 'CodeEditor',
  component: CodeEditor,
  argTypes: {
    title: {
      control: 'text',
    },
    showLineNumbers: {
      control: {
        type: 'boolean',
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
      wrapper={(
        <Card
          fillLevel={onFillLevel}
          padding="medium"
        />
      )}
    >
      <Flex
        direction="column"
        gap="medium"
      >
        <CodeEditor
          language="javascript"
          width="600px"
          {...args}
        >
          {jsCode}
        </CodeEditor>
        <CodeEditor
          language="terraform"
          width="600px"
          height="200px"
          {...args}
        >
          {tfCode}
        </CodeEditor>
        <CodeEditor
          width="600px"
          height="100px"
          {...args}
        >
          {jsCode}
        </CodeEditor>
        <CodeEditor
          language="go"
          width="400px"
          {...args}
        >
          {goCode}
        </CodeEditor>
        <CodeEditor
          width="400px"
          language="js"
          {...args}
        >
          console.warn('test')
        </CodeEditor>
        <CodeEditor
          width="400px"
          {...args}
        >
          One line
        </CodeEditor>
        <CodeEditor
          width="400px"
          height="300px"
          {...args}
        >
          One line with `height` specified
        </CodeEditor>
        <CodeEditor
          width="400px"
          {...args}
        >
          {'Two lines\nTwo lines'}
        </CodeEditor>
        <CodeEditor
          width="400px"
          {...args}
        >
          {'Three lines\nThree lines\nThree lines'}
        </CodeEditor>
        <CodeEditor
          language="javascript"
          {...args}
        >
          {jsCode}
        </CodeEditor>
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

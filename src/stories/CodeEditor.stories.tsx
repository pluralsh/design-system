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
          value={jsCode}
          width="600px"
          {...args}
        />
        <CodeEditor
          language="hcl"
          value={tfCode}
          width="600px"
          height="200px"
          {...args}
        />
        <CodeEditor
          value={jsCode}
          width="600px"
          height="100px"
          {...args}
        />
        <CodeEditor
          language="go"
          value={goCode}
          width="400px"
          {...args}
        />
        <CodeEditor
          language="js"
          value="console.warn('test')"
          width="400px"
          {...args}
        />
        <CodeEditor
          value="One line"
          width="400px"
          {...args}
        />
        <CodeEditor
          value="One line with `height` specified"
          width="400px"
          height="300px"
          {...args}
        />
        <CodeEditor
          value={'Two lines\nTwo lines'}
          width="400px"
          {...args}
        />
        <CodeEditor
          value={'Three lines\nThree lines\nThree lines'}
          width="400px"
          {...args}
        />
        <CodeEditor
          height="100px"
          width="400px"
          {...args}
        />
        <CodeEditor
          language="javascript"
          value={jsCode}
          {...args}
        />
      </Flex>
    </WrapWithIf>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: '',
  showLineNumbers: true,
}

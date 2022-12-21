import {
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { Button, Flex, P } from 'honorable'
import { useTheme } from 'styled-components'

import Editor, { useMonaco } from '@monaco-editor/react'

import { editorTheme } from '../theme/editor'

import Card, { CardProps } from './Card'
import { toFillLevel, useFillLevel } from './contexts/FillLevelContext'

type CodeEditorProps = Omit<CardProps, 'children'> & {
  value?: string
  onChange?: (value: string | undefined) => void,
  language?: string
  options?: object
  save?: boolean
  saving?: boolean
  onSave?: () => void
  saveLabel?: string
}

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  language: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
  save: PropTypes.bool,
  saving: PropTypes.bool,
  onSave: PropTypes.func,
  saveLabel: PropTypes.string,
}

const defaultOptions = {
  fontFamily: '"Monument Mono", monospace',
  fontSize: '14px',
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 5,
  },
  scrollBeyondLastLine: false,
}

  // TODO: If height is unspecified then fit content.
function CodeEditorRef({
  value,
  onChange,
  language,
  options,
  save = false,
  saving = false,
  onSave,
  saveLabel = 'Save',
  ...props
}: CodeEditorProps,
ref: RefObject<any>) {
  const parentFillLevel = useFillLevel()
  const theme = useTheme()
  const monaco = useMonaco()
  const [current, setCurrent] = useState<string>(value)
  const [copied, setCopied] = useState<boolean>(false)
  const changed = current !== value

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  useEffect(() => monaco?.editor?.defineTheme('plural', editorTheme), [monaco])

  return (
    <Card
      ref={ref}
      fillLevel={toFillLevel(Math.min(parentFillLevel + 1, 2))}
      borderColor={
        parentFillLevel >= 1
          ? theme.colors['border-fill-three']
          : theme.colors['border-fill-two']
      }
      {...props}
      display="flex"
      flexDirection="column"
    >
      <Flex
        overflow="hidden"
        position="relative"
        direction="column"
        basis="100%"
        grow={1}
        shrink={1}
      >
        <Editor
          defaultLanguage={language}
          defaultValue={value}
          onChange={v => {
            setCurrent(v)
            onChange(v)
          }}
          options={{ ...defaultOptions, ...options }}
          theme="plural"
        />
      </Flex>
      {save && (
        <Flex
          align="center"
          borderTop="1px solid border"
          gap="medium"
          justify="end"
          padding="large"
        >
          {changed && <P color="text-light">Unsaved changes</P>}
          <Button
            disabled={!changed}
            loading={saving}
            onClick={onSave}
          >
            {saveLabel}
          </Button>
        </Flex>
      )}
    </Card>
  )
}

const CodeEditor = forwardRef(CodeEditorRef)

CodeEditor.propTypes = propTypes

export default CodeEditor
export type { CodeEditorProps }

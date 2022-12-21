import { useEffect, useState } from 'react'
import { Button, Flex, P } from 'honorable'
import { useTheme } from 'styled-components'

import Editor, { useMonaco } from '@monaco-editor/react'

import { merge } from 'lodash'

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
  onSave?: (value: string | undefined) => void,
  saveLabel?: string
  height?: string | number
}

const defaultOptions = {
  fontFamily: '"Monument Mono", monospace',
  fontSize: '14px',
  padding: {
    bottom: '16px',
    top: '16px',
  },
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 5,
  },
  scrollBeyondLastLine: false,
}

export default function CodeEditor({
  value,
  onChange,
  language,
  options,
  save = false,
  saving = false,
  onSave,
  saveLabel = 'Save',
  height = '100%',
  ...props
}: CodeEditorProps) {
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

  useEffect(() => {
    monaco?.editor?.defineTheme('plural', editorTheme)
    monaco?.editor?.setTheme('plural')
  }, [monaco])

  return (
    <Card
      fillLevel={toFillLevel(Math.min(parentFillLevel + 1, 2))}
      borderColor={
        parentFillLevel >= 1
          ? theme.colors['border-fill-three']
          : theme.colors['border-fill-two']
      }
      display="flex"
      flexDirection="column"
      flexGrow={1}
      overflow="hidden"
      height={height}
      {...props}
    >
      <Editor
        language={language}
        value={value}
        onChange={v => {
          setCurrent(v)
          if (onChange) onChange(v)
        }}
        options={merge(defaultOptions, options)}
        theme="plural"
      />
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
            onClick={() => {
              if (onSave) onSave(current)
            }}
          >
            {saveLabel}
          </Button>
        </Flex>
      )}
    </Card>
  )
}

export type { CodeEditorProps }

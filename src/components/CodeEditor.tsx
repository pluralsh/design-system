import {
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { Button, Flex } from 'honorable'
import styled, { useTheme } from 'styled-components'

import Editor, { useMonaco } from '@monaco-editor/react'

import { editorTheme } from '../theme/editor'

import CopyIcon from './icons/CopyIcon'
import Card, { CardProps } from './Card'
import CheckIcon from './icons/CheckIcon'
import { toFillLevel, useFillLevel } from './contexts/FillLevelContext'

type CodeEditorProps = Omit<CardProps, 'children'> & {
  value?: string
  onChange?: (value: string | undefined) => void,
  language?: string
  options?: object
}

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  language: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
}

const defaultOptions = {
  fontFamily: '"Monument Mono", monospace',
  fontSize: '14px',
  minimap: {
    enabled: false,
  },
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 5,
  },
  scrollBeyondLastLine: false,
}

function CopyButtonBase({
  copied,
  handleCopy,
  className,
}: {
  copied: boolean
  handleCopy: () => any
  className?: string
}) {
  return (
    <Button
      className={className}
      position="absolute"
      floating
      small
      startIcon={copied ? <CheckIcon /> : <CopyIcon />}
      onClick={handleCopy}
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
const CopyButton = styled(CopyButtonBase)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing.medium,
  top: theme.spacing.medium,
  boxShadow: theme.boxShadows.slight,
}))

function CodeRef({
  value,
  onChange,
  language,
  options,
  ...props
}: CodeEditorProps,
ref: RefObject<any>) {
  const parentFillLevel = useFillLevel()
  const theme = useTheme()
  const monaco = useMonaco()
  const [current, setCurrent] = useState<string>(value)
  const [copied, setCopied] = useState<boolean>(false)
  const handleCopy = useCallback(() => window.navigator.clipboard
    .writeText(current).then(() => setCopied(true)), [current])

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
    >
      <Flex
        overflow="hidden"
        position="relative"
        direction="column"
        // height="100%"
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
        <CopyButton
          copied={copied}
          handleCopy={handleCopy}
        />
      </Flex>
    </Card>
  )
}

const CodeEditor = styled(forwardRef(CodeRef))(_ => ({
  [CopyButton]: {
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease',
  },
  [`&:hover ${CopyButton}`]: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: 'opacity 0.2s ease',
  },
}))

CodeEditor.propTypes = propTypes

export default CodeEditor
export type { CodeEditorProps }

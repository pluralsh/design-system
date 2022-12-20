import { RefObject, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Flex } from 'honorable'
import styled, { useTheme } from 'styled-components'

import Editor from '@monaco-editor/react'

import CopyIcon from './icons/CopyIcon'
import Card, { CardProps } from './Card'
import CheckIcon from './icons/CheckIcon'
import { toFillLevel, useFillLevel } from './contexts/FillLevelContext'

type CodeEditorProps = Omit<CardProps, 'children'> & {
  language?: string
  value?: string
  onChange?: (value: string | undefined, ev: any) => void,
  options?: any
}

const propTypes = {
  language: PropTypes.string,
  showLineNumbers: PropTypes.bool,
}

const defaultOptions = {
  fontFamily: '"Monument Mono", monospace',
  fontSize: '14px',
  minimap: {
    enabled: false,
  },
  scrollbar: {
    verticalScrollbarSize: 5,
  },
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
const CopyButton = styled(CopyButtonBase)<{ verticallyCenter: boolean }>(({ verticallyCenter, theme }) => ({
  position: 'absolute',
  right: theme.spacing.medium,
  top: verticallyCenter ? '50%' : theme.spacing.medium,
  transform: verticallyCenter ? 'translateY(-50%)' : 'none',
  boxShadow: theme.boxShadows.slight,
}))

// function CodeContent({
//   children,
//   hasSetHeight,
//   ...props
// }: ComponentProps<typeof Highlight> & { hasSetHeight: boolean }) {
//   const [copied, setCopied] = useState(false)

//   const multiLine = !!codeString.match(/\r?\n/) || hasSetHeight
//   const handleCopy = useCallback(() => window.navigator.clipboard
//     .writeText(codeString)
//     .then(() => setCopied(true)),
//   [codeString])

//   useEffect(() => {
//     if (copied) {
//       const timeout = setTimeout(() => setCopied(false), 1000)

//       return () => clearTimeout(timeout)
//     }
//   }, [copied])

//   if (typeof children !== 'string') {
//     throw new Error('Code component expects a string as its children')
//   }

//   return (
//     <Div
//       height="100%"
//       overflow="hidden"
//       alignItems="center"
//     >
//       <CopyButton
//         copied={copied}
//         handleCopy={handleCopy}
//         verticallyCenter={!multiLine}
//       />
//       {/* <Div
//         paddingHorizontal="medium"
//         paddingVertical={multiLine ? 'medium' : 'small'}
//       > */}

//       {/* <Highlight {...props}>{codeString}</Highlight> */}
//       {/* </Div> */}
//     </Div>
//   )
// }

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

  // props.height = props.height || undefined
  // const hasSetHeight = !!props.height || !!props.minHeight

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
        height="100%"
      >
        <Editor
          defaultLanguage={language}
          defaultValue={value}
          onChange={onChange}
          options={{ ...defaultOptions, ...options }}
          theme="vs-dark"
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

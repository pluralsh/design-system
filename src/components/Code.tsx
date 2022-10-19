import {
  RefObject, forwardRef, useEffect, useState,
} from 'react'
import { Button, Div, Flex } from 'honorable'

import styled from 'styled-components'

import CopyIcon from './icons/CopyIcon'
import Card, { CardProps } from './Card'
import CheckIcon from './icons/CheckIcon'
import Highlight from './Highlight'
import { FillLevel, useFillLevel } from './contexts/FillLevelContext'
import FileIcon from './icons/FileIcon'

type CodeProps = Omit<CardProps, 'children'> & {
  children: string
  language?: string
  showLineNumbers?: boolean
}

const propTypes = {}

const CodeHeader = styled.div<{ fillLevel: FillLevel }>(({ fillLevel, theme }) => ({
  ...theme.partials.text.overline,
  minHeight: theme.spacing.xlarge + theme.spacing.xsmall * 2,
  padding: `${theme.spacing.xsmall}px ${theme.spacing.medium}px`,
  borderBottom:
      fillLevel >= 1 ? theme.borders['fill-three'] : theme.borders['fill-two'],
  color: 'text-light',
  backgroundColor:
      fillLevel >= 1 ? theme.colors['fill-three'] : theme.colors['fill-two'],
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xsmall,
}))

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

function CodeRef({
  children, language, showLineNumbers, ...props
}: CodeProps,
ref: RefObject<any>) {
  const [copied, setCopied] = useState(false)
  const [hover, setHover] = useState(false)
  const fillLevel = useFillLevel()

  if (typeof children !== 'string') {
    throw new Error('Code component expects a string as its children')
  }

  const showHeader = !!language

  children = children.trim()
  const multiLine = !!children.match(/\r?\n/)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = () => window.navigator.clipboard.writeText(children).then(() => setCopied(true))

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <Flex
        position="relative"
        direction="column"
        height="100%"
      >
        {showHeader && (
          <CodeHeader fillLevel={fillLevel}>
            <FileIcon />
            <div>{language}</div>
          </CodeHeader>
        )}
        <Div
          position="relative"
          height="100%"
          overflow="hidden"
        >
          <Div
            height="100%"
            overflow="auto"
            alignItems="center"
          >
            {hover && (
              <CopyButton
                copied={copied}
                handleCopy={handleCopy}
                verticallyCenter={!multiLine}
              />
            )}
            <Div
              paddingHorizontal="medium"
              paddingVertical={multiLine ? 'medium' : 'small'}
            >
              <Highlight
                showLineNumbers={showLineNumbers}
                language={language}
              >
                {children}
              </Highlight>
            </Div>
          </Div>
        </Div>
      </Flex>
    </Card>
  )
}

const Code = forwardRef(CodeRef)

Code.propTypes = propTypes

export default Code

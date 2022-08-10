import {
  forwardRef, useEffect, useRef, useState,
} from 'react'
import {
  Button, Div, FlexProps, Pre,
} from 'honorable'
import hljs from 'highlight.js'

import CopyIcon from './icons/CopyIcon'
import Card from './Card'
import CheckIcon from './icons/CheckIcon'

type CodeProps = FlexProps & {
  children: string,
  language: string,
}

type HighlightProps = FlexProps & {
  language: string
}

const propTypes = {}

function Highlight({ language, children } : HighlightProps) {
  const codeRef = useRef()

  useEffect(() => {
    if (hljs.getLanguage(language) && codeRef.current) {
      hljs.initHighlighting()
      hljs.highlightBlock(codeRef.current)
    }
  }, [language, children])

  return (
    <Pre
      margin="0"
      padding="0"
      background="none"
      fontFamily="Monument Mono, monospace"
      className={(language && `language-${language}`) || 'nohighlight'}
      ref={codeRef}
    >
      {children}
    </Pre>
  )
}

function CodeRef({ children, language, ...props }: CodeProps) {
  const [copied, setCopied] = useState(false)
  const [hover, setHover] = useState(false)

  if (typeof children !== 'string') throw new Error('Code component expects a string as its children')

  useEffect(() => {
    if (copied) {
      return () => clearTimeout(setTimeout(() => setCopied(false), 1000))
    }
  }, [copied])

  const handleCopy = () => window.navigator.clipboard.writeText(children).then(() => setCopied(true))

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Div
        {...props}
        position="relative"
        padding={null}
      >
        {hover && (
          <Button
            position="absolute"
            right="24px"
            top="24px"
            tertiary
            backgroundColor="fill-three"
            _hover={{ backgroundColor: 'fill-one-hover' }}
            startIcon={copied ? <CheckIcon /> : <CopyIcon />}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        )}
        <Div
          overflowX="auto"
          padding="large"
        >
          <Highlight language={language}>{children}</Highlight>
        </Div>
      </Div>
    </Card>

  )
}

const Code = forwardRef(CodeRef)

Code.propTypes = propTypes

export default Code

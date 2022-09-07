import { forwardRef, useEffect, useRef } from 'react'
import { FlexProps, Pre } from 'honorable'
import hljs from 'highlight.js/lib/core'

import styled from 'styled-components'

const StyledCode = styled.div(({ theme }) => `
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #ebeff0;
  font-family: ${theme.fontFamilies.mono};
}

.hljs ::selection,
.hljs::selection {
  background-color: #383a62;
  color: #ebeff0;
}

.hljs-comment {
  color: #747b8b;
}

.hljs-tag {
  color: #c5c9d3;
}

.hljs-operator,
.hljs-punctuation,
.hljs-subst {
  color: #ebeff0;
}

.hljs-operator {
  opacity: 0.7;
}

.hljs-bullet,
.hljs-deletion,
.hljs-name,
.hljs-selector-tag,
.hljs-template-variable,
.hljs-variable {
  color: #c5c9d3;
}

.hljs-attr,
.hljs-link,
.hljs-literal,
.hljs-number,
.hljs-symbol,
.hljs-variable.constant_ {
  color: #969af8;
}

.hljs-class .hljs-title,
.hljs-title,
.hljs-title.class_ {
  color: #7075f5;
}

.hljs-strong {
  font-weight: 700;
  color: #7075f5;
}
.hljs-addition,
.hljs-code,
.hljs-string,
.hljs-title.class_.inherited__ {
  color: #8fd6ff;
}
.hljs-built_in,
.hljs-doctag,
.hljs-keyword.hljs-atrule,
.hljs-quote,
.hljs-regexp {
  color: #c2e9ff;
}

.hljs-attribute,
.hljs-function .hljs-title,
.hljs-section,
.hljs-title.function_,
.ruby .hljs-property {
  color: #3cecaf;
}

.diff .hljs-meta,
.hljs-keyword,
.hljs-template-tag,
.hljs-type {
  color: #fff48f;
}

.hljs-emphasis {
  color: #fff48f;
  font-style: italic;
}

.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-meta .hljs-string {
  color: #99f5d5;
}

.hljs-meta .hljs-keyword,
.hljs-meta-keyword {
  font-weight: 700;
}`)

type HighlightProps = FlexProps & {
  language: string
}

const propTypes = {}

function HighlightRef({ language, children } : HighlightProps) {
  if (typeof children !== 'string') throw new Error('Highlight component expects a string as its children')

  const codeRef = useRef()

  useEffect(() => {
    if (hljs.getLanguage(language) && codeRef.current) {
      hljs.initHighlighting()
      hljs.highlightBlock(codeRef.current)
    }
  }, [language, children])

  return (
    <StyledCode>
      <Pre
        background="none"
        margin="0"
        padding="large"
        lineHeight="22px"
        className={(language && `language-${language}`) || 'nohighlight'}
        ref={codeRef}
      >
        {children}
      </Pre>
    </StyledCode>
  )
}

const Highlight = forwardRef(HighlightRef)

Highlight.propTypes = propTypes

export default Highlight

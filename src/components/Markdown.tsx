import { Div } from 'honorable'
import { Children, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import styled, { useTheme } from 'styled-components'

import { isExternalUrl, removeTrailingSlashes } from '../utils/urls'

import MultilineCode from './Code'
import InlineCode from './InlineCode'

type MarkdownProps = {
  text: string
  gitUrl?: string
  mainBranch?: string
}

const render = ({ component: Component, props: extraProps }: any) =>
  function renderComponent({ node: _, ...props }: any) {
    return (
      <Component
        {...{
          ...props,
          ...extraProps,
        }}
      />
    )
  }

function getLastStringChild(children: any, depth = 0): any {
  let lastChild = null

  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      lastChild = child
    } else if (child.props && child.props.children && depth < 3) {
      lastChild = getLastStringChild(child.props.children, depth + 1)
    }
  })

  return lastChild
}

function MarkdownPreformatted({ children, ...props }: any) {
  let lang

  const className = children?.[0]?.props?.className

  if (className && typeof className === 'string') {
    lang = /language-(\w+)/.exec(className)?.[1] || ''
  }
  const stringChild = getLastStringChild(children) || ''

  return (
    <Div mb={1}>
      <MultilineCode
        language={lang}
        {...props}
      >
        {stringChild}
      </MultilineCode>
    </Div>
  )
}
const commonCfg = { shouldForwardProp: () => true }

const MdBlockquote = styled.blockquote.withConfig(commonCfg)(({ theme }) => ({
  position: 'relative',
  ...theme.partials.text.body1,
  color: theme.colors['text-light'],
  margin: 0,
  marginLeft: theme.spacing.xlarge - 1,
  borderLeft: `2px solid ${theme.colors.border}`,
  padding: '0',
  paddingLeft: theme.spacing.xlarge - 1,
  boxShadow: 'none',
  '& p': {
    ...theme.partials.text.body1,
    color: theme.colors['text-light'],
  },
}))
const MdUl = styled.ul.withConfig(commonCfg)(({ theme }) => ({
  paddingLeft: theme.spacing.xlarge,
  marginBottom: theme.spacing.small,
}))
const MdOl = styled.ol.withConfig(commonCfg)(({ theme }) => ({
  paddingLeft: theme.spacing.xlarge,
  marginBottom: theme.spacing.small,
}))
const MdLi = styled.li.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body2LooseLineHeight,
  marginTop: theme.spacing.xxsmall,
}))
const MdH1 = styled.h1.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.title2,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdH2 = styled.h2.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.subtitle1,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdH3 = styled.h3.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.subtitle2,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdH4 = styled.h4.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdH5 = styled.h5.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdH6 = styled.h6.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  marginTop: theme.spacing.large,
  marginBottom: theme.spacing.small,
  '&:first-of-type': { marginTop: 0 },
}))
const MdImg = styled.img(() => ({ display: 'inline', maxWidth: '100%' }))
const MdP = styled.p.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body2LooseLineHeight,
  marginBottom: theme.spacing.medium,
}))
const MdDiv = styled.div.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body2LooseLineHeight,
  marginBottom: theme.spacing.medium,
}))
const MdA = styled.a.withConfig(commonCfg)(({ theme }) => ({
  display: 'inline',
  ...theme.partials.text.inlineLink,
}))
const MdSpan = styled.span.withConfig(commonCfg)((_p) => ({
  verticalAlign: 'bottom',
}))
const MdHr = styled.hr.withConfig(commonCfg)(({ theme }) => ({
  '&::before': {
    content: '""',
    display: 'table',
  },
  '&::after': {
    content: '""',
    clear: 'both',
    display: 'table',
  },
  height: '1px',
  backgroundColor: theme.colors.border,
  border: 0,
  padding: 0,
  margin: `${theme.spacing.xlarge}px ${theme.spacing.large}px`,
}))

function MarkdownImage({
  src,
  gitUrl,
  style,
  mainBranch = 'master',
  ...props
}: any) {
  const theme = useTheme()

  // Convert local image paths to full path on github
  if (gitUrl && src && !isExternalUrl(src)) {
    src = src.replace(/^\//, '')
    src = `${removeTrailingSlashes(gitUrl)}/raw/${mainBranch}/${src}`
  }
  // Check for github's light/dark mode tags
  // https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/
  if (
    (src?.endsWith?.('#gh-light-mode-only') && theme.mode === 'dark') ||
    (src?.endsWith?.('#gh-dark-mode-only') && theme.mode === 'light')
  ) {
    style = { ...style, display: 'none' }
  }

  return (
    <MdImg
      src={src}
      maxWidth="100%"
      display="inline"
      {...props}
      style={{ ...style, maxWidth: '100%' }}
    />
  )
}

function MarkdownLink({
  href,
  gitUrl,
  mainBranch,
  ...props
}: {
  href: string
  gitUrl: string
  mainBranch: string
}) {
  // Convert local readme hrefs to full path on github
  if (gitUrl && href && !isExternalUrl(href)) {
    // Remove potential starting slash
    href = href.replace(/^\//, '')
    href = `${removeTrailingSlashes(gitUrl)}/blob/${mainBranch}/${href}`
  }

  return (
    <MdA
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    />
  )
}

function Markdown({ text, gitUrl, mainBranch }: MarkdownProps) {
  return useMemo(
    () => (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote: render({ component: MdBlockquote }),
          ul: render({ component: MdUl }),
          ol: render({ component: MdOl }),
          li: render({ component: MdLi }),
          h1: render({ component: MdH1 }),
          h2: render({ component: MdH2 }),
          h3: render({ component: MdH3 }),
          h4: render({ component: MdH4 }),
          h5: render({ component: MdH5 }),
          h6: render({ component: MdH6 }),
          img: render({
            component: MarkdownImage,
            props: { gitUrl, mainBranch },
          }),
          p: render({ component: MdP }),
          div: render({ component: MdDiv }),
          a: render({
            component: MarkdownLink,
            props: { gitUrl, mainBranch },
          }),
          span: render({ component: MdSpan }),
          code: render({ component: InlineCode }),
          pre: render({
            component: MarkdownPreformatted,
            props: { marginBottom: 'medium' },
          }),
          hr: render({ component: MdHr }),
        }}
      >
        {text}
      </ReactMarkdown>
    ),
    [text, gitUrl, mainBranch]
  )
}

export default Markdown

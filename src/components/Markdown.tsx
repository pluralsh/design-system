import { Children, ReactElement, ReactNode, useMemo } from 'react'
import ReactMarkdown, { Options as ReactMarkdownOptions } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import styled, { useTheme } from 'styled-components'

import { isExternalUrl, removeTrailingSlashes } from '../utils/urls'

import { styledTheme } from '../theme'

import MultilineCode from './Code'
import InlineCode from './InlineCode'

type MarkdownProps = {
  text: string
  gitUrl?: string
  mainBranch?: string
} & ReactMarkdownOptions

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

function MarkdownPreformatted({ children }: { children?: ReactNode }) {
  const theme = useTheme()
  let lang

  const className = (children as ReactElement<any, any>)?.props?.className ?? ''

  if (className && typeof className === 'string')
    lang = /language-(\w+)/.exec(className)?.[1] || ''

  const stringChild = getLastStringChild(children) || ''

  return (
    <MultilineCode
      css={{
        marginTop: theme.spacing.xxsmall,
        'h1 + &, h2 + &, h3 + &, h4 + &, h5 + &, h6 + &': {
          marginTop: theme.spacing.medium,
        },
      }}
      language={lang}
    >
      {stringChild}
    </MultilineCode>
  )
}
const commonCfg = { shouldForwardProp: () => true }
const spacingReset = {
  padding: 0,
  margin: 0,
  'hr + &': {
    paddingTop: styledTheme.spacing.medium,
  },
}

const MdBlockquote = styled.blockquote.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  position: 'relative',
  ...theme.partials.text.body1,
  color: theme.colors['text-light'],
  paddingTop: theme.spacing.small,
  marginLeft: theme.spacing.xlarge - 1,
  boxShadow: 'none',
  '& p': {
    borderLeft: `2px solid ${theme.colors.border}`,
    paddingLeft: theme.spacing.xlarge - 1,
    ...theme.partials.text.body1,
    color: theme.colors['text-light'],
  },
}))
const MdUl = styled.ul.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  paddingLeft: theme.spacing.xlarge,
  paddingTop: theme.spacing.medium,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xsmall,
  'ul &, ol &': {
    paddingTop: theme.spacing.xxsmall,
    gap: theme.spacing.xxsmall,
  },
}))
const MdOl = styled.ol.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  paddingLeft: theme.spacing.xlarge,
  paddingTop: theme.spacing.medium,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xsmall,
  'ul &, ol &': {
    paddingTop: theme.spacing.xxsmall,
    gap: theme.spacing.xxsmall,
  },
}))
const MdLi = styled.li.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.body2LooseLineHeight,
  color: theme.colors['text-light'],
}))
const MdH1 = styled.h1.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.title2,
  color: theme.colors.text,
  margin: 0,
  paddingTop: theme.spacing.xlarge,
  '&:first-child': { paddingTop: 0 },
}))
const MdH2 = styled.h2.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.subtitle1,
  color: theme.colors.text,
  margin: 0,
  paddingTop: theme.spacing.xlarge,
  '&:first-child': { paddingTop: 0 },
}))
const MdH3 = styled.h3.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.subtitle2,
  color: theme.colors.text,
  paddingTop: theme.spacing.xlarge,
  '&:first-child': { paddingTop: 0 },
}))
const MdH4 = styled.h4.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  paddingTop: theme.spacing.large,
  '&:first-child': { paddingTop: 0 },
}))
const MdH5 = styled.h5.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  paddingTop: theme.spacing.large,
  '&:first-child': { paddingTop: 0 },
}))
const MdH6 = styled.h6.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.body1Bold,
  color: theme.colors.text,
  paddingTop: theme.spacing.large,
  '&:first-child': { paddingTop: 0 },
}))
const MdImg = styled.img(() => ({ display: 'inline', maxWidth: '100%' }))
const MdP = styled.p.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  ...theme.partials.text.body2LooseLineHeight,
  color: theme.colors['text-light'],
  paddingTop: theme.spacing.large,
  'h1 + &, h2 + &, h3 + &, h4 + &, h5 + &, h6 + &': {
    paddingTop: theme.spacing.small,
  },
  '&:first-child': { paddingTop: 0 },
}))
const MdDiv = styled.div.withConfig(commonCfg)(({ theme }) => ({
  ...theme.partials.text.body2LooseLineHeight,
  marginBottom: theme.spacing.medium,
}))
const MdA = styled.a.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
  display: 'inline',
  ...theme.partials.text.inlineLink,
}))
const MdSpan = styled.span.withConfig(commonCfg)((_p) => ({
  ...spacingReset,
  verticalAlign: 'bottom',
}))
const MdHr = styled.hr.withConfig(commonCfg)(({ theme }) => ({
  ...spacingReset,
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
  margin: `${theme.spacing.medium}px ${theme.spacing.large}px 0`,
}))

const MdTable = styled.table(({ theme }) => ({
  paddingTop: theme.spacing.medium,
  borderCollapse: 'separate',
  borderSpacing: 0,
  tableLayout: 'fixed',
  width: '100%',
}))

const MdTh = styled.th(({ theme }) => ({
  padding: theme.spacing.small,
  height: 40,
  textAlign: 'left',
  backgroundColor: theme.colors['fill-one'],
  border: theme.borders['fill-two'],
  borderBottom: theme.borders.default,
  // top rounded table corners
  'tr:first-child &': {
    '&:first-child': { borderTopLeftRadius: theme.borderRadiuses.large },
    '&:last-child': { borderTopRightRadius: theme.borderRadiuses.large },
  },
  // remove inner borders
  '&:not(:last-child)': { borderRight: 'none' },
  '&:not(:first-child)': { borderLeft: 'none' },
}))

const MdTd = styled.td(({ theme }) => ({
  backgroundColor: theme.colors['fill-zero-selected'],
  padding: `${theme.spacing.xsmall}px ${theme.spacing.small}px`,
  color: theme.colors['text-light'],
  height: 40,
  border: theme.borders['fill-two'],
  borderBottom: theme.borders.default,
  borderTop: 'none',
  textAlign: 'left',
  // bottom row stronger border, rounded corners
  'tr:last-child &': {
    borderBottom: theme.borders['fill-two'],
    '&:first-child': { borderBottomLeftRadius: theme.borderRadiuses.large },
    '&:last-child': { borderBottomRightRadius: theme.borderRadiuses.large },
  },
  // remove inner borders
  '&:not(:last-child)': { borderRight: 'none' },
  '&:not(:first-child)': { borderLeft: 'none' },
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
  href?: string
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

function Markdown({ text, gitUrl, mainBranch, ...props }: MarkdownProps) {
  return useMemo(
    () => (
      <ReactMarkdown
        {...props}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote: (props) => <MdBlockquote {...props} />,
          ul: (props) => <MdUl {...props} />,
          ol: (props) => <MdOl {...props} />,
          li: (props) => <MdLi {...props} />,
          h1: (props) => <MdH1 {...props} />,
          h2: (props) => <MdH2 {...props} />,
          h3: (props) => <MdH3 {...props} />,
          h4: (props) => <MdH4 {...props} />,
          h5: (props) => <MdH5 {...props} />,
          h6: (props) => <MdH6 {...props} />,
          img: (props) => (
            <MarkdownImage
              {...props}
              gitUrl={gitUrl}
              mainBranch={mainBranch}
            />
          ),
          p: (props) => <MdP {...props} />,
          div: (props) => <MdDiv {...props} />,
          a: (props) => (
            <MarkdownLink
              {...props}
              gitUrl={gitUrl}
              mainBranch={mainBranch}
            />
          ),
          span: (props) => <MdSpan {...props} />,
          code: (props) => <InlineCode {...props} />,
          pre: ({ node: _, ...props }) => <MarkdownPreformatted {...props} />,
          hr: (props) => <MdHr {...props} />,
          th: (props) => <MdTh {...props} />,
          td: (props) => <MdTd {...props} />,
          table: (props) => <MdTable {...props} />,
          ...props.components,
        }}
      >
        {text}
      </ReactMarkdown>
    ),
    [props, gitUrl, mainBranch, text]
  )
}

export default Markdown

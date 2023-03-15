import { ReactElement } from 'react'
import styled from 'styled-components'

const SectionWrap = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xlarge,

  '.header': {
    ...theme.partials.text.body2Bold,
    color: theme.colors.text,

    '&.without-caption': {
      marginBottom: theme.spacing.medium,
    },
  },

  '.caption': {
    ...theme.partials.text.caption,
    color: theme.colors['text-xlight'],
    marginBottom: theme.spacing.medium,
  },
}))

export type SectionProps = {
  header: string
  caption?: string
  children: ReactElement | ReactElement[] | string
}

export default function Section({
  header,
  caption,
  children,
}: SectionProps) {
  return (
    <SectionWrap>
      <div className={`header ${caption ? 'with-caption' : 'without-caption'}`}>
        {header}
      </div>
      <div className="caption">
        {caption}
      </div>
      {children}
    </SectionWrap>
  )
}

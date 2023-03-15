import { ReactElement } from 'react'
import styled from 'styled-components'

const CostsWrap = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',

  '.header': {
    ...theme.partials.text.overline,
    color: theme.colors.text,
  },
}))

export type CostsProps = {
  header?: string
  children: ReactElement | ReactElement[] | string
}

export default function Costs({
  header,
  children,
}: CostsProps) {
  return (
    <CostsWrap>
      {header && <div className="header">{header}</div>}
      {children}
    </CostsWrap>
  )
}

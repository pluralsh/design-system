import styled from 'styled-components'

const TotalCostWrap = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.medium,
  alignItems: 'end',
  justifyContent: 'space-between',
  marginTop: theme.spacing.xxlarge,

  '.value': {
    ...theme.partials.text.title1,
    color: theme.colors['text-warning-light'],
    marginRight: theme.spacing.xxsmall,

    '&.primary': {
      color: theme.colors.purple[200],
    },
  },

  '.provider': {
    ...theme.partials.text.body2Bold,
    color: theme.colors.text,
  },
}))

export type TotalCostProps = {
  providerCost: number
  provider: string
  pluralCost?: number
  proPlan?: boolean
}

export default function TotalCost({
  providerCost,
  provider,
  pluralCost,
  proPlan,
}: TotalCostProps) {
  return (
    <TotalCostWrap>
      <div>
        <div className="value">~${providerCost}</div>
        <div>per month to <span className="provider">{provider}</span></div>
      </div>
      {!!pluralCost && proPlan && (
        <div>
          <div className="value primary">${pluralCost}</div>
          <div>(Professional) <span className="provider">Plural</span></div>
        </div>
      )}
    </TotalCostWrap>
  )
}

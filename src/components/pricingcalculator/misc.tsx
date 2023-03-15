import styled from 'styled-components'

export const Section = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xlarge,
}))

export const SectionHeader = styled.div(({ theme }) => ({
  ...theme.partials.text.body2Bold,
  color: theme.colors.text,
  marginBottom: theme.spacing.medium,
}))

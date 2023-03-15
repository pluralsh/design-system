import { Dispatch, createElement } from 'react'
import styled from 'styled-components'

import { SelectItem } from '../SelectItem'

import { PROVIDERS } from './constants'
import { Section, SectionHeader } from './misc'

const ProvidersWrap = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing.small,
}))

export type ProviderSectionProps = {
  header?: string
  providerId: string
  setProviderId: Dispatch<string>
}

export default function ProviderSection({
  header = 'Cloud provider',
  providerId,
  setProviderId,
}: ProviderSectionProps) {
  return (
    <Section>
      <SectionHeader>{header}</SectionHeader>
      <ProvidersWrap>
        {PROVIDERS.map(({ id, name, icon }) => (
          <SelectItem
            label={name}
            icon={createElement(icon, { fullColor: true })}
            value={id}
            checked={providerId === id}
            onChange={({ target: { checked } }: any) => {
              if (checked) setProviderId(id)
            }}
          />
        ))}
      </ProvidersWrap>
    </Section>
  )
}

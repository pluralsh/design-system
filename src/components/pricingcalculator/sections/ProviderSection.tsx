import { Dispatch, createElement } from 'react'
import styled from 'styled-components'

import { SelectItem } from '../../SelectItem'
import { PROVIDERS } from '../constants'
import Section from '../Section'

const ProvidersWrap = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing.small,
}))

export type ProviderSectionProps = {
  header: string
  caption?: string
  providerId: string
  setProviderId: Dispatch<string>
}

export default function ProviderSection({
  header,
  caption,
  providerId,
  setProviderId,
}: ProviderSectionProps) {
  return (
    <Section
      header={header}
      caption={caption}
    >
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

import { Dispatch } from 'react'

import Slider from '../Slider'

import { Section, SectionHeader } from './misc'

export type AppsSectionProps = {
  header?: string
  apps: number
  setApps: Dispatch<number>
}

export default function AppsSection({
  header = 'Applications',
  apps,
  setApps,
}: AppsSectionProps) {
  return (
    <Section>
      <SectionHeader>{header}</SectionHeader>
      <Slider
        defaultValue={apps}
        minValue={1}
        maxValue={25}
        onChange={v => setApps(v)}
      />
    </Section>
  )
}

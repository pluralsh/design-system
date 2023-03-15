import { Dispatch } from 'react'

import Slider from '../../Slider'
import Section from '../Section'

export type AppsSectionProps = {
  header: string
  caption?: string
  apps: number
  setApps: Dispatch<number>
}

export default function AppsSection({
  header,
  caption,
  apps,
  setApps,
}: AppsSectionProps) {
  return (
    <Section
      header={header}
      caption={caption}
    >
      <Slider
        defaultValue={apps}
        minValue={1}
        maxValue={25}
        onChange={v => setApps(v)}
      />
    </Section>
  )
}

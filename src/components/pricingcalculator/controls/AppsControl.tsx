import { Dispatch } from 'react'

import Slider from '../../Slider'

import Control from './Control'

type AppsControlProps = {
  header: string
  caption?: string
  apps: number
  setApps: Dispatch<number>
}

export default function AppsControl({
  header,
  caption,
  apps,
  setApps,
}: AppsControlProps) {
  return (
    <Control
      header={header}
      caption={caption}
    >
      <Slider
        defaultValue={apps}
        minValue={1}
        maxValue={25}
        onChange={v => setApps(v)}
      />
    </Control>
  )
}

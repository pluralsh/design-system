import { Dispatch } from 'react'

import Slider from '../../Slider'

import Control from './Control'

export type ClustersControlProps = {
  clusters: number
  setClusters: Dispatch<number>
}

export default function ClustersControl({
  clusters,
  setClusters,
}: ClustersControlProps) {
  return (
    <Control
      header="How many clusters will you be running?"
      caption="Our standard deployment utilizes 3 nodes, 2 core / 8GB for all providers and defaults to AMD CPUs."
    >
      <Slider
        defaultValue={clusters}
        minValue={1}
        maxValue={6}
        onChange={v => setClusters(v)}
      />
    </Control>
  )
}

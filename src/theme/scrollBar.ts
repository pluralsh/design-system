import { type CSSObject } from '../types'

import { type StringObj } from '../theme'

import { type FillLevel } from '../components/contexts/FillLevelContext'

import { semanticColorVars } from './colors'

export const scrollBar = ({ fillLevel }: { fillLevel: FillLevel }) => {
  const trackColor =
    fillLevel >= 2
      ? semanticColorVars['fill-three']
      : semanticColorVars['fill-two']
  const barColor =
    fillLevel >= 2
      ? semanticColorVars['text-xlight']
      : semanticColorVars['fill-three']
  const barWidth = 6
  const barRadius = barWidth / 2

  const style: CSSObject = {
    scrollbarWidth: 'thin',
    scrollbarColor: `${barColor} ${trackColor}`,
    '&::-webkit-scrollbar-track': {
      backgroundColor: trackColor,
      borderRadius: `${barRadius}px`,
    },
    '&::-webkit-scrollbar': {
      width: `${barWidth}px`,
      height: `${barWidth}px`,
      borderRadius: `${barRadius}px`,
      backgroundColor: trackColor,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: `${barRadius}px`,
      backgroundColor: barColor,
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  }

  // Type-cast allows to be used in Honorable, Emotion and
  // styled-components components
  return style as StringObj
}

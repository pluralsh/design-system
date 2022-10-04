import { createContext, useContext } from 'react'

export type FillLevel = 0 | 1 | 2 | 3

export const FillLevelContext = createContext<FillLevel>(0)
export const FillLevelProvider = FillLevelContext.Provider
export const useFillLevel = () => useContext(FillLevelContext)

export const increaseFillLevel: Record<FillLevel, FillLevel> = {
  0: 1,
  1: 2,
  2: 3,
  3: 3,
}

export const decreaseFillLevel: Record<FillLevel, FillLevel> = {
  0: 0,
  1: 0,
  2: 1,
  3: 2,
}

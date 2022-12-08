import {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import isEqual from 'lodash/isEqual'

import { ContextProps, StepConfig, WizardContext } from './context'

const useActive = <T = unknown>() => {
  const { steps, setSteps, active: activeIdx } = useContext(WizardContext)
  const active = useMemo<StepConfig<T>>(() => steps?.at(activeIdx), [activeIdx, steps])

  const setValid = useCallback((valid: boolean) => {
    if (valid === active.isValid) {
      return
    }

    const updated = { ...active, isValid: valid } as StepConfig
    const arr = Array.from(steps)

    arr[activeIdx] = updated

    setSteps(arr)
  }, [active, steps, activeIdx, setSteps])

  const setCompleted = useCallback((completed: boolean) => {
    if (completed === active.isCompleted) {
      return
    }

    const updated = { ...active, isCompleted: completed } as StepConfig
    const arr = Array.from(steps)

    arr[activeIdx] = updated

    setSteps(arr)
  }, [active, steps, activeIdx, setSteps])

  const setData = useCallback((data: T) => {
    if (isEqual(data, active.data)) {
      return
    }

    const updated = { ...active, data } as StepConfig
    const arr = Array.from(steps)

    arr[activeIdx] = updated

    setSteps(arr)
  }, [active, steps, activeIdx, setSteps])

  return {
    active, setValid, setData, setCompleted,
  }
}

const useNavigation = () => {
  const {
    steps, setSteps, active, setActive,
    setCompleted,
  } = useContext(WizardContext)

  const onNext = useCallback(() => {
    const currentStep = steps.at(active)
    const idx = steps.findIndex(s => s.key === currentStep.key)
    let nextIdx = idx + 1

    if (idx < 0) return -1
    if (idx === steps.length - 1) return idx

    while (steps.at(nextIdx).isPlaceholder) nextIdx++

    setActive(nextIdx)
  }, [steps, active, setActive])

  const onBack = useCallback(() => {
    const currentStep = steps.at(active)
    const idx = steps.findIndex(s => s.key === currentStep.key)
    let prevIdx = idx - 1

    if (idx < 0) return -1
    if (idx === 0) return idx

    while (steps.at(prevIdx).isPlaceholder) prevIdx--

    setActive(prevIdx)
  }, [steps, active, setActive])

  const onReset = useCallback(() => {
    const initialSteps = steps.filter(step => step.isDefault || step.isPlaceholder)

    setSteps(initialSteps)
    setCompleted(false)
  }, [setSteps, steps, setCompleted])

  const onEdit = useCallback((step: StepConfig) => {
    const idx = steps.findIndex(s => s.key === step.key)

    if (idx < 0) return

    setActive(idx)
  }, [setActive, steps])

  const onReturn = useCallback(() => {
    const last = steps.length - 1

    setActive(last)
  }, [setActive, steps])

  const isFirst = useMemo(() => active === 0, [active])
  const isLast = useMemo(() => active === steps.length - 1, [active, steps])

  return {
    onBack,
    onNext,
    onReset,
    onEdit,
    onReturn,
    isFirst,
    isLast,
  }
}

const usePicker = () => {
  const { steps, setSteps } = useContext(WizardContext)

  const onSelect = useCallback((elem: StepConfig) => {
    const idx = steps.findIndex(s => s.label === elem.label)
    const arr = Array.from(steps)

    if (idx > -1) {
      arr.splice(idx, 1)
    }
    else {
      arr.splice(-2, 0, elem)
    }

    setSteps(arr)
  }, [steps, setSteps])

  return {
    onSelect,
  }
}

const useWizard = (initialSteps: Array<StepConfig> = [], limit = -1): ContextProps => {
  const [steps, setSteps] = useState<Array<StepConfig>>(initialSteps)
  const [active, setActive] = useState<number>(0)
  const [completed, setCompleted] = useState<boolean>(false)

  return {
    steps,
    setSteps,
    active,
    setActive,
    completed,
    setCompleted,
    limit,
  }
}

export {
  useWizard, useNavigation, useActive, usePicker,
}

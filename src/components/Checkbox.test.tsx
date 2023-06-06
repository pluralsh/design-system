import { fireEvent, render } from '@testing-library/react'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('should render checkbox component with label', () => {
    const { getByLabelText, getByText } = render(
      <Checkbox
        checked={false}
        disabled={false}
      >
        Checkbox Label
      </Checkbox>
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement
    const checkboxLabel = getByText('Checkbox Label')

    expect(checkboxInput).toBeInTheDocument()
    expect(checkboxInput.checked).toBe(false)
    expect(checkboxLabel).toBeInTheDocument()
  })

  it('should call onChange handler when checkbox is clicked', () => {
    const handleChange = vi.fn()

    const { getByLabelText } = render(
      <Checkbox
        checked={false}
        onChange={handleChange}
      >
        Checkbox Label
      </Checkbox>
    )

    const checkboxInput = getByLabelText('Checkbox Label')

    fireEvent.click(checkboxInput)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should render checked checkbox when checked prop is true', () => {
    const { getByLabelText } = render(
      <Checkbox
        checked
        disabled={false}
      >
        Checkbox Label
      </Checkbox>
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement

    expect(checkboxInput.checked).toBe(true)
  })

  it('should render disabled checkbox when disabled prop is true', () => {
    const { getByLabelText } = render(
      <Checkbox
        checked={false}
        disabled
      >
        Checkbox Label
      </Checkbox>
    )

    const checkboxInput = getByLabelText('Checkbox Label') as HTMLInputElement

    expect(checkboxInput.disabled).toBe(true)
  })
})

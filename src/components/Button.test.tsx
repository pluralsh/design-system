import React from 'react'
import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('renders without errors', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders with pulse animation when pulse prop is true', () => {
    render(<Button pulse />)
    const button = screen.getByRole('button')

    expect(button).toHaveStyle('animation-name: animation-1wp7g7;')
    expect(button).toHaveStyle('box-shadow: 0 0 7px 2px #fff1;')
  })

  it('does not render with pulse animation when pulse prop is false', () => {
    render(<Button pulse={false} />)
    const button = screen.getByRole('button')

    expect(button).not.toHaveStyle('animation-name: animation-1wp7g7;')
    expect(button).not.toHaveStyle('box-shadow: 0 0 7px 2px #fff1;')
  })

  it('passes other props to the underlying HonorableButton', () => {
    const onClick = vi.fn()

    render(<Button onClick={onClick} />)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('onClick')
    expect(button).not.toHaveAttribute('pulse')
    expect(button).not.toHaveAttribute('animationIterationCount')
    expect(button).not.toHaveAttribute('animationDuration')
    expect(button).not.toHaveAttribute('animationName')
    expect(button).not.toHaveAttribute('boxShadow')
  })
})

import { fireEvent, render } from '@testing-library/react'

import Card from './Card'

describe('Card component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Card />)

    // Add assertions to verify the rendered output
    expect(container).toMatchSnapshot()
    // Add more assertions as needed
  })

  it('renders correctly with custom props', () => {
    const props = {
      cornerSize: 'medium',
      fillLevel: 3,
      selected: false,
      clickable: true,
      // add other required props
    }

    const { container } = render(<Card {...props} />)

    // Add assertions to verify the rendered output
    expect(container).toMatchSnapshot()
    // Add more assertions as needed
  })

  it('applies correct styles when selected and clickable', () => {
    const props = {
      selected: true,
      clickable: true,
      // add other required props
    }

    const { container } = render(<Card {...props} />)

    // Add assertions to verify the applied styles
    expect(container.firstChild).toHaveStyle(
      'background-color: fill-one-selected;'
    )
    expect(container.firstChild).toHaveStyle('cursor: pointer;')
    // Add more assertions as needed
  })

  it('applies correct styles on hover', () => {
    const props = {
      fillLevel: 2,
      selected: false,
      clickable: true,
      // add other required props
    }

    const { container } = render(<Card {...props} />)
    const card = container.firstChild

    fireEvent.mouseEnter(card)

    // Add assertions to verify the applied styles on hover
    expect(card).toHaveStyle('background-color: fill-two-hover;')
    // Add more assertions as needed
  })

  // Add more test cases to cover different scenarios and behaviors
})

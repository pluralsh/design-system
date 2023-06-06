import React from 'react'
import { render, screen } from '@testing-library/react'

import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Category', url: '/category' },
    { label: 'Product', url: '/category/product' },
  ]

  it('renders the breadcrumbs correctly', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />)

    const homeLink = screen.getByText('Home')
    const categoryLink = screen.getByText('Category')
    const productLink = screen.getByText('Product')

    expect(homeLink).toBeInTheDocument()
    expect(categoryLink).toBeInTheDocument()
    expect(productLink).toBeInTheDocument()
  })

  it('navigates to the correct URL when a breadcrumb link is clicked', () => {
    const mockNavigate = vi.fn()

    vi.mock('./contexts/NavigationContext', () => ({
      useNavigationContext: () => ({
        Link: ({ href, children }) => (
          <a
            href={href}
            onClick={mockNavigate}
          >
            {children}
          </a>
        ),
        useNavigate: () => mockNavigate,
      }),
    }))

    render(<Breadcrumbs breadcrumbs={breadcrumbs} />)

    const categoryLink = screen.getByText('Category')
    const productLink = screen.getByText('Product')

    categoryLink.click()
    expect(mockNavigate).toHaveBeenCalledWith('/category')

    productLink.click()
    expect(mockNavigate).toHaveBeenCalledWith('/category/product')
  })
})

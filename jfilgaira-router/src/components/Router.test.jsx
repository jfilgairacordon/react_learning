import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Router } from './Router'
import { getCurrentPath } from '../utils'

vi.mock('../utils', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should work', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if not renders any known route', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    screen.debug()
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the first route that matches', () => {
    getCurrentPath.mockReturnValue('/foo')
    const routes = [
      { path: '/foo', component: () => <h1>Foo</h1> },
      { path: '/bar', component: () => <h1>Bar</h1> }
    ]
    render(<Router routes={routes} />)
    screen.debug()
    expect(screen.getByText('Foo')).toBeTruthy()
  })
})

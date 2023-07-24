import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Router } from './Router'
import { Link } from './Link'
import { getCurrentPath } from '../utils'
import { Route } from './Route'

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
    getCurrentPath.mockReturnValue('/foo2')
    const routes = [
      { path: '/foo', component: () => <h1>Foo</h1> },
      { path: '/bar', component: () => <h1>Bar</h1> }
    ]
    render(
      <Router routes={routes}>
        <Route path='/foo2' component={() => <h1>Foo2</h1>} />
      </Router>
    )
    screen.debug()
    expect(screen.getByText('Foo2')).toBeTruthy()
  })

  it('should navigate using Link', async () => {
    getCurrentPath.mockReturnValueOnce('/foo2')
    const routes = [
      { path: '/foo', component: () => <h1>Foo</h1> },
      { path: '/bar', component: () => <h1>Bar</h1> }
    ]
    render(
      <Router routes={routes}>
        <Route
          path='/foo2' component={() => (
            <main>
              <h1>Foo2</h1>
              <Link to='/foo'>Go to Foo</Link>
            </main>
          )}
        />
      </Router>
    )
    const link = screen.getByText(/Go to Foo/)
    fireEvent.click(link)

    const fooTitle = await screen.findByText('Foo')
    console.log(fooTitle)
    expect(fooTitle).toBeTruthy()
  })
})

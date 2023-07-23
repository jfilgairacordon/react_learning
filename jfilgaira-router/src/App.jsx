import { Router } from './components/Router'
import { Route } from './components/Route'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

const routes = [
  { path: '/search/:query', component: ({ routeParams }) => <h1>Search with query: {routeParams.query}</h1> }
]

function App () {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes}>
          <Route path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App

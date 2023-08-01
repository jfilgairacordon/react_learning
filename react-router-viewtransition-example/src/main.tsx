import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CharactersPage } from './pages/CharactersPage.tsx'
import { CharacterPage } from './pages/CharacterPage.tsx'

const router = createBrowserRouter([
  { path: '/', element: <CharactersPage /> },
  { path: '/character/:characterId', element: <CharacterPage /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

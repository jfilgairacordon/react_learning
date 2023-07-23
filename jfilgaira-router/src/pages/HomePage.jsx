import { Link } from '../components/Link'

export default function HomePage () {
  return (
    <>
      <h1>Home Page hola tania</h1>
      <p>Página de ejemplo para crear un react router</p>
      <Link to='/about'>Ir a About</Link>
    </>
  )
}

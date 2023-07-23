import { Link } from '../components/Link'

export default function AboutPage () {
  return (
    <>
      <h1>About page</h1>
      <p>Esta es otra página para el react-router</p>
      <Link className='button' to='/'>Ir a Home</Link>
    </>
  )
}

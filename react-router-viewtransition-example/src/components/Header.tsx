import './Header.css'
import reactLogo from '../assets/react.svg'

export function Header () {
  return (
    <header>
      <img src={reactLogo} className="react-logo" alt="logo" />
      <h1>React Fotos</h1>
    </header>
  )
}

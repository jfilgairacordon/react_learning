import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })
      console.log('🚀 ~ file: App.jsx:11 ~ handleMove ~ clientY:', clientY)
      console.log('🚀 ~ file: App.jsx:11 ~ handleMove ~ clientX:', clientX)
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Clean up
    // Se ejecuta siempre que cambian las dependencias o deja de renderizarse el componente.
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      />
      <button onClick={() => { setEnabled(!enabled) }}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App

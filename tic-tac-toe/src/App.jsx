import './App.css'
import { useState } from 'react'

const TURNS = {
  X: '❌',
  O: '⭕'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => updateBoard(index)

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    boardToCheck.forEach((value, index) => {
      if (value === null) return

      // Horizontal
      if (index % 3 === 0) {
        if (
          value === boardToCheck[index + 1] &&
          value === boardToCheck[index + 2]
        ) {
          setWinner(value)
        }
      }

      // Vertical
      if (index < 3) {
        if (
          value === boardToCheck[index + 3] &&
          value === boardToCheck[index + 6]
        ) {
          setWinner(value)
        }
      }

      // Diagonal
      if (index === 0) {
        if (
          value === boardToCheck[index + 4] &&
          value === boardToCheck[index + 8]
        ) {
          setWinner(value)
        }
      }

      if (index === 2) {
        if (
          value === boardToCheck[index + 2] &&
          value === boardToCheck[index + 4]
        ) {
          setWinner(value)
        }
      }
    })
  }

  const updateBoard = (index) => {
    // No se actualiza si ya hay un valor
    if (board[index] !== null) return
    if (winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className='winner'>
          <h2>Winner</h2>
          <Square>{winner}</Square>
        </section>
      )}
    </main>
  )
}

export default App

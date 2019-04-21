import React, { useState } from 'react'
import { Button } from 'react-form-elements'
import { TYPES, getDice, roll } from '../engines/dice'
import './dice.css'

const Dice = ({ dice = [] }) => {
  console.log('dice', dice)
  return dice.map((d, i) => (
    <div className="die" key={`${d}-${i}`}>
      {d}
    </div>
  ))
}
const GAME_STATE = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  WINNER_PLAYER: 'WINNER_PLAYER',
  WINNER_DEALER: 'WINNER_DEALER',
  PUSH: 'PUSH',
  DONE: 'DONE',
}

export default () => {
  const [total, setTotal] = useState(0)
  const [winnings, setWinnings] = useState(100)
  const [winner, setWinner] = useState('')
  const [roleResult, setRoleResult] = useState({ rolled: [], total: 0 })
  const [opponentRoleResult, setOpponentRoleResult] = useState({
    rolled: [],
    total: 0,
  })
  const playerScore = roleResult.total
  const playerDice = roleResult.rolled
  const dealerScore = opponentRoleResult.total
  const dealerDice = opponentRoleResult.rolled

  return (
    <main>
      <h1>Dice</h1>
      <div>
        <div>
          You: {playerScore} vs Dealer: {dealerScore}
        </div>
        <div>
          Winner: <b>{winner}</b>
        </div>
        <div>
          <h4>House</h4>
          <Dice dice={dealerDice} />
        </div>
        <div>
          <h4>You</h4>
          <Dice dice={playerDice} />
        </div>
        <Button
          onClick={e => {
            e.preventDefault()

            const dice = getDice()

            const result = roll(dice)

            setRoleResult(result)
            const otherResult = roll(dice)
            setOpponentRoleResult(otherResult)
            const winner = result.total > otherResult.total ? 'player' : 'house'
            if (winner === 'player') {
              setTotal(total + 1)
              setWinnings(winnings + 10)
            } else {
              setWinnings(winnings - 10)
            }
            setWinner(winner)
          }}
        >
          Roll
        </Button>

        <div>Total Wins {total}</div>
        <div>Current Money {winnings}</div>
      </div>
    </main>
  )
}

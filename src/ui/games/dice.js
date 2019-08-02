import React, { useState } from 'react'
import { Button, Section, Title, Buttons } from '@brightleaf/elements'
import { TYPES, getDice, roll } from '../engines/dice'
import './dice.css'

const Dice = ({ dice = [], total }) => {
  console.log('dice', dice)
  return dice.map((d, i) => (
    <div className="die" key={`total-${total}-${d}-${i}`}>
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
  const [totalRoles, setTotalRoles] = useState(0)
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
    <Section>
      <Title as="h1">Dice</Title>
      <div>
        <div>
          You: {playerScore} vs Dealer: {dealerScore}
        </div>
        <div>
          Winner: <b>{winner}</b>
        </div>
        <div>
          <h4>House</h4>
          <Dice dice={dealerDice} total={totalRoles} />
        </div>
        <div>
          <h4>You</h4>
          <Dice dice={playerDice} total={totalRoles} />
        </div>
        <br />
        <hr />
        <Buttons className="controls">
          <Button
            isPrimary
            disabled={winnings <= 0}
            onClick={e => {
              e.preventDefault()

              const dice = getDice()

              const result = roll(dice)

              setRoleResult(result)
              const otherResult = roll(dice)
              setOpponentRoleResult(otherResult)
              const winner =
                result.total > otherResult.total ? 'player' : 'house'
              if (winner === 'player') {
                setTotal(total + 1)
                setWinnings(winnings + 10)
              } else {
                setWinnings(winnings - 10)
              }
              setWinner(winner)
              setTotalRoles(totalRoles + 1)
            }}
          >
            Roll
          </Button>
        </Buttons>
        <div>Total Wins {total}</div>
        <div>Current Money {winnings}</div>
      </div>
    </Section>
  )
}

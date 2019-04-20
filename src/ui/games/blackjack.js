import React, { useState, useEffect } from 'react'
import { Button } from 'react-form-elements'
import {
  buildDeck,
  dealTheCardsOut,
  handleHit,
  playerStand,
  calculateScore,
} from '../engines/blackjack'
const Deck = ({ hand }) => {
  console.log('hand', hand)
  return hand.map(card => (
    <img key={`${card.name}-${card.suit}`} src={`${card.img}`} alt="" />
  ))
}
const GAME_STATE = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  DEALT: 'DEALT',
  PLAYER_BUSTED: 'PLAYER_BUSTED',
  PLAYER_STAND: 'PLAYER_STAND',
  DEALER_BUSTED: 'DEALER_BUSTED',
  WINNER_PLAYER: 'WINNER_PLAYER',
  WINNER_DEALER: 'WINNER_DEALER',
  PUSH: 'PUSH',
  DONE: 'DONE',
}

export default () => {
  const [output, setOutput] = useState('')
  const [gameState, setGameState] = useState(GAME_STATE.WAITING)
  const [total, setTotal] = useState(0)
  const [cards, setCards] = useState({ player: [], dealer: [], deck: [] })

  useEffect(() => {
    const cardDeck = buildDeck()
    cardDeck.forEach(card => {
      const img = new Image()
      img.src = card.src
    })
  }, [])
  const PlayerDeck = cards.player.map(card => (
    <img key={`${card.name}-${card.suit}`} src={`${card.img}`} alt="" />
  ))
  const DealerDeck = cards.dealer.map((card, i) => (
    <img key={`${card.name}-${card.suit}-${i}`} src={`${card.img}`} alt="" />
  ))
  const playerScore = calculateScore(cards.player)
  const dealerScore = calculateScore(cards.dealer)
  return (
    <main>
      <h1>Blackjack</h1>
      <div>
        <div>
          You: {playerScore} vs Dealer: {dealerScore}
        </div>
        <div>{output}</div>
        <div>
          <Deck hand={cards.dealer} />
        </div>
        <div>
          <Deck hand={cards.player} />
        </div>
        <Button
          onClick={e => {
            e.preventDefault()

            const { dealer, player, deck } = dealTheCardsOut()

            setCards({
              dealer,
              player,
              deck,
            })
            setGameState(GAME_STATE.DEALT)
            setOutput('')
          }}
        >
          Shuffle
        </Button>
        <Button
          disabled={cards.deck.length < 10}
          onClick={e => {
            e.preventDefault()

            const { dealer, player, deck } = dealTheCardsOut(cards.deck)

            setCards({
              dealer,
              player,
              deck,
            })
            setOutput('Cards have been dealt')
            setGameState(GAME_STATE.DEALT)
          }}
        >
          Deal
        </Button>
        <Button
          disabled={
            gameState === GAME_STATE.PLAYER_STAND ||
            gameState === GAME_STATE.PLAYER_BUSTED ||
            gameState === GAME_STATE.PUSH ||
            gameState === GAME_STATE.DONE ||
            playerScore >= 21 ||
            cards.deck.length === 0
          }
          onClick={e => {
            e.preventDefault()
            const { hand, score, deck } = handleHit(cards.player, cards.deck)
            console.log('score', score)

            setCards({
              dealer: cards.dealer,
              player: hand,
              deck,
            })
            if (score > 21) {
              setOutput('busted')
              setGameState(GAME_STATE.DONE)
            }
          }}
        >
          {' '}
          Hit Me!{' '}
        </Button>
        <Button
          disabled={
            gameState === GAME_STATE.PLAYER_STAND ||
            cards.deck.length === 0 ||
            gameState === GAME_STATE.DONE
          }
          onClick={e => {
            e.preventDefault()
            console.info('cards', cards)
            const { dealer, player, deck, reason, winner } = playerStand(
              cards.player,
              cards.dealer,
              cards.deck
            )
            console.info({ dealer, player, deck, reason })
            setCards({
              dealer,
              player,
              deck,
            })
            console.log('set out', reason)
            if (winner === 'player') {
              setGameState(GAME_STATE.DONE)
              setTotal(total + 1)
            } else if (winner === 'dealer') {
              setGameState(GAME_STATE.DONE)
            } else {
              setGameState(GAME_STATE.DONE)
            }
            setOutput(reason)
          }}
        >
          {' '}
          Stand!{' '}
        </Button>
        <div>Total Wins {total}</div>
      </div>
    </main>
  )
}

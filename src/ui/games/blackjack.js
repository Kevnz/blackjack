import React, { useState, useEffect } from 'react'
import { Button } from 'react-form-elements'
import {
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
export default () => {
  const [output, setOutput] = useState('')
  const [total, setTotal] = useState(0)
  const [cards, setCards] = useState({ player: [], dealer: [], deck: [] })

  const PlayerDeck = cards.player.map(card => (
    <img key={`${card.name}-${card.suit}`} src={`${card.img}`} alt="" />
  ))
  const DealerDeck = cards.dealer.map((card, i) => (
    <img key={`${card.name}-${card.suit}-${i}`} src={`${card.img}`} alt="" />
  ))
  const playerScore = calculateScore(cards.player)
  const dealerScore = calculateScore(cards.dealer)
  console.info('deck size', cards.deck.length)
  console.log(cards)
  return (
    <main>
      <h1>Blackjack</h1>
      <div>
        <div>
          You: {playerScore} vs Dealer: {dealerScore}
        </div>
        <div>{output}</div>
        <div>{DealerDeck}</div>
        <div>{PlayerDeck}</div>
        <Button
          onClick={e => {
            e.preventDefault()
            console.log(e)
            const { dealer, player, deck } = dealTheCardsOut()
            console.log('Done')
            setCards({
              dealer,
              player,
              deck,
            })
            setOutput('')
          }}
        >
          Shuffle
        </Button>
        <Button
          onClick={e => {
            e.preventDefault()
            console.log(e)

            const { dealer, player, deck } = dealTheCardsOut(cards.deck)
            console.log('DDEAL')
            setCards({
              dealer,
              player,
              deck,
            })
            setOutput('play')
          }}
        >
          Deal
        </Button>
        <Button
          disabled={playerScore === 21}
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
            }
          }}
        >
          {' '}
          Hit Me!{' '}
        </Button>
        <Button
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
              setTotal(total + 1)
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

import React, { useState, useEffect } from 'react'
import { Button } from 'react-form-elements'
import { dealTheCardsOut, handleHit, playerStand } from '../engines/blackjack'
const Deck = ({ hand }) => {
  console.log('hand', hand)
  return hand.map(card => (
    <img key={`${card.name}-${card.suit}`} src={`${card.img}`} alt="" />
  ))
}
export default () => {
  const [output, setOutput] = useState('')
  const [cards, setCards] = useState({ player: [], dealer: [], deck: [] })

  const PlayerDeck = cards.player.map(card => (
    <img key={`${card.name}-${card.suit}`} src={`${card.img}`} alt="" />
  ))
  const DealerDeck = cards.dealer.map((card, i) => (
    <img key={`${card.name}-${card.suit}-${i}`} src={`${card.img}`} alt="" />
  ))
  return (
    <main>
      <h1>Blackjack</h1>
      <div>
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
          }}
        >
          Shuffle
        </Button>
        <Button
          onClick={e => {
            e.preventDefault()
            const { dealer, player, deck, reason } = playerStand(
              cards.player,
              cards.dealer,
              cards.deck
            )

            setCards({
              dealer,
              player,
              deck,
            })
            setOutput(reason)
          }}
        >
          Deal
        </Button>
        <Button
          onClick={e => {
            e.preventDefault()
            console.log('hit me')
            const { hand, score, deck } = handleHit(cards.player, cards.deck)
            console.log('score', score)
            setCards({
              dealer: cards.dealer,
              player: hand,
              deck,
            })
          }}
        >
          {' '}
          Hit Me!{' '}
        </Button>
        <Button
          onClick={e => {
            e.preventDefault()

            e.preventDefault()
            const { dealer, player, deck, reason } = playerStand(
              cards.player,
              cards.dealer,
              cards.deck
            )

            setCards({
              dealer,
              player,
              deck,
            })
            setOutput(reason)
          }}
        >
          {' '}
          Stand!{' '}
        </Button>
      </div>
    </main>
  )
}

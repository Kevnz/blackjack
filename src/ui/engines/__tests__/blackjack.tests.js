import {
  buildSuit,
  dealTheCardsOut,
  buildDeck,
  handleHit,
  calculateScore,
  playerStand,
} from '../blackjack'

describe('The blackjack engine', () => {
  it('should build a suit of cards', () => {
    const hearts = buildSuit('hearts')
    const clubs = buildSuit('clubs')
    const spades = buildSuit('spades')
    const diamonds = buildSuit('diamonds')

    expect(hearts).toMatchSnapshot()
    expect(clubs).toMatchSnapshot()
    expect(spades).toMatchSnapshot()
    expect(diamonds).toMatchSnapshot()
  })
  it('should build a deck of 52 cards with 4 suits and ace through king', () => {
    const deck = buildDeck()
    // deck
    expect(deck.length).toBe(52)
    const diamonds = deck.filter(c => c.suit === 'diamonds')
    expect(diamonds.length).toBe(13)
    expect(diamonds.find(c => c.name === 'ace')).toBeDefined()
    expect(diamonds.find(c => c.name === 'jack')).toBeDefined()
    expect(diamonds.find(c => c.name === 'king')).toBeDefined()
    expect(diamonds.find(c => c.name === 'queen')).toBeDefined()
    expect(diamonds.find(c => c.name === 2)).toBeDefined()
    expect(diamonds.find(c => c.name === 3)).toBeDefined()
    expect(diamonds.find(c => c.name === 4)).toBeDefined()
    expect(diamonds.find(c => c.name === 5)).toBeDefined()
    expect(diamonds.find(c => c.name === 6)).toBeDefined()
    expect(diamonds.find(c => c.name === 7)).toBeDefined()
    expect(diamonds.find(c => c.name === 8)).toBeDefined()
    expect(diamonds.find(c => c.name === 9)).toBeDefined()
    expect(diamonds.find(c => c.name === 10)).toBeDefined()

    const hearts = deck.filter(c => c.suit === 'hearts')
    expect(hearts.length).toBe(13)
    const spades = deck.filter(c => c.suit === 'spades')
    expect(spades.length).toBe(13)
    const clubs = deck.filter(c => c.suit === 'clubs')
    expect(clubs.length).toBe(13)
  })

  it('should when `dealTheCardsOut` is called return three arrays, the deck, dealer, and player', () => {
    const { deck, dealer, player } = dealTheCardsOut()
    expect(deck.length).toBe(48)
    expect(dealer.length).toBe(2)
    expect(player.length).toBe(2)
    const hasCard = card2Check =>
      deck.find(card => {
        return (
          card.name === card2Check.name &&
          card.suit === card2Check.suit &&
          card.val === card2Check.val
        )
      })
    expect(hasCard(dealer[0])).not.toBeDefined()
    expect(hasCard(dealer[1])).not.toBeDefined()
    expect(hasCard(player[0])).not.toBeDefined()
    expect(hasCard(player[1])).not.toBeDefined()
  })
  it('should calculate a score for two number cards', () => {
    const hand = [{ val: 3 }, { val: 5 }]
    expect(calculateScore(hand)).toBe(8)
  })
  it('should calculate a score for one number card and one face', () => {
    const hand = [{ val: 3 }, { val: 11 }]
    expect(calculateScore(hand)).toBe(13)
  })
  it('should calculate a score for two face cards', () => {
    const hand = [{ val: 13 }, { val: 11 }]
    expect(calculateScore(hand)).toBe(20)
  })
  it('should calculate a score for two face cards and one ace', () => {
    const hand = [{ val: 12 }, { val: 11 }, { val: 1 }]
    const score = calculateScore(hand)
    expect(score).toBe(21)
  })
  it('should calculate a score for two low number cards and one ace', () => {
    const hand = [{ val: 2 }, { val: 4 }, { val: 1 }]
    const score = calculateScore(hand)
    expect(score).toBe(17)
  })
  it('should calculate a score for two high number cards and one ace', () => {
    const hand = [{ val: 8 }, { val: 9 }, { val: 1 }]
    const score = calculateScore(hand)
    expect(score).toBe(18)
  })
  it('should add a card to a hand from the deck', () => {
    const { deck, player } = dealTheCardsOut()
    handleHit(player, deck)
    expect(deck.length).toBe(47)
    expect(player.length).toBe(3)
  })

  it('should when a player stands deal the dealer one card', () => {
    const player = [{ val: 1 }, { val: 10 }]
    const dealer = [{ val: 8 }, { val: 9 }]
    const deck = [{ val: 11 }, { val: 12 }, { val: 11 }, { val: 13 }]

    const result = playerStand(player, dealer, deck)
    expect(result.winner).toBe('player')
    expect(result.reason).toBe('Dealer busted')
  })

  it('should when a player stands deal the dealer cards', () => {
    const player = [{ val: 8 }, { val: 10 }]
    const dealer = [{ val: 8 }, { val: 7 }]
    const deck = [{ val: 12 }, { val: 12 }, { val: 3 }, { val: 2 }]

    const result = playerStand(player, dealer, deck)

    expect(result.winner).toBe('dealer')
    expect(result.reason).toBe('You lost')
    expect(deck.length).toBe(2)
  })
})

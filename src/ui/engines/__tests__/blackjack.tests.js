import {
  dealTheCardsOut,
  handleHit,
  calculateScore,
  playerStand,
} from '../blackjack'

describe('The blackjack engine', () => {
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
    expect(result.player.length).toBe(2)
    expect(result.dealer.length).toBe(4)
    expect(result.deck.length).toBe(2)
  })
})

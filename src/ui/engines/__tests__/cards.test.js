import { buildSuit, buildDeck } from '../cards'

describe('The base card engine', () => {
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
})

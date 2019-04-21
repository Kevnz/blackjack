import { getDice, roll, TYPES } from '../dice'

describe('Dice rolling engine', () => {
  it('should get 2 six sided dice', () => {
    const dice = getDice(2, TYPES.SIX_SIDED)
    expect(dice.quantity).toBe(2)
    expect(dice.type).toBe('SIX_SIDED')
  })

  it('should get 1 four sided die and roll then roll it', () => {
    const die = getDice(1, TYPES.FOUR_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('FOUR_SIDED')

    const { total } = roll(die)
    expect(total).toBeGreaterThan(0)
    expect(total).toBeLessThan(5)
  })

  it('should get 1 four sided die and roll 100 times and always fall in the range', () => {
    const die = getDice(1, TYPES.FOUR_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('FOUR_SIDED')

    const { total } = roll(die)
    expect(total).toBeGreaterThan(0)
    expect(total).toBeLessThan(5)
    for (let total = 0; total < 100; total++) {
      const result2 = roll(die)
      expect(result2).toBeGreaterThan(0)
      expect(result2).toBeLessThan(5)
    }
  })

  it('should get 2 six sided dice and roll then roll them', () => {
    const dice = getDice(2, TYPES.SIX_SIDED)
    expect(dice.quantity).toBe(2)
    expect(dice.type).toBe('SIX_SIDED')

    const { total } = roll(dice)
    expect(total).toBeGreaterThan(1)
    expect(total).toBeLessThan(13)
  })

  it('should get 3 eight sided dice and roll then roll them', () => {
    const dice = getDice(3, TYPES.EIGHT_SIDED)
    expect(dice.quantity).toBe(3)
    expect(dice.type).toBe('EIGHT_SIDED')

    const { total } = roll(dice)
    expect(total).toBeLessThanOrEqual(8 * 3)
    expect(total).toBeGreaterThanOrEqual(3)
  })

  it('should get 3 eight sided dice and roll then roll them 100 times', () => {
    const dice = getDice(3, TYPES.EIGHT_SIDED)
    expect(dice.quantity).toBe(3)
    expect(dice.type).toBe('EIGHT_SIDED')

    for (let total = 0; total < 100; total++) {
      const { total } = roll(dice)
      expect(total).toBeLessThanOrEqual(8 * 3)
      expect(total).toBeGreaterThanOrEqual(3)
    }
  })

  it('should get 1 ten sided die and roll then roll it', () => {
    const die = getDice(1, TYPES.TEN_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('TEN_SIDED')

    const { total } = roll(die)
    expect(total).toBeGreaterThan(0)
    expect(total).toBeLessThan(11)
  })

  it('should get 1 twelve sided die and roll then roll it', () => {
    const die = getDice(1, TYPES.TWELVE_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('TWELVE_SIDED')

    const { total } = roll(die)
    expect(total).toBeGreaterThan(0)
    expect(total).toBeLessThan(13)
  })

  it('should get 1 twenty sided die and roll then roll it', () => {
    const die = getDice(1, TYPES.TWENTY_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('TWENTY_SIDED')

    const { total } = roll(die)
    expect(total).toBeGreaterThan(0)
    expect(total).toBeLessThan(21)
  })

  it('should get 1 twenty sided die and roll then roll it 100 times', () => {
    const die = getDice(1, TYPES.TWENTY_SIDED)
    expect(die.quantity).toBe(1)
    expect(die.type).toBe('TWENTY_SIDED')

    for (let total = 0; total < 100; total++) {
      const result = roll(die)
      expect(result.total).toBeGreaterThan(0)
      expect(result.total).toBeLessThan(21)
    }
  })
})

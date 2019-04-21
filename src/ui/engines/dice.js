import random from './utils/random'

export const TYPES = {
  FOUR_SIDED: 'FOUR_SIDED',
  SIX_SIDED: 'SIX_SIDED',
  EIGHT_SIDED: 'EIGHT_SIDED',
  TEN_SIDED: 'TEN_SIDED',
  TWELVE_SIDED: 'TWELVE_SIDED',
  TWENTY_SIDED: 'TWENTY_SIDED',
}
const MAX_VAL = {
  FOUR_SIDED: 4,
  SIX_SIDED: 6,
  EIGHT_SIDED: 8,
  TEN_SIDED: 10,
  TWELVE_SIDED: 12,
  TWENTY_SIDED: 20,
}
export function getDice(quantity = 2, type = TYPES.SIX_SIDED) {
  const vals = []
  for (let index = 0; index < quantity; index++) {
    const pips = Array(MAX_VAL[type])
    pips.fill(1)
    const p2 = pips.map((v, i) => {
      return i + 1
    })
    vals.push(p2)
  }
  return {
    quantity,
    type,
    bones: vals,
  }
}

export function roll(dice) {
  const roled = dice.bones.map(d => random(1, MAX_VAL[dice.type]))
  const total = roled.reduce((total, current) => total + current, 0)
  return { roled, total }
}

export function getName(value) {
  var name
  switch (value) {
    case 1:
      name = 'ace'
      break
    case 11:
      name = 'jack'
      break
    case 12:
      name = 'queen'
      break
    case 13:
      name = 'king'
      break
    default:
      name = value
  }
  return name
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function buildSuit(suit) {
  var cards = []

  for (var i = 1; i <= 13; i++) {
    var cardname = getName(i)
    var cardIMAGE = '/assets/card' + suit + cardname + '.png'
    if (i === 1 || i > 10) {
      cardIMAGE = '/assets/card' + suit + cardname.slice(0, 1) + '.png'
    }

    cards.push({ val: i, suit: suit, name: cardname, img: cardIMAGE })
  }

  return cards
}
export function buildDeck() {
  const spades = shuffleArray(buildSuit('spades'))
  const diamonds = shuffleArray(buildSuit('diamonds'))
  const hearts = shuffleArray(buildSuit('hearts'))
  const clubs = shuffleArray(buildSuit('clubs'))

  return shuffleArray(spades.concat(diamonds, hearts, clubs))
}

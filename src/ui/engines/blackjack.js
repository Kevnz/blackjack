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

export function dealTheCardsOut(deck = buildDeck(), dealer = [], player = []) {
  player.push(deck.pop())
  dealer.push(deck.pop())

  player.push(deck.pop())
  dealer.push(deck.pop())

  return { deck, dealer, player }
}

export function calculateScore(hand) {
  var hasAce = false
  const scored = hand.reduce(function(score, card) {
    if (card.val === 1) {
      hasAce = true
      score = score + 11
    } else if (card.val > 10) {
      score = score + 10
    } else {
      score = score + card.val
    }
    return score
  }, 0)
  if (scored > 21 && hasAce) {
    return scored - 10
  }
  return scored
}

export function handleHit(hand, deck) {
  hand.push(deck.pop())
  const score = calculateScore(hand)

  return { score, hand, deck }
}

export function playerStand(player, dealer, deck) {
  var playerScore = calculateScore(player)
  while (calculateScore(dealer) < playerScore) {
    handleHit(dealer, deck)
  }

  var dealerScore = calculateScore(dealer)

  if (playerScore < 22 && dealerScore > 21) {
    return {
      winner: 'player',
      dealerScore,
      playerScore,
      reason: 'Dealer busted',
    }
  } else if (playerScore > dealerScore && playerScore < 22) {
    return {
      winner: 'player',
      dealerScore,
      playerScore,
      reason: 'You win',
    }
  } else if (playerScore === dealerScore) {
    return {
      winner: '-',
      dealerScore,
      playerScore,
      reason: 'Push',
    }
  } else {
    return {
      winner: 'dealer',
      dealerScore,
      playerScore,
      reason: 'You lost',
    }
  }
}

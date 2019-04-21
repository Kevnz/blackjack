import { buildDeck } from './cards'

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
      player,
      dealer,
      deck,
      winner: 'player',
      dealerScore,
      playerScore,
      reason: 'Dealer busted',
    }
  } else if (playerScore > dealerScore && playerScore < 22) {
    return {
      player,
      dealer,
      deck,
      winner: 'player',
      dealerScore,
      playerScore,
      reason: 'You win',
    }
  } else if (playerScore === dealerScore) {
    return {
      player,
      dealer,
      deck,
      winner: '-',
      dealerScore,
      playerScore,
      reason: 'Push',
    }
  } else {
    return {
      player,
      dealer,
      deck,
      winner: 'dealer',
      dealerScore,
      playerScore,
      reason: 'You lost',
    }
  }
}

import { useEffect } from 'react'

export default function(cardDeck) {
  useEffect(() => {
    cardDeck.forEach(card => {
      const img = new Image()
      img.src = card.img
    })
  }, [])
}

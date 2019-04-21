import React from 'react'
import { Link } from '@reach/router'
export default () => (
  <main>
    <h1>Games</h1>
    <ul>
      <li>
        <Link to="/blackjack">Blackjack</Link>
      </li>
      <li>
        <Link to="/dice">Dice</Link>
      </li>
    </ul>
  </main>
)

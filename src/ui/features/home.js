import React from 'react'
import { Link } from '@reach/router'
import { TabList, TabItem, Section } from '@brightleaf/elements'
export default () => (
  <Section>
    <TabList>
      <TabItem>
        <Link to="/blackjack">Blackjack</Link>
      </TabItem>
      <li>
        <Link to="/dice">Dice</Link>
      </li>
    </TabList>
  </Section>
)

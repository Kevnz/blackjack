import React, { Component, Fragment } from 'react'
import { Router } from '@reach/router'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))
const Blackjack = React.lazy(() => import('../games/blackjack'))
const Dice = React.lazy(() => import('../games/dice'))
const Contact = React.lazy(() => import('../features/contact'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Games</h1>
        <React.Suspense fallback={<div>Loading</div>}>
          <Router>
            <Home path="/" />
            <Blackjack path="/blackjack" />
            <Dice path="/dice" />
            <About path="/about" />
            <Contact path="/contact" />
          </Router>
        </React.Suspense>
      </Fragment>
    )
  }
}

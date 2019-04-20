import React, { Component, Fragment } from 'react'
import { Router } from '@reach/router'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../games/blackjack'))
const Contact = React.lazy(() => import('../features/contact'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App</h1>
        <React.Suspense fallback={<div>Loading</div>}>
          <Router>
            <Home path="/" />
            <About path="/about" />
            <Contact path="/contact" />
          </Router>
        </React.Suspense>
      </Fragment>
    )
  }
}

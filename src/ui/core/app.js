import React, { Component, Fragment } from 'react'
import { Router } from '@reach/router'
import {
  Button,
  Buttons,
  NavBar,
  NavBarBrand,
  NavBarDivider,
  NavBarDropDown,
  NavBarEnd,
  NavBarItem,
  NavBarStart,
  NavBarMenu,
} from '@brightleaf/elements'

const About = React.lazy(() => import('../features/about'))
const Home = React.lazy(() => import('../features/home'))

const Blackjack = React.lazy(() => import('../games/blackjack'))
const Dice = React.lazy(() => import('../games/dice'))
const Contact = React.lazy(() => import('../features/contact'))

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar isLight>
          <NavBarBrand
            src="games.png"
            href="https://brightleaf.dev"
            target="navbarBasicExample"
            width="112"
            height="68"
          />
          <NavBarMenu id="navbarBasicExample">
            <NavBarStart>
              <NavBarItem>
                <a>Home</a>
              </NavBarItem>

              <NavBarDropDown title="Games">
                <NavBarItem>
                  <a to="/containers">Blackjack</a>
                </NavBarItem>
                <NavBarItem>
                  <a to="/columns">Dice</a>
                </NavBarItem>

                <NavBarDivider />
                <NavBarItem>
                  <a>Report an issue</a>
                </NavBarItem>
              </NavBarDropDown>
            </NavBarStart>

            <NavBarEnd>
              <NavBarItem>
                <div>
                  <Buttons>
                    <Button isPrimary isAnchor>
                      <strong>Sign up</strong>
                    </Button>
                    <Button isLight isAnchor>
                      Log in
                    </Button>
                  </Buttons>
                </div>
              </NavBarItem>
            </NavBarEnd>
          </NavBarMenu>
        </NavBar>

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

import React, { Component, Fragment } from 'react'
import { Router, Location, LocationProvider, Link } from '@reach/router'
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

const NavBarLink = ({ children, ...props }) => {
  return (
    <Location>
      {({ location }) => {
        const active = props.to === location.pathname
        return (
          <Link
            className={active ? 'navbar-item is-active' : 'navbar-item '}
            {...props}
            getProps={prop => {
              const { isCurrent } = prop
              return {
                className: isCurrent ? 'navbar-item is-active' : 'navbar-item ',
              }
            }}
          >
            {children}
          </Link>
        )
      }}
    </Location>
  )
}

export default class App extends Component {
  render() {
    return (
      <LocationProvider>
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
                  <Link to="/">Home</Link>
                </NavBarItem>

                <NavBarDropDown title="Games">
                  <NavBarItem>
                    <NavBarLink to="/blackjack">Blackjack</NavBarLink>
                  </NavBarItem>
                  <NavBarLink to="/dice">Dice</NavBarLink>

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
      </LocationProvider>
    )
  }
}

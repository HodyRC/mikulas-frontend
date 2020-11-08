import React from 'react'
import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import Home from '../pages/Home'
import Reservation from '../pages/Reservation'
import Feedback from '../pages/Feedback'
import Poster from './Poster'

function refreshPage() {
  global.location.reload()
}

export default function Menu() {
  let navLinks = [
    <NavLink key='1' className='nav-link' activeClassName='active' exact to='/'>Domů</NavLink>,
    <NavLink key='2' className='nav-link' activeClassName='active' to='/reservation'>Rezervace</NavLink>,
    <NavLink key='3' className='nav-link' activeClassName='active' to='/feedback'>Zpětná vazba</NavLink>,
    <NavLink key='4' className='nav-link' activeClassName='active' to='/poster'>Plakát</NavLink>,
  ]

  if (global.session.user) {
    if (
      global.session.user.permissions.includes('admin') ||
      global.session.user.permissions.includes('masterAdmin')
    ) {
      navLinks.unshift(<NavLink key='0' className='nav-link' activeClassName='active' to='/admin'>Administrace</NavLink>)
    }
  }

  return (
    <Router>
      <header className='masthead mb-auto'>
        <div className='inner'>
          <h3 className='masthead-brand'>Mikulášské odpoledne</h3>
          <nav className='nav nav-masthead justify-content-center'>
            {navLinks}
          </nav>
        </div>
      </header>
      <main role='main' className='inner cover'>
        <Route path='/' exact component={Home} />
        <Route path='/reservation' exact component={Reservation} />
        <Route path='/feedback' exact component={Feedback} />
        <Route path='/poster' exact component={Poster} />
        <Route path='/admin' component={refreshPage} />
      </main>
    </Router>
  )
}

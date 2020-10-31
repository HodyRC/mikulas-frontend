import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import Home from '../pages/Home'
import ReservationForm from './ReservationForm'
import FeedbackForm from './FeedbackForm'
import Poster from './Poster'

function Menu () {
  return (
    <Router>
      <header className='masthead mb-auto'>
        <div className='inner'>
          <h3 className='masthead-brand'>Mikulášské odpoledne</h3>
          <nav className='nav nav-masthead justify-content-center'>
            <NavLink className='nav-link' activeClassName='active' to='/'>Domů</NavLink>
            <NavLink className='nav-link' activeClassName='active' to='/reservation'>Rezervace</NavLink>
            <NavLink className='nav-link' activeClassName='active' to='/feedback'>Zpětná vazba</NavLink>
            <NavLink className='nav-link' activeClassName='active' to='/poster'>Plakát</NavLink>
          </nav>
        </div>
      </header>
      <main role='main' className='inner cover'>
        <Route path='/' exact component={Home} />
        <Route path='/reservation' exact component={ReservationForm} />
        <Route path='/feedback' exact component={FeedbackForm} />
        <Route path='/poster' exact component={Poster} />
      </main>
    </Router>
  )
}

export default Menu

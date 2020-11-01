import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animations.css'
import './assets/css/cover.css'
import './assets/css/font_raleway.css'
import './assets/css/style.css'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App () {
  return (
    <div className='d-flex flex-column text-center'>
      <div className='d-flex flex-column w-100 min-vh-100 p-3 mx-auto'>
        <Menu />
        <Footer />
      </div>
    </div>
  )
}

export default App

import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animations.css'
import './assets/css/cover.css'
import './assets/css/font_raleway.css'
import './assets/css/style.css'
import Menu from './components/Menu'
import Footer from './components/Footer'
import config from './config'

async function getSessionFromBackend() {
  try {
    const response = await fetch(config.api.url + 'session')
    return await response.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    global.config = config
    global.session = null
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    let session = await getSessionFromBackend()
    global.session = session
    if (global.session !== null) {
      this.setState({ loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='d-flex flex-column text-center'>
          <div className='d-flex flex-column w-100 min-vh-100 p-3 mx-auto'>
            <header className='masthead m-auto mb-5'>
              <div className='inner'>
                <h1 className='masthead-brand'>Mikulášské odpoledne</h1>
              </div>
            </header>
            <Container className='flex-grow-1 d-flex flex-column w-100 p-3 mx-auto'>
              <Spinner animation='border' role='status' variant='light' className='m-auto'>
                <span className='sr-only'>Načítání ...</span>
              </Spinner>
            </Container>
            <Footer />
          </div>
        </div>
      )
    }

    return (
      <div className='d-flex flex-column text-center'>
        <div className='d-flex flex-column w-100 min-vh-100 p-3 mx-auto'>
          <Menu />
          <Footer />
        </div>
      </div>
    )
  }
}

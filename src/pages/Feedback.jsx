import React from 'react'
import { Alert, Container, Spinner, Form, Button } from 'react-bootstrap'
import Heading from '../components/Heading'

export default class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.heading = <Heading title='Zpětná vazba' />
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: true,
      year: null
    }
  }

  async componentDidMount() {
    try {
      this.setState({ loading: false, year: global.session.year })
    } catch (err) {
      this.setState({ loading: false, error: err })
    }
  }

  async handleSubmit(event) {
    this.setState({ loading: true })
    try {
      const response = await fetch(global.config.api.url + 'feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target[0].value,
          text: event.target[1].value
        })
      })
      const result = await response.json()
      this.setState({ loading: false, status: result.status })
    } catch (err) {
      this.setState({ loading: false, error: err })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Spinner animation='border' role='status' variant='light'>
            <span className='sr-only'>Načítání ...</span>
          </Spinner>
        </Container>
      )
    }

    if (this.state.error) {
      return (
        <Container>
          {this.heading}
          <Alert variant='danger'>
            <b>Ouha!</b> Nepodařilo se spojit se serverem, tudíž nelze vytvářet zpětné vazby.
          </Alert>
        </Container>
      )
    }

    if (!this.state.year) {
      return (
        <Container>
          {this.heading}
          <Alert variant='danger'>
            <b>Chyba!</b> Nepodařilo se dostat data ohledně ročníku ze serveru
          </Alert>
        </Container>
      )
    }

    if (this.state.status === 'ok') {
      return (
        <Container>
          {this.heading}
          <Alert variant='success'>
            <b>Děkujeme</b> za vaši zpětnou vazbu!
          </Alert>
        </Container>
      )
    }

    return (
      <Container>
        {this.heading}
        <p className='lead'>Pro vytvoření zpětné vazby vyplňte následující formulář</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='frantiskova.maminka@gmail.com' />
            <Form.Text className='text-white'>
              Sem prosím vložte Vaši emailovou adresu
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='feedback'>
            <Form.Label>Zpětná vazba</Form.Label>
            <Form.Control as='textarea' name='text' placeholder='Zde se prosím Vás rozepište' rows={3} />
          </Form.Group>
          <Form.Group>
            <Button variant='secondary' type='submit'>
              Odeslat
            </Button>
          </Form.Group>
          <Form.Group>
            <p className='mb-0'>
              V případě problémů nás kontaktujte na emailu&nbsp;
              <a href='mailto:mikulas@rudickamladez.cz'>mikulas@rudickamladez.cz</a>
            </p>
            <p className='mt-0'>
              Údaje poskytnuté v&nbsp;rámci rezervace budou použity jen pro&nbsp;účely této akce.
            </p>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

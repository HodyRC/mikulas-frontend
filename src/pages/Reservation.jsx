import React from 'react'
import { Alert, Container, Col, Spinner, Form, Button } from 'react-bootstrap'
import config from '../config'
import moment from 'moment'
import Heading from '../components/Heading'

export default class ReservationForm extends React.Component {
  constructor (props) {
    super(props)
    this.heading = <Heading title='Rezervace' />
    this.year = null
    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    const response = await fetch(config.api.url + 'year')
    this.year = await response.json()
    this.setState({ loading: false })
  }

  render () {
    if (this.state.loading) {
      return (
        <Container>
          <Spinner animation='border' role='status' variant='light'>
            <span className='sr-only'>Načítání ...</span>
          </Spinner>
        </Container>
      )
    }

    if (!this.year) {
      return (
        <Container>
          {this.heading}
          <Alert variant='danger'>
            <b>Chyba!</b> Nepodařilo se dostat data ohledně ročníku ze serveru
          </Alert>
        </Container>
      )
    }

    if (moment().diff(this.year.reservations.end) >= 0) {
      return (
        <Container>
          {this.heading}
          <p className='lead'>jsou již uzavřeny.</p>
        </Container>
      )
    }

    return (
      <Container>
        {this.heading}
        <p className='lead'>Pro vytvoření zpětné vazby vyplňte následující formulář</p>
        <Form>
          <Form.Row>
            <Col xs={12} lg={6}>
              <Form.Group controlId='firstname'>
                <Form.Label>Křestní jméno</Form.Label>
                <Form.Control type='text' placeholder='František' />
                <Form.Text className='text-white'>
                  Sem prosím vložte křestní jméno doprovodu
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group controlId='lastname'>
                <Form.Label>Příjmení</Form.Label>
                <Form.Control type='text' placeholder='Voprcálek' />
                <Form.Text className='text-white'>
                  Sem prosím vložte příjmení doprovodu
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} lg={6}>
              <Form.Group controlId='countOfKids'>
                <Form.Label>Počet dětí</Form.Label>
                <Form.Control type='number' placeholder='2' min='1' />
                <Form.Text className='text-white'>
                  Zde prosím vložte Váš počet dětí
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group controlId='countOfAdults'>
                <Form.Label>Počet dospělých</Form.Label>
                <Form.Control type='number' placeholder='1' min='0' />
                <Form.Text className='text-white'>
                  Zde prosím napište počet dospělých
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='frantikova.maminka@gmail.com' />
            <Form.Text className='text-white'>
              Sem prosím vložte Vaši emailovou adresu
            </Form.Text>
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

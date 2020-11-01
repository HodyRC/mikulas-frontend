import React from 'react'
import { Alert, Container, Col, Row, Spinner, Form, Button } from 'react-bootstrap'
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
          <Row>
            <Col>
              <Form.Group controlId='firstname'>
                <Form.Label>Křestní jméno</Form.Label>
                <Form.Control type='text' placeholder='Josef' />
                <Form.Text className='text-white'>
                  Sem prosím vložte křestní jméno dítěte
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='lastname'>
                <Form.Label>Příjmení</Form.Label>
                <Form.Control type='text' placeholder='Voprcálek' />
                <Form.Text className='text-white'>
                  Sem prosím vložte příjmení dítěte
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='pepikova.maminka@gmail.com' />
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

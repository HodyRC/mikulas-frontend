import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import Heading from '../components/Heading'

export default function FeedbackFrom () {
  return (
    <Container>
      <Heading title='Zpětná vazba' />
      <p className='lead'>Pro vytvoření zpětné vazby vyplňte následující formulář</p>
      <Form>
        <Form.Group controlId='email'>
          <Form.Label>Váš email</Form.Label>
          <Form.Control type='email' placeholder='pepikova.maminka@gmail.com' />
        </Form.Group>
        <Form.Group controlId='feedback'>
          <Form.Label>Zpětná vazba</Form.Label>
          <Form.Control as='textarea' placeholder='Zde se prosím Vás rozepište' rows={3} />
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
            Údaje poskytnuté v&nbsp;rámci zpětné vazby budou použity jen pro&nbsp;účely této akce.
          </p>
        </Form.Group>
      </Form>
    </Container>
  )
}

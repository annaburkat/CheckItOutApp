import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, Container, Row, Col  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function User(props) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    errorMessage: ''
  });

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:5000/api/v1/users/login', user)
    .then(function(response) {
      Cookies.set('jwt', response.data.token);
      props.history.push('/');
    })
    .catch(function(error) {
      setError({errorMessage: error.response.data.message})
      console.log(error.response);
    });
  };

  return (
    <div className='login'>
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
            <Form className='login__form' onSubmit={handleSubmit}>
              <h1 className='login__title'>Log in</h1>

              <Form.Group controlId="email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  onChange={handleChange} required/>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password"  onChange={handleChange} required/>
              </Form.Group>
              { error.errorMessage && <p className="form__error"> { error.errorMessage } </p> }

              <LinkContainer to='/aa' className='login__forgot text-right'>
                <p>Forgot your password?</p>
              </LinkContainer>

              <Button variant="primary" type="submit" className='login__submit'>
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

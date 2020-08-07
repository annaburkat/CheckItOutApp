import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, Container, Row, Col  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function User(props) {
  const [user, setUser] = useState({
    email: ''
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

    axios.post('http://localhost:5000/api/v1/users/forgotPassword', user)
    .then(function(response) {
      alert('Success! To proceed your request, please check your email!')
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
              <h1 className='login__title'>Remind Password</h1>

              <Form.Group controlId="email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  onChange={handleChange} required/>
              </Form.Group>

              { error.errorMessage && <p className="form__error"> { error.errorMessage } </p> }

              <Button variant="primary" type="submit" className='login__submit'>
                Send
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link  } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NewUser(props) {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  function handleChange(event) {
    setNewUser({
      ...newUser,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/api/v1/users/signup', newUser)
    .then(function (response) {
      Cookies.set('jwt', response.data.token);
      props.history.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className='login'>
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
            <Form className='login__form' onSubmit={handleSubmit}>
              <h1 className='login__title'>Sign in</h1>
              <Form.Group controlId="name">
                <Form.Label>Name*</Form.Label>
                <Form.Control type="text" placeholder="Name" onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  onChange={handleChange}/>
                <Form.Text className="text-muted">
                  Your password must be longer than 6 characters.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password*</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"  onChange={handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit" className='login__submit'>
                Submit
              </Button>

              <p className='login__terms'>
                By clicking Register I agree to Check It Out’s
                <Link
                  to={{
                      pathname: `/terms-and-conditions`}}><b> Terms & Conditions </b>
                </Link>
                and
                <Link
                  to={{
                      pathname: `/privacy-policy`}}><b> Privacy Policy</b>
                </Link>.
              </p>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

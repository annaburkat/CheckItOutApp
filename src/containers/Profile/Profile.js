import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function Profile(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/profile`, {withCredentials: true})
    .then(function (response) {
      // handle success
      setUser(response.data.data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, []);

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios.patch('http://localhost:5000/api/v1/users/updateProfile', user, {withCredentials: true})
    .then(function (response) {
      console.log(response);
      props.history.push('/profile');
    })
    .catch(function (error) {
      console.log(error);
    });
  };



  return (
    <div>
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} className="profile__title">
            <h1 className="page__title">Hi {user.name}!</h1>
            <h2 className="page__subtitle">Good to have you here!</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="d-flex">
            <img src='./images/profile_2.svg' className="profile__img"/>
          </Col>
          <Col xs={6} className="d-flex">
            <img src='./images/profile_1.svg' className="profile__img"/>
          </Col>
          <Col>
            <Form className='login__form' onSubmit={handleSubmit}>
              <h1 className='login__title'>Sign in</h1>
              <Form.Group controlId="name">
                <Form.Label>Your Name*</Form.Label>
                <Form.Control type="text" placeholder="Name" value={user.name} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  value={user.email} onChange={handleChange}/>
              </Form.Group>

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

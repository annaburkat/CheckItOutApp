{/*import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function Profile(props) {
  const [user, setUser] = useState();

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
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Your Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Put your name back!"
                  value={user.name}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={user.email}
                  />
              </Form.Group>

              <Button variant="primary" type="submit">Save Change</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}
*/}
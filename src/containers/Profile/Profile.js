import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link  } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function Profile(props) {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

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
    <div className="profile">
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} lg={{offset:1, span: 8}} className="profile__title form__title">
            <h1 className="page__title">Hi {user.name}!</h1>
            <h2 className="page__subtitle">Good to have you here!</h2>
          </Col>
        </Row>
        <Row className="profile__main">
          <Col xs={12} lg={3} className="d-flex">
            <img src='./images/profile_2.svg' className="profile__img" alt=''/>
          </Col>
          <Col xs={12} lg={3} className="d-flex profile__order">
            <img src='./images/profile_1.svg' className="profile__img" alt=''/>
          </Col>
          <Col xs={12} lg={6}>
            <Form className='login__form'>
              <h1 className='login__title'>Your profile</h1>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={user.name} disabled/>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  value={user.email} disabled/>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  value="*******" disabled/>
              </Form.Group>

              <div className="profile__buttons">
                <Link
                  className="profile__link"
                  to={{
                      pathname: `/update-user/`,
                    }}>
                    <Button variant="primary" type="submit" className='profile__btn'>
                      Edit Profile
                    </Button>
                </Link>
                <Link
                  className="profile__link"
                  to={{
                      pathname: `/update-user/`,
                    }}>
                    <Button type="submit" className='profile__btn'>
                      Delete Profile
                    </Button>
                </Link>
              </div>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

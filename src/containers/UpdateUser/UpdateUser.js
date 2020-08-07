import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function UpdateUser(props) {
  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState({
    errorMessage: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/profile`, {withCredentials: true})
    .then(function (response) {
      setUpdateUser(response.data.data.data);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }, []);

  function handleChange(event) {
    setUpdateUser({
      ...updateUser,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    const token = Cookies.get('jwt');
    let formattedUser={};
      for (let prop in updateUser) {
        if (updateUser[prop] !== '' && updateUser[prop].length > 0) {
        formattedUser[prop] = updateUser[prop]
      }
    }
    if (token !== null) {
    axios.patch('http://localhost:5000/api/v1/users/updateProfile', formattedUser)
    .then(function (response) {
      props.history.push('/profile');
    })
    .catch(function (error) {
      setError({errorMessage: error.response.data.message})
      console.log(error.response);
    });
  } else {
    props.history.push('./newPlace')
    }
  };


  return (
    <div className="profile">
      <TopNavbar history={props.history}/>
      <Container>
        <Row className="profile__main">
          <Col xs={6} lg={3} className="d-flex">
            <img src='./images/profile_2.svg' className="profile__img" alt=''/>
          </Col>
          <Col xs={6} lg={3} className="d-flex profile__order">
            <img src='./images/profile_1.svg' className="profile__img" alt=''/>
          </Col>
          <Col xs={12} lg={6}>
            <Form className='login__form' onSubmit={handleSubmit}>
              <h1 className='login__title'>Edit your profile</h1>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={updateUser.name} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  value={updateUser.email} onChange={handleChange}/>
              </Form.Group>
              { error.errorMessage && <p className="form__error"> { error.errorMessage } </p> }

              <Button variant="primary" type="submit" className='login__submit'>
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

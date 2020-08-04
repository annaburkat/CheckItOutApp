import React, { useState } from "react";
import axios from 'axios';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Form, Button, Container, Col, Row  } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NewPlace(props) {
  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    imageCover: '',
    address: '',
    country:'',
    city:''
  });

  function handleSelect(event) {
    setNewPlace({
      ...newPlace,
      [event.target.name]: event.target.value
    })
  };

  function handleChange(event) {
    setNewPlace({
      ...newPlace,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(newPlace)
    const token = localStorage.getItem('jwtToken');
    console.log(token)
    if (token !== null) {
      axios.post('http://localhost:5000/api/v1/places', newPlace, {
        headers: {
          authorization: `BearerToken ${token}`
        }
      })
      .then(function (response) {
        console.log(response);
        props.history.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      props.history.push('./login')
    }

  }

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Container class="form">
        <Row>
          <Col xs={12} className="form__title">
            <h1 className="page__title">NewPlace</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={newPlace.name}
                    onChange={handleChange}
                    required/>
                  <Form.Text className="text-muted">
                    We're pretty sure it's not necessary but maybe? Just in case, name can't be longer than 100 characters.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Type of Place*</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={newPlace.category}
                    onChange={handleSelect}
                    required>
                    <option value=""></option>
                    <option value="cinema">cinema</option>
                    <option value="cafe">cafe</option>
                    <option value="pub">pub</option>
                    <option value="outdoor">outdoor</option>
                    <option value="restaurant">restaurant</option>
                    <option value="museum">museum</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    value={newPlace.address}
                    onChange={handleChange}
                    required/>
                  <Form.Text className="text-muted">
                    Address so something like: 12 S Circular Rd, Portobello, Dublin 8, D08 XTN5
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={newPlace.country}
                    onChange={handleChange}
                    required/>
                </Form.Group>

                <Form.Group controlId="imageCover">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Image"
                    value={newPlace.imageCover}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Image isn't required but well, with image would be nicer :) And it should be url
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
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

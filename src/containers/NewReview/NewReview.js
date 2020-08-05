import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Form, Button, Container, Col, Row  } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NewReview(props) {
  const [newReview, setNewReview] = useState({
    review: '',
    rating: ''
  });
  const placeId = props.location.state.placeId;


  function handleSelect(event) {
    console.log(newReview);
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value
    })
  };

  function handleChange(event) {
    console.log(newReview);
    setNewReview({
      ...newReview,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    const token = Cookies.get('jwt');
    if (token !== null) {
      axios.post(`http://localhost:5000/api/v1/places/${placeId}/reviews`, newReview, {withCredentials: true})
      .then(function (response) {
        console.log(response);
        props.history.push('/profile');
      })
      .catch(function (error) {
        console.log(error.message);
      });
    } else {
      props.history.push('./')
    }
  };

  return (
    <div className="form">
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} lg={{offset:2, span: 8}}>
              <Form onSubmit={handleSubmit}>
                <h1 className="page__title form__title text-center">Share with us what do you think about this place?</h1>

                <Form.Group controlId="review">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    value={newReview.review}/>
                </Form.Group>

                <Form.Group controlId="priceRange">
                  <Form.Label>Price Range</Form.Label>
                  <Form.Control
                    as="select"
                    name="priceRange"
                    value={newReview.rating}
                    onChange={handleSelect}
                    >
                    <option value="">Select Category</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Control>
                </Form.Group>


                <Button type="submit" className="form__btn">
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

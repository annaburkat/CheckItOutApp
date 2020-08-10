import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, Container, Col, Row, Image  } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NewReview(props) {
  const [newReview, setNewReview] = useState({
    review: '',
    rating: ''
  });
  const [place, setPlace] = useState([]);
  const placeId = props.location.state.placeId;

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/v1/places/${placeId}`, {withCredentials: true})
    .then(function (response) {
      setPlace(response.data.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);


  function handleSelect(event) {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value
    })
  };

  function handleChange(event) {
    setNewReview({
      ...newReview,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    const token = Cookies.get('jwt');
    console.log(token);
    if (token !== null) {
      let formattedReview={};
        for (let prop in newReview) {
          if (newReview[prop] !== '' && newReview[prop].length > 0) {
          formattedReview[prop] = newReview[prop]
        }
      }
      axios.post(`http://localhost:5000/api/v1/places/${placeId}/reviews`, formattedReview, {withCredentials: true})
      .then(function (response) {
        Cookies.get('jwt', response.data.token);
        props.history.push(`/places/${place.slug}`, {
            placeId: place._id
        });
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
          <Col xs={12} className="reviews__title">
            <h1 className="page__title text-center">What do you think about {place.name}?</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6} className="place__img-wrapper" >
            <Image src={place.imageCover} className="reviews__img"/>
          </Col>
          <Col xs={12} lg={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="review">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    value={newReview.review}/>
                </Form.Group>

                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="rating"
                    value={newReview.rating}
                    onChange={handleSelect}
                    >
                    <option value="">Select Category</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Form.Control>
                </Form.Group>

              <Button type="submit" className="form__btn">
                Add Review
              </Button>
            </Form>
          </Col>
          </Row>
        </Container>
      <Footer history={props.history}/>
    </div>
  );
}

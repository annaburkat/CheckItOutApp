import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Jumbotron, Form, Button } from 'react-bootstrap';

export default function Hero(props) {
  const [places, setPlaces] = useState({
    city: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/places`, {withCredentials: true})
      .then(function (response) {
        // handle success
        setPlaces(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const token = Cookies.get('jwt');
    if (token !== null) {
      axios.patch('http://localhost:5000/api/v1/places', places, {withCredentials: true})
      .then(function (response) {
        console.log(response);
        props.history.push('/places');
      })
      .catch(function (error) {
        console.log(error.message);
      });
    } else {
      props.history.push('./login')
    }
  };


  return (
    <Jumbotron className="hero">
      <h1 className="hero__title">Check it out</h1>
      <Form className="hero__form">
      {/*    <Form.Group controlId="formBasicEmail">
        TODO: add search icon, add button
          <Form.Control
            type="text"
            placeholder="Find perfect spot"
          />
        </Form.Group>*/}

        <Form.Group controlId="country">
          <Form.Control
            as="select"
            name="country"
            required>
            <option value="">Select Category</option>
            {
              places.length ?
                places.map(place =>
                  <option value={place.city}>{place.city}</option>
              )
            : null
          }
          </Form.Control>
        </Form.Group>


        <Button type="submit" className="form__btn">
          Submit
        </Button>
      </Form>
    </Jumbotron>

  );
}
import React, { useState } from "react";
import axios from 'axios'
import { Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NewPlace(props) {
  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    imageCover: ''
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
      <h1>NewPlace</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={newPlace.name} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Type of Place</Form.Label>
          <Form.Control as="select" name="category" value={newPlace.category} onChange={handleSelect} >
            <option value=""></option>
            <option value="cinema">cinema</option>
            <option value="cafe">cafe</option>
            <option value="shop">shop</option>
            <option value="restaurant">restaurant</option>
            <option value="museum">museum</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="imageCover">
          <Form.Label>Picture</Form.Label>
          <Form.Control type="url" placeholder="Image" value={newPlace.imageCover} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
      <Footer history={props.history}/>
    </div>
  );
}

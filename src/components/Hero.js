import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Jumbotron, Form, Button } from 'react-bootstrap';

export default function Hero(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [places, setPlaces] = useState({
    city: ''
  });
  const [city, setCity] = useState([]);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token !== null && token !== undefined) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  function handleSelect(event) {
    setCity({
      ...city,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/places/getCities`, {withCredentials: true})
      .then(function (response) {
        console.log(response.data.data)
        setPlaces(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);



  return (
    <div>
      { loggedIn ?
        <Jumbotron className="hero">
          <h1 className="hero__title">Experience a city</h1>
          <Form
            className="hero__form"
          >
          {/*    <Form.Group controlId="formBasicEmail">
            TODO: add search icon, add button
              <Form.Control
                type="text"
                placeholder="Find perfect spot"
              />
            </Form.Group>*/}

            <Form.Group controlId="city">
              <Form.Control
                as="select"
                name="city"
                onChange={handleSelect}
                required>
                <option value="">Select Category</option>
                {
                  places.length ?
                    places.map(x =>
                      <option value={x}>{x}</option>
                  ):
                  <option value="grazynka">Grazynka</option>
                }
              </Form.Control>
            </Form.Group>

            <Button type="submit" className="form__btn">
              Submit
            </Button>
          </Form>
        </Jumbotron> :

        <Jumbotron className="hero hero--loggedOut">
          <h1 className="hero__title">Explore</h1>
        </Jumbotron>
      }
    </div>
  );
}
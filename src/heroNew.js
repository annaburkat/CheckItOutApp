import React from "react";
import { Jumbotron, Form } from 'react-bootstrap';



export default function Hero(props) {
  const [location, setLocation] = useState({
    location: ''
  });

  function handleChange(event) {
    setLocation({
      ...location,
      [event.target.id]: event.target.value
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:5000/api/v1/places/?${location}`)
    .then(function (response) {
      setLocation(response.data)
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };

  return (
    <Jumbotron className="hero">
      <h1 className="hero__title">Check it out</h1>
      <Form className="hero__form" onSubmit={handleSubmit}>
        <Form.Group controlId="location">
      {/*    TODO: add search icon, add button*/}
          <Form.Control type="text" placeholder="Find perfect spot" onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Jumbotron>

  );
}
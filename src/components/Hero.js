import React from "react";
import { Jumbotron, Form } from 'react-bootstrap';

export default function Hero(props) {

  return (
    <Jumbotron className="hero">
      <h1 className="hero__title">Check it out</h1>
      <Form className="hero__form">
        <Form.Group controlId="formBasicEmail">
      {/*    TODO: add search icon, add button*/}
          <Form.Control type="text" placeholder="Find perfect spot" />
        </Form.Group>
      </Form>
    </Jumbotron>

  );
}
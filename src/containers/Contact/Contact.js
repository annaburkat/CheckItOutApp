import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function Contact(props) {

  return (
    <>
        <TopNavbar history={props.history}/>
        <Container>
            <Row>
              <Col xs={12} sm={12} lg={6} className="home__title">
                <div className="page-padding">
                <h3>Questions?</h3>
                <p>If you have a question in regards to a location please use the form.</p>
                  <br/>
                <h3 className="">Give us a call on 085 229 20 52</h3>
                <p>If you have a question in regards to a location please use the form.</p>
                </div>
              </Col>
            <Col xs={12} sm={12} lg={6} className="home__subtitle">
              <div className="page-padding">
              <h3>Send us a message </h3>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              </div>
            </Col>
          </Row>
      </Container>
      <Footer history={props.history}/>
    </>
  );
}
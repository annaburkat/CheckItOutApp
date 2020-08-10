import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function About(props) {
  return (
    <>
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} sm={12} lg={{span:10, offset:1}} className="home__title">
            <div className="page-padding">
            <h1>About Check It Out</h1>
            <h4> Application created for people who love exploring new places </h4>
            <img src='/images/about.jpg' className="page__img" />
            <p>Sharing is carrying! We finally can present to you application design to help you sharing places with soul. Let know your friends where they can grab the best coffee in the city, what time is your favourite restaurant open or recommend a good spot for a picnic.  </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer history={props.history}/>
    </>
  );
}
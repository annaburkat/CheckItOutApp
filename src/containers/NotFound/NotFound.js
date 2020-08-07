import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link  } from "react-router-dom";

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function NotFound(props) {

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Container>
        <Row>
          <Col xs={12} lg={{span: 10, offset: 1}}>
            <h1 className="notfound__title">Oops!</h1>
            <h2>We can't seem to find the page you're looking for.</h2>
            <Link
              to={{
                  pathname: `/`,
                }}>
                <h5>Go to home page</h5>
            </Link>
          </Col>
        </Row>
        <img src='./images/notfound.svg'  alt="image not found" className="notfound__img"/>
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}
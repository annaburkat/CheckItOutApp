import React from "react";
import { Col, Container, Row } from 'react-bootstrap';

export default function Footer(props) {
  return (
    <footer className="footer pt-4">
      <Container className="text-center text-md-left">
        <Row>
          <Col xs={12} sm={12} lg={5}>
            <h5 className="title text-left">Footer Content</h5>
            <p className="text-left">
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
          <Col xs={12} sm={6} lg={{span: 3, offset: 1}}>
            <ul>
              <li className="list-unstyled">
                <a className="footer__link" href="/login">Login</a>
              </li>
              <li className="list-unstyled">
                <a className="footer__link" href="/users">Users</a>
              </li>
              <li className="list-unstyled">
                <a className="footer__link" href="/places">Places</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <ul>
              <li className="list-unstyled">
                <a className="footer__link" href="/about">About</a>
              </li>
              <li className="list-unstyled">
                <a className="footer__link" href="/contact">Contact</a>
              </li>
              <li className="list-unstyled">
                <a className="footer__link" href="/terms-and-conditions">Terms & Conditions</a>
              </li>
              <li className="list-unstyled">
                <a className="footer__link" href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright: Anna Burkat
        </Container>
      </div>
    </footer>
  );
}


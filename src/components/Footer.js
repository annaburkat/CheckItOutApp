import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import { Link  } from "react-router-dom";

export default function Footer(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    console.log(token)
    if (token !== null && token !== undefined) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, []);

  return (
    <footer className="footer pt-4">
      <Container className="text-center text-md-left">
        <Row>
          <Col xs={12} sm={12} lg={5}>
            <Link to='/' className="footer__logo-link">
              <img src="/logo.png" alt="log" className="footer__logo"/>
            </Link>
            <h5 className="title text-left">Find you place</h5>
            <p className="text-left footer__text">
              Find amazing locations recommended by your like-minded friends!
            </p>
          </Col>
          <Col xs={12} sm={6} lg={{span: 3, offset: 1}}>
            <ul className="footer__menu">
              <li className="list-unstyled">
                <a className="footer__link" href="/login">Login</a>
              </li>
              {loggedIn ?
              <li className="list-unstyled">
                <a className="footer__link" href="/places">Places</a>
              </li> : null}
              <li className="list-unstyled">
                <a className="footer__link" href="/about-us">About</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <ul className="footer__menu">
              <li className="list-unstyled">
                <a className="footer__link" href="/contact">Contact</a>
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


import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Col, Card, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link  } from "react-router-dom";

import TopNavbar from "../../components/TopNavbar";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import CategoriesLinks from "../../components/CategoriesLinks";
import Footer from "../../components/Footer";

export default function Home(props) {
  const [places, setPlaces] = useState([]);
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

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/places/top-six')
    .then(function (response) {
      console.log(response)
      // handle success
      setPlaces(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, []);

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Hero/>
      <Container>
        {
          loggedIn ?
          <CategoriesLinks/>
        : <Categories/>
        }
        <Row className="home__places">
          <Col xs={12} sm={12} lg={12} className="home__subtitle">
            <h2 className="page__subtile">The best places</h2>
          </Col>
        {
          places.length ?
            places.map(place =>
                <Col key={place._id} xs={12} sm={6} lg={4}>
                  <Card className="home-card">
                    <span className="home-card__sticker">{place.city} / {place.category}</span>
                    <Card.Img variant="top" src={place.imageCover} className="home-card__img"/>
                    <Card.Body className="home-card__text">
                      <Card.Title className="home-card__titke">{place.name}</Card.Title>
                      <Card.Text className="home-card__desc">
                        {place.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

            )
          : null
        }
        </Row>
      </Container>
      <Footer history={props.history}/>
    </div>

  );
}
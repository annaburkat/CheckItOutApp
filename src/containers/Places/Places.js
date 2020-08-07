import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TopNavbar from "../../components/TopNavbar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

export default function Places(props) {
  const [places, setPlaces] = useState([]);
  const query = props.location.search;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/places/${query}`, {withCredentials: true})
      .then(function (response) {
        setPlaces(response.data)
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }, []);

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Hero/>
      <Container>
        <Row className="place__top">
          <Col xs={12} lg={{span: 12}}  className="place__title">
            <h1 className="page__title">Places worth visiting</h1>
            <Link
              className="place__link"
              to={{
                pathname: `/new-place`,
                }}>
                <Button className="place__edit-btn">Add new place</Button>
            </Link>
          </Col>
        </Row>
        <Row className="place-card__wrapper">
            {
              places.length ?
                places.map(place =>
                  <Col key={place._id} xs={12} sm={6} lg={4} className="place-card__box">
                    <Card className="place-card">
                      <span className="place-card__sticker">{place.city} / {place.category}</span>
                      <Card.Img variant="top" src={place.imageCover} className="place-card__img"/>
                      <Card.Body className="place-card__text">
                        <Card.Title>{place.name}</Card.Title>
                        <Card.Text className="place-card__desc">
                          {place.description}
                        </Card.Text>
                      </Card.Body>
                      <Link
                        className='place-card__cta'
                        to={{
                        pathname: `/places/${place.slug}`,
                        state: {
                          placeId: place._id
                        }
                        }}>
                        <Card.Body className='place-card__cta-btn'>
                          Check It Out
                        </Card.Body>
                      </Link>
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
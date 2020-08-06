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
        console.log(error);
      })
  }, []);

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Hero/>
      <Container>
        <Row>
          <Col xs={10} lg={{span: 9, offset: 1}} className="place-card__title">
            <h1 className="page__title">Places worth visiting</h1>
          </Col>
          <Col xs={2} lg={2} className="place__title">
            <Link
              to={{
                pathname: `/new-place`,
                }}>
                <Button>Add new place</Button>
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
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <FontAwesomeIcon className='place-card__icon' icon='map-marker-alt' />{place.address}</ListGroupItem>
                        <ListGroupItem>
                          <FontAwesomeIcon className='place-card__icon' icon='clock' />{place.opening}</ListGroupItem>
                        <ListGroupItem className="place-card__social-icons">
                          {place.website ?
                            <a href={place.website} target='_blank' rel="noopener noreferrer" >
                              <FontAwesomeIcon className='place-card__social-icon' icon='globe' />
                            </a>
                            : null}
                          {place.instagram ?
                            <a href={place.instagram} target='_blank' rel="noopener noreferrer" >
                              <FontAwesomeIcon className='place-card__social-icon'  icon={['fab', 'instagram']}  />
                            </a>
                            : null}
                          {place.fb ?
                            <a href={place.fb} target='_blank' rel="noopener noreferrer" >
                              <FontAwesomeIcon className='place-card__social-icon'  icon={['fab', 'facebook']} />
                            </a>
                            : null}
                        </ListGroupItem>
                      </ListGroup>
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
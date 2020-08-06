import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { Link  } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Place(props) {
  const [place, setPlace] = useState([]);
  const [reviews, setReviews] = useState([]);

  const placeId = props.location.state.placeId;
  const url = window.location.href;
  const slug = place.slug;

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/v1/places/${placeId}`, {withCredentials: true})
    .then(function (response) {
      // handle success
      setPlace(response.data.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/v1/places/${placeId}/reviews`, {withCredentials: true})
    .then(function (response) {
      // handle success
      setReviews(response.data);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  return (
    <div>
      <TopNavbar history={props.history}/>
      <Container className="place">
        <Breadcrumbs name={place.name}/>
        <Row className="place__top">
          <Col xs={12} lg={{span: 10, offset: 1}} className="place__title">
            <h1 className="page__title">{place.name}</h1>
            <Link
              className="place__link"
              to={{
                pathname: `/update-place/${place.slug}`,
                state: {
                  placeId: place._id,
                  placeSlug: slug
                }
                }}>
                <Button className="place__edit-btn">Edit {place.name}</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={11} lg={{span: 10, offset: 1}} className="place__img-wrapper" >
            <span className="place__sticker">{place.city} / {place.category}</span>
            <Image src={place.imageCover} className="place__img"/>
          </Col>
          <Col xs={12} md={1}>
            <span className="place__sharing">
              Sharing is caring
            </span>
            <FacebookShareButton className='place__sharing-icon' url='http://localhost:3000/places/cinemateket'>
              <FacebookIcon size={24} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton className='place__sharing-icon' url='http://localhost:3000/places/cinemateket'>
              <WhatsappIcon size={24} round={true} />
            </WhatsappShareButton>
            <EmailShareButton className='place__sharing-icon' url='http://localhost:3000/places/cinemateket'>
              <EmailIcon size={24} round={true} />
            </EmailShareButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={{span: 10, offset: 1}}>
            <span className="place__info">
              <FontAwesomeIcon className='place__info-icon' icon='map-marker-alt' />{place.address}
            </span>
          </Col>
          <Col xs={12} lg={{span: 10, offset: 1}}>
            <div>{place.description}</div>
          </Col>
        </Row>
        { reviews.length ?
        <div className="reviews">
          <Row>
            <Col xs={10} lg={{span: 9, offset: 1}} className="reviews__title">
              <h1 className="page__title">Reviews</h1>
            </Col>
            <Col xs={2} lg={2} className="place__title">
              <Link
                to={{
                  pathname: `/places/${place._id}/reviews`,
                  state: {
                    placeId: place._id,
                    placeSlug: slug
                  }
                  }}>
                  <Button>Add review</Button>
              </Link>
            </Col>
          </Row>
          <Row className="reviews__boxes">
            <Col xs={0} lg={1}>&nbsp;</Col>
            {
              reviews.length ?
                reviews.map(review =>
                  <Col xs={12} md={6} lg={3}>
                    <Card key={review._id} className="reviews__wrapper">
                      <Card.Title className="reviews__top">
                        <div>
                          <span className="reviews__avatar">{review.user.name.substring(0,1)}</span> {review.user.name}
                        </div>
                        <div>
                          <FontAwesomeIcon className='reviews__icon' icon='star' />{review.rating}
                        </div>
                      </Card.Title>
                      <Card.Text>{review.review}</Card.Text>
                   </Card>
                  </Col>
                 )
              : null
            }
          </Row>
        </div>
        :
        <Row>
          <Col xs={12} lg={{span: 10, offset: 1}} className="place__title">
            <h1 className="page__title">Do you know {place.name}?</h1>
            <Link

              to={{
                pathname: `/places/${place.slug}/reviews`,
                state: {
                  placeId: place._id
                }
                }}>
                <Button className="place__review-btn">Add review</Button>
            </Link>
          </Col>
        </Row>
      }
      </Container>
      <Footer history={props.history}/>
    </div>
  );
}

    // axios.post(`http://localhost:5000/places/${placeId}/reviews`, formattedReview)
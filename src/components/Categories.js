import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link  } from "react-router-dom";

export default function Categories(props) {

  return (
    <Row className='justify-content-center categories'>
      <Col xs={12} sm={12} lg={12}>
        <h2>Look up categories</h2>
      </Col>
      <Col xs={12} sm={6} lg={4} >
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=restaurant"
        }}>
          <div className='category__box mint'>
            <FontAwesomeIcon className='category__icon' icon='utensils' />
            <h3 className='category__title'>Restaurant</h3>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={6} lg={4}>
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=cafe"
        }}>
          <div className='category__box primary'>
            <FontAwesomeIcon className='category__icon' icon='coffee' />
            <h3 className='category__title'>Cafe</h3>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={6} lg={4}>
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=pub"
        }}>
          <div className='category__box redish'>
            <FontAwesomeIcon className='category__icon' icon='beer' />
            <h3 className='category__title'>Pub</h3>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={6} lg={4}>
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=cinema"
        }}>
          <div className='category__box basicDark'>
            <FontAwesomeIcon className='category__icon' icon='film' />
            <h3 className='category__title'>Cinema</h3>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={6} lg={4}>
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=museum"
        }}>
          <div className='category__box pinkish'>
            <FontAwesomeIcon className='category__icon' icon='palette' />
            <h3 className='category__title'>Museum</h3>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={6} lg={4}>
        <Link
          className="category"
          to={{
          pathname: "/places",
          search: "?category=outdoor"
        }}>
          <div className='category__box mustard'>
            <FontAwesomeIcon className='category__icon' icon='tree' />
            <FontAwesomeIcon className='category__icon' icon='umbrella-beach' />
            <h3 className='category__title'>Outdoor</h3>
          </div>
        </Link>
      </Col>
    </Row>
  );
}


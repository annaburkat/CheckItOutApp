import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

export default function Breadcrumbs(props) {

  return (
    <Breadcrumb className="breadcrumbs">
      <Breadcrumb.Item href="/" className="breadcrumbs__link">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/places" className="breadcrumbs__link">Places</Breadcrumb.Item>
      <Breadcrumb.Item active className="breadcrumbs__link breadcrumbs__link--current">{props.name}</Breadcrumb.Item>
    </Breadcrumb>
  );
}


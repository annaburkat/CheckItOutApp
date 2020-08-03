import React from "react";
import { Container } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function Contact(props) {

  return (
    <div>
        <TopNavbar history={props.history}/>
        <Container>
          Contact
        </Container>
        <Footer history={props.history}/>
    </div>
  );
}
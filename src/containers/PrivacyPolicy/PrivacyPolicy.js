import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicy(props) {

  return (
    <div>
      <TopNavbar history={props.history}/>
        <Container>
          <Row>
            <Col className="page-padding">
            <h1>Privacy Policy</h1>
              <div>
              <p>We are very delighted that you have shown interest in our enterprise. Data protection is of a particularly high priority for the management of the CheckItOut Media. The use of the Internet pages of the CheckItOut Media is possible without any indication of personal data; however, if a data subject wants to use special enterprise services via our website, processing of personal data could become necessary. If the processing of personal data is necessary and there is no statutory basis for such processing, we generally obtain consent from the data subject.</p>
              <p>The processing of personal data, such as the name, address, e-mail address, or telephone number of a data subject shall always be in line with the General Data Protection Regulation (GDPR), and in accordance with the country-specific data protection regulations applicable to the CheckItOut Media. By means of this data protection declaration, our enterprise would like to inform the general public of the nature, scope, and purpose of the personal data we collect, use and process. Furthermore, data subjects are informed, by means of this data protection declaration, of the rights to which they are entitled.</p>
              <p>As the controller, the CheckItOut Media has implemented numerous technical and organizational measures to ensure the most complete protection of personal data processed through this website. However, Internet-based data transmissions may in principle have security gaps, so absolute protection may not be guaranteed. For this reason, every data subject is free to transfer personal data to us via alternative means, e.g. by telephone.</p>
              <h2>1. Definitions</h2>
              <p>The data protection declaration of the CheckItOut Media is based on the terms used by the European legislator for the adoption of the General Data Protection Regulation (GDPR). Our data protection declaration should be legible and understandable for the general public, as well as our customers and business partners. To ensure this, we would like to first explain the terminology used.</p>
              <p>In this data protection declaration, we use, inter alia, the following terms:</p>
              <h3>a) Personal data</h3>
              <p>Personal data means any information relating to an identified or identifiable natural person (“data subject”). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.</p>
              <h3>b) Data subject</h3>
              <p>Data subject is any identified or identifiable natural person, whose personal data is processed by the controller responsible for the processing.</p>
              <h3>c) Processing</h3>
              <p>Processing is any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.</p>
              <h3>d) Restriction of processing</h3>
              <p>Restriction of processing is the marking of stored personal data with the aim of limiting their processing in the future.</p><h3 >e) Profiling</h3>
              <p>Profiling means any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person, in particular to analyse or predict aspects concerning that natural person’s performance at work, economic situation, health, personal preferences, interests, reliability, behaviour, location or movements.</p>
              <h3>f) Pseudonymisation</h3>
              <p>Pseudonymisation is the processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organisational measures to ensure that the personal data are not attributed to an identified or identifiable natural person.</p>
              <h3>g) Controller or controller responsible for the processing</h3><p>Controller or controller responsible for the processing is the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data; where the purposes and means of such processing are determined by Union or Member State law, the controller or the specific criteria for its nomination may be provided for by Union or Member State law.</p>
              </div>
            </Col>
          </Row>
        </Container>
      <Footer history={props.history}/>
    </div>
  );
}
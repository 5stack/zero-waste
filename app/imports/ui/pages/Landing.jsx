import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/zero-waste-logo.png" width="200px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome Zero Waste</h1>
        <p>We worked for a better planet!</p>
      </Col>

    </Row>
  </Container>
);

export default Landing;

import React from "react";
import QRCode from "react-qr-code";
import { Card, Col, Container, Row } from 'react-bootstrap';

const QRcode = () => (

    <Container className="py-8">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Scan QR Code</h2></Col>
          <Card.Body className="text-center">
            <QRCode value="https://n0-waste.xyz/add"/>
          </Card.Body>
        </Col>
      </Row>
    </Container>
);

export default QRcode;
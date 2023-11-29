import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

const OrderConfirmation = () => {
  const location = useLocation();
  const submittedData = location.state?.submittedData || {};
  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Order Confirmation</h2></Col>
            {submittedData && (
                <Card>
                  <Card.Header>Order Details</Card.Header>
                  <p>Order ID: {submittedData.orderId}</p>
                  <p>Name: {submittedData.name}</p>
                  <p>Size: {submittedData.size}</p>
                  <p>Quantity: {submittedData.quantity}</p>
                </Card>
            )}
          </Col>
        </Row>
      </Container>
  );
};
export default OrderConfirmation;
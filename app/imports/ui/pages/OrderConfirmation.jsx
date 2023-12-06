import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submittedData = location.state?.submittedData || {};

  const redirectToQRCodePage = () => {

    navigate('/qrcode', {
      state: {
        orderId: submittedData.orderId,
        name: submittedData.name,
        size: submittedData.size,
        quantity: submittedData.quantity,
      },
    });
  };
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
                  <Card.Footer>
                    <button onClick={redirectToQRCodePage}>View QR Code for Payment</button>
                  </Card.Footer>
                </Card>
            )}
          </Col>
        </Row>
      </Container>
  );
};
export default OrderConfirmation;
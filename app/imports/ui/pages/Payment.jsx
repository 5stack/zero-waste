import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PaymentPage = () => {
  const location = useLocation();
  const { orderId, name, size, quantity } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePaymentSubmit = async () => {
    try {
      // Validate card information (you may want to use a library for this)
      // If validation is successful, you can proceed with the payment
      if (!cardNumber || !expDate || !cvv) {
        throw new Error('Please fill in all the card details.');
      }
      // Simulate making a payment request
      const response = await fetch('https://reqres.in/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: 100, // Assuming an amount for the payment
          cardNumber,
          expDate,
          cvv,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      // Handle success (e.g., show a success message)
      alert('Payment successful!');
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error (e.g., show an error message)
      alert('Payment failed. Please try again.');
    }
  };

  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center">
              <h2>Payment Page</h2>
            </Col>
            <Form>
              {/* Display order details */}
              <Form.Group>
                <Form.Label>Order ID</Form.Label>
                <Form.Control type="text" value={orderId} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Size</Form.Label>
                <Form.Control type="text" value={size} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text" value={quantity} />
              </Form.Group>

              {/* Payment details */}
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="MM/YYYY"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                />
              </Form.Group>

              {/* Payment button */}
              <Button variant="primary" onClick={handlePaymentSubmit}>
                Submit Payment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default PaymentPage;

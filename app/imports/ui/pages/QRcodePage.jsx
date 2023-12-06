import React, { useEffect, useState } from "react";
import QRCode from 'qrcode.react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const generateFakePayment = async ({ orderId, amount }) => {
  try {
    const response = await fetch('https://reqres.in/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount,
      }),
    });

    console.log('Payment API full response:', response);

    if (!response.ok) {
      throw new Error(`Failed to generate payment. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Payment API parsed response:', result);

    // Adjust the error check to be more flexible
    if (!result || (result.data && !result.data.url)) {
      throw new Error(`Invalid payment response. Missing ${result ? 'result.data.url' : 'result'}`);
    }

    // Use result.data.url if available, otherwise, use result.url
    return result.data ? result.data.url : result.url;
  } catch (error) {
    console.error('Error generating fake payment:', error);
    return 'https://reqres.in/qr-code-placeholder';
  }
};

const QRCodePage = (props) => {
  const { orderId, name, size, quantity } = location.state || {};
  const [qrCodeValue, setQRCodeValue] = useState('');
  const navigate = useNavigate();
  const submittedData = location.state?.submittedData || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentUrl = await generateFakePayment({ orderId, amount: 100 });
        setQRCodeValue(paymentUrl);

        // Navigate to the Payment page after generating QR code
        navigate('/payment', {
          state: {
            orderId: submittedData.orderId,
            name: submittedData.name,
            size: submittedData.size,
            quantity: submittedData.quantity,
          },
        });
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData().then(r => console.log('fetchData result:', r));
  }, [orderId, navigate]);


  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Order Confirmation</h2></Col>
            <Card>
              <Card.Header>Order Details</Card.Header>
              <p>Order ID: {submittedData.orderId}</p>
              <p>Name: {submittedData.name}</p>
              <p>Size: {submittedData.size}</p>
              <p>Quantity: {submittedData.quantity}</p>
              <Card.Footer>
                <QRCode value={qrCodeValue} />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default QRCodePage;

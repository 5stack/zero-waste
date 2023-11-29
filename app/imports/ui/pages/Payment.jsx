import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import AddContainer from './AddContainer';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#000000'},
      '::placeholder': {color: '#000000'},
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}


const Payment  = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:3001/payment', {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
    return (
        <>
          {!success ? (
                  <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                      <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                      </div>
                    </fieldset>
                    <button>Pay</button>
                  </form>
              ) :
              <div>
                <h2>Thank you for your payment</h2>
                <AddContainer/>
              </div>
          }
        </>
    );
  }
  };
 export default Payment;
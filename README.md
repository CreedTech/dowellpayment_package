# Dowell-Payment Package

## Version 1.0.4

### Description

Welcome to the Dowell Payment package!.A simple npm package for initiating and verifying payments using Stripe or PayPal.

### Installation

Install the package using npm:

```bash
npm install dowellpayment
```

### Usage

Import the package and use the Payment class to initiate and verify payments using either Stripe or PayPal.

### Example

```javascript
import React, { useState } from 'react';
import Payment from 'dowellpayment';

const PaymentComponent = () => {
   const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [paymentResult, setPaymentResult] = useState('');
  const [approvalUrl, setApprovalUrl] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  // Add other keys

  const handleInitializePayment = async () => {
    // Initialize the Payment class
    const payment = new Payment();

    try {
      // Specify additional keys for the selected payment method
      const otherKeys =
        paymentMethod === 'paypal'
          ? {
              paypal_client_id: 'YOUR_PAYPAL_CLIENT_ID',
              paypal_secret_key: 'YOUR_PAYPAL_SECRET_KEY',
            }
          : { stripe_key: 'YOUR_STRIPE_KEY' };
      // Initialize the payment based on the selected payment method
      const initializationResult = await payment.initializePayment(
        apiKey,
        paymentMethod,
        500,
        'Product Name',
        'usd',
        'https://www.google.com',
        otherKeys
      );
      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);

      // setPaymentResult(initializationResult);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      const payment = new Payment();

      // Specify additional keys for the selected payment method
      const otherKeys =
        paymentMethod === 'paypal'
          ? {
              paypal_client_id: 'YOUR_PAYPAL_CLIENT_ID',
              paypal_secret_key: 'YOUR_PAYPAL_SECRET_KEY',
            }
          : { stripe_key: 'YOUR_STRIPE_KEY' };

      const response = await payment.verifyPayment(
        apiKey,
        paymentMethod,
        paymentId,
        otherKeys
      );
      setPaymentResult(response);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

     return (
    <div>
      <h1>Payment Component</h1>
      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {approvalUrl && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{paymentResult}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;

```

### API

initializePayment(apiKey, paymentMethod, price, product, currency, callbackUrl,otherKeys)
Initiates a payment using the specified payment method (either 'stripe' or 'paypal').

-`apiKey`: Your API key for accessing the payment service.
-`paymentMethod`: The payment method to use ('stripe' or 'paypal').
-`price`: The price of the product.
-`product`: The name of the product.
-`currency`: The currency code (e.g., 'usd').
-`callbackUrl`: The URL to which the payment service will redirect after payment.
-`otherKeys`: Dictionary of keys depending on your payment method.

-`verifyPayment(apiKey, paymentMethod, paymentId,otherKeys)`

Verifies a payment using the specified payment method (either 'stripe' or 'paypal').

-`apiKey`: Your API key for accessing the payment service.
-`paymentMethod`: The payment method used ('stripe' or 'paypal').
-`paymentId`: The ID of the payment to verify.
-`otherKeys`: Dictionary of keys depending on your payment method.

### License

This project is licensed under the Apache License 2.0.

``` bash
Replace `'your_api_key'` with your actual API key for both the initialization and verification calls. Make sure to include this README.md file in the root directory of your npm package. This README will provide users with an overview of your package, installation instructions, usage examples, and information about the API and license.

```

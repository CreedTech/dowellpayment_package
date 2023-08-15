# Dowell-Payment Package

## Version 1.0.1

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
  const [result, setResult] = useState('');

  const handlePayment = async () => {
    const apiKey = 'your_api_key'; // Replace with your actual API key

    // Initialize the Payment class
    const payment = new Payment();

    try {
      // Initialize the payment based on the selected payment method
      const initializationResult = await payment.initializePayment(
        apiKey,
        paymentMethod,
        500,
        'Product Name',
        'usd',
        'https://www.google.com'
      );

      setResult(initializationResult);
    } catch (error) {
      setResult('Error while initializing payment');
    }
  };

   return (
    <div>
      <h1>Payment Component</h1>
      <label>
        Payment Method:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <button onClick={handlePayment}>Initiate Payment</button>
      <div>
        <p>Payment Result:</p>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default PaymentComponent;

```

### API

initializePayment(apiKey, paymentMethod, price, product, currency, callbackUrl)
Initiates a payment using the specified payment method (either 'stripe' or 'paypal').

-`apiKey`: Your API key for accessing the payment service.
-`paymentMethod`: The payment method to use ('stripe' or 'paypal').
-`price`: The price of the product.
-`product`: The name of the product.
-`currency`: The currency code (e.g., 'usd').
-`callbackUrl`: The URL to which the payment service will redirect after payment.

-`verifyPayment(apiKey, paymentMethod, paymentId)`

Verifies a payment using the specified payment method (either 'stripe' or 'paypal').

-`apiKey`: Your API key for accessing the payment service.
-`paymentMethod`: The payment method used ('stripe' or 'paypal').
-`paymentId`: The ID of the payment to verify.

### License

This project is licensed under the Apache License 2.0.

``` bash
Replace `'your_api_key'` with your actual API key for both the initialization and verification calls. Make sure to include this README.md file in the root directory of your npm package. This README will provide users with an overview of your package, installation instructions, usage examples, and information about the API and license.

```

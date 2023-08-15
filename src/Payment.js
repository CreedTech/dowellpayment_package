class Payment {
  async initializePayment(
    apiKey,
    paymentMethod,
    price,
    product,
    currency,
    callbackUrl,
    otherKeys = {}
  ) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        price,
        product,
        currency_code: currency,
        callback_url: callbackUrl,
        // Include PayPal-specific keys for PayPal method
        ...(paymentMethod === 'paypal' && {
          paypal_client_id: otherKeys.paypal_client_id,
          paypal_secret_key: otherKeys.paypal_secret_key,
          // Other PayPal-specific keys
        }),
        // Include Stripe-specific keys for Stripe method
        ...(paymentMethod === 'stripe' && {
          stripe_key: otherKeys.stripe_key,
          // Other Stripe-specific keys
        }),
        // ... other keys as needed for the selected payment method
        ...otherKeys,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/${paymentMethod}/initialize/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }

  async verifyPayment(apiKey, paymentMethod, paymentId, otherKeys = {}) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        id: paymentId,
        // Include PayPal-specific keys for PayPal method
        ...(paymentMethod === 'paypal' && {
          paypal_client_id: otherKeys.paypal_client_id,
          paypal_secret_key: otherKeys.paypal_secret_key,
          // Other PayPal-specific keys
        }),
        // Include Stripe-specific keys for Stripe method
        ...(paymentMethod === 'stripe' && {
          stripe_key: otherKeys.stripe_key,
          // Other Stripe-specific keys
        }),
        // ... other keys as needed for the selected payment method
        ...otherKeys,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/verify/payment/${paymentMethod}/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }
}

export default Payment;

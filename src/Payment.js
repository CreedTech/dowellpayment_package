class Payment {
  async initializePayment(apiKey, paymentMethod, price, product, currency, callbackUrl) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price,
        product,
        currency_code: currency,
        callback_url: callbackUrl,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/${paymentMethod}/initialize/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }

  async verifyPayment(apiKey, paymentMethod, paymentId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: paymentId,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/verify/payment/${paymentMethod}/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }
}

export default Payment;

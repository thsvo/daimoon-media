export async function GetOrder(id) {
  const result = await fetch('/api/orders/getOrderById/' + id, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((res) => {
      const orderObject = {
        ...res.body,
        order_id: id,
      };

      return orderObject;
    });

  return result;
}

export async function PostOrder(body) {
  const id = await fetch('/api/orders/postOrder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact_name: body.customerDetails.fullname,
      contact_email: body.customerDetails.email,
      body: body,
      status: 'open',
    }),
  })
    .then((response) => response.json())
    .then(async (id) => {
      return id;
    });

  return id;
}

export async function UpdateOrder(id, body) {
  await fetch('/api/orders/updateOrder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact_name: body.customerDetails.fullname,
      contact_email: body.customerDetails.email,
      body: body,
      id: id,
    }),
  });
}

export async function GetAllOrdersByEmail(email, page) {
  const orders = await fetch(
    process.env.NEXTAUTH_URL + '/api/orders/getOrdersByEmail',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        page: page,
      }),
    }
  )
    .then((response) => response.json())
    .then(async (orders) => {
      return orders;
    });

  return orders;
}

export async function GetPaidCampaignsByEmail(email, page, role) {
  const orders = await fetch(
    process.env.NEXTAUTH_URL + '/api/orders/getCampaignsByEmail',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pageNumber: page,
        status: 'paid',
        role: role ? role : 'client',
      }),
    }
  )
    .then((response) => response.json())
    .then(async (orders) => {
      return orders;
    });

  return orders;
}

export async function GetPaidOrdersByEmail(email, page, role) {
  const orders = await fetch(
    process.env.NEXTAUTH_URL + '/api/orders/getOrdersByEmail',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        page: page,
        status: 'paid',
        role: role ? role : 'client',
      }),
    }
  )
    .then((response) => response.json())
    .then(async (orders) => {
      return orders;
    });

  return orders;
}

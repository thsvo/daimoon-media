export async function getAllCoupons(page) {
  const coupons = await fetch(
    process.env.NEXTAUTH_URL + '/api/coupons/getAllCoupons?page=' + page,

    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorisation: process.env.NEXTAUTH_SECRET,
      },
    }
  )
    .then((response) => response.json())
    .then(async (coupons) => {
      return coupons;
    });

  return coupons;
}

export async function saveCoupon(values) {
  const status = await fetch('/api/coupons/saveCoupon', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorisation: 'agHfINQsIQs1xQ105dLDoy16dxqW+pVRHl+jnV+thCE=',
    },
    body: JSON.stringify({
      values: values,
    }),
  })
    .then((response) => response.json())
    .then(async (coupons) => {
      return 'success';
    });

  return status;
}

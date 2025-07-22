const addToList = (id, list) => {
  const result = fetch('/api/klaviyo/addToList', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      list: list,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      return res[0];
    });

  return result;
};

const updateProfile = (query, profileId) => {
  const result = fetch('/api/klaviyo/updateProfile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      profileId: profileId,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      return res[0];
    });

  return result;
};

const getProfile = (profileId) => {
  const result = fetch(
    process.env.NEXT_PUBLIC_BASE_URL + 'api/klaviyo/getProfile',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profileId: profileId,
      }),
    }
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    });

  return result;
};

const createAndUpdateProfile = (attributes) => {
  const result = fetch(
    process.env.NEXT_PUBLIC_BASE_URL + 'api/klaviyo/createAndUpdateProfile',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attributes: attributes,
      }),
    }
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    });

  return result;
};

export { addToList, updateProfile, getProfile, createAndUpdateProfile };

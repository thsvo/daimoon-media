import axios from 'axios';

const handler = (req, res) => {
  const { attributes } = req.body;

  // attributes: {
  //   email: 'sarah.mason@klaviyo-demo.com',
  //   phone_number: '+15005550006',
  //   anonymous_id: '01GDDKASAP8TKDDA2GRZDSVP4H',
  //   first_name: 'Sarah',
  //   last_name: 'Mason',
  //   organization: 'Example Corporation',
  //   title: 'Regional Manager',
  //   image: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg',
  //   location: {
  //     address1: '89 E 42nd St',
  //     address2: '1st floor',
  //     city: 'New York',
  //     country: 'United States',
  //     region: 'NY',
  //     zip: '10017',
  //     timezone: 'America/New_York',
  //     ip: '127.0.0.1'
  //   },
  //   properties: {newKey: 'New Value'}
  // },

  try {
    axios({
      method: 'post',
      url: 'https://a.klaviyo.com/api/profile-import/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Klaviyo-API-Key ' + process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY,
        revision: '2024-05-15',
      },
      data: JSON.stringify({
        data: {
          type: 'profile',
          attributes: attributes,
        },
      }),
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((e) => {
        res.status(200).json(e);
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;

import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '/pages/api/auth/[...nextauth]';

const handler = async (req, res) => {
  const id = req.body.id;
  const session = await getServerSession(req, res, authOptions);
  const role = session.user.userRole ? session.user.userRole : 'client';

  let service;

  switch (true) {
    case id.includes('SC'):
      service = 'soundcloud';
      break;
    case id.includes('YT'):
      service = 'youtube';
      break;
    case id.includes('SP'):
      service = 'spotify';
      break;
    default:
      service = 'spotify';
      break;
  }

  try {
    var config = {
      method: 'get',
      url:
        `https://oms.daimoon.media/api/v1/${service}/order/dashboard/` +
        id +
        '?email=' +
        session.user.email +
        '&role=' +
        role,
      headers: {
        'Accept-Encoding': 'null',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEYWltb29uTWVkaWEiLCJuYW1lIjoiVG9tIEJvc2NoIiwiaWF0IjoxNTE2MjM5MDIyfQ.EJBsjXIhyKyM_L6B635nbfg_Q69Lf24Fb1hpHhLCP20',
      },
    };

    const result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        res.status(500).json(error);
      });

    res.status(200).json({ result: result, service: service });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default handler;

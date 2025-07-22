import axios from 'axios';

const sendMail = (email, address, subject, from) => {
  const params = new URLSearchParams();
  params.append('from', from ? from : 'support@daimoon.media');
  params.append('to', address);

  params.append('subject', subject);
  params.append('html', email);

  axios({
    method: 'post',
    url: 'https://api.eu.mailgun.net/v3/email.daimoon.media/messages',
    data: params,
    auth: {
      username: process.env.NEXT_PUBLIC_EMAIL_API,
      password: process.env.NEXT_PUBLIC_EMAIL_KEY,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error;
    }
  );
};

export { sendMail };

import axios from 'axios';

const handler = async (req, res) => {
  const { updatedValues } = req.body;

  return new Promise((resolve) => {
    try {
      const orderData = {
        offer: updatedValues.offer,
        first_name: updatedValues.first_name,
        last_name: updatedValues.last_name,
        email: updatedValues.email,
        password: updatedValues.password,
        company: updatedValues.company,
        paypal_email: updatedValues.paypal_email,
        status: 'pending',
        send_welcome: 'TRUE',
      };

      const json_data = JSON.stringify(orderData);

      axios({
        method: 'post',
        url: 'https://api.refersion.com/v2/affiliate/new',
        data: json_data,
        headers: {
          'Content-Type': 'application/json',
          'Refersion-Public-Key': process.env.NEXT_PUBLIC_REF_PUBLIC_KEY,
          'Refersion-Secret-Key': process.env.NEXT_PUBLIC_REF_SECRET_KEY,
        },
      }).then(
        (response) => {
          res.status(200).json(response.data);
        },
        (error) => {
          res
            .status(500)
            .json({ status: 500, message: error.response.data.error });
        }
      );
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
};

export default handler;

import axios from 'axios';

const handler = async (req, res) => {
  const vatID = req.body.id;

  try {
    if (!vatID) {
      return res.status(400).json({ message: '`VAT` required' });
    }

    const url =
      'http://www.apilayer.net/api/validate?access_key=e53d77b0f45e477883b2c93a31b6e805&vat_number=' +
      vatID;

    await axios
      .get(url)

      .then(({ data }) => {
        res.status(200).json({
          valid: data.valid,
          company_name: data.company_name,
          country_code: data.country_code,
        });
      })
      .catch(({ e }) => {
        //res.status(200).json({ valid: true, company_name: 'esting' });
        res.status(200).json({ valid: false });
      });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default handler;

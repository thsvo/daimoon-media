import {
  getAuthToken,
  getSpreadSheet,
  appendRow,
} from '/lib/GoogleSheets/api.js';

const formatDate = (date) => {
  let d;
  if (!date) {
    d = new Date();
  } else {
    d = new Date(date);
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const handler = async (req, res) => {
  const { rating, comment, email, name, date, id, oms_id, service } = req.body;

  const spreadsheetId = '1JeQryuLB-SmSLKQeVt5O03ZemfKWc6m0EDYwAvvOCL8';
  const sheetName = service;

  const orderDate = formatDate(date);
  const ratingDate = formatDate();

  const newRow = [
    id,
    rating,
    comment,
    email,
    name,
    orderDate,
    oms_id,
    ratingDate,
  ];

  try {
    const auth = await getAuthToken();

    await appendRow({
      spreadsheetId,
      auth,
      sheetName,
      newRow,
    });

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;

async function handler(req, res) {
  const jsonData = await getReviews();
  res.status(200).json(jsonData);
}

export default handler;

const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

const PORT = process.env.PORT || 8080;

app.get(`/`, (req, res) => {
  return res.send(`server smoke test`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
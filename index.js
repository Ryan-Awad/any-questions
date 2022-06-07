const express = require('express');
const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.post('/upload-question', (req, res) => {
  const {title, body} = req.body;

  res.send('Question uploaded successfully.');
});

app.listen(8080, () => {
  console.log('Backend started.');
});
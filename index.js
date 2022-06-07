const express = require('express');
const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.post('/upload-question', (req, res) => {
  const {title, body, imageURL} = req.body;
  

  res.send('Question uploaded successfully.\n');
});

app.listen(8080, () => {
  console.log('Backend started.');
});
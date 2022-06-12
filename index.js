const express = require('express');
const {writeData, readData} = require('./src/firebaseOperations');
const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// ** ADD AUTHENTICATION **
app.post('/upload-question', (req, res) => {
  const {title, body, imageURL} = req.body;
  const data = {
    title: title,
    body: body,
    imgURL: imageURL
  }

  writeData('questions', data, () => {
    res.send('Question successfully uploaded!\n');
  });
});

app.post('/get-questions', (req, res) => {
  readData('questions', data => {
    res.send(data);
  });
});

app.listen(8080, () => {
  console.log('Backend started.');
});
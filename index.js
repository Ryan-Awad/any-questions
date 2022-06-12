require('dotenv').config();
const express = require('express');
var {expressjwt: jwt} = require("express-jwt");
const {writeData, readData} = require('./src/firebaseOperations');
const app = express();


app.use(express.json());

app.use(jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
  }).unless({path: ['/ping']})
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token.\n');
  } else {
    next(err);
  }
});

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.post('/upload-question', (req, res) => { // IF INVALID BODY IS SENT, THE BACKEND THROWS ERROR AND CRASHES (FIX) 
  const {title, body, imageURL} = req.body;
  const data = {
    title: title,
    body: body,
    imgURL: imageURL,
    answered: false
  };

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
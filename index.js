require('dotenv').config();
const express = require('express');
const {expressjwt} = require("express-jwt");
const app = express();

app.use(express.json());

app.use(expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
  }).unless({path: ['/ping', '/login', '/register']})
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token.\n');
  } else {
    next(err);
  }
});

// ROUTES
app.use('/', require('./src/routes/ping'));
app.use('/', require('./src/routes/register'));
app.use('/', require('./src/routes/login'));
app.use('/', require('./src/routes/uploadQuestion'));
app.use('/', require('./src/routes/getQuestions'));

app.listen(8080, () => {
  console.log('Backend started.');
});
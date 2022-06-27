require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {expressjwt} = require("express-jwt");
const app = express();

app.use(express.json());
app.use(cors());

app.use(expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
  }).unless({path: ['/ping', '/login', '/register']})
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Invalid token.'});
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
app.use('/', require('./src/routes/getUserInfo'));
app.use('/', require('./src/routes/answerQuestion'));
app.use('/', require('./src/routes/deleteQuestion'));
app.use('/', require('./src/routes/editFlairs'));

app.listen(process.env.PORT, () => {
  console.log('Backend started.');
});

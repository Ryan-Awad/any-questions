require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {validateJWT} = require('./src/middleware/auth');
const app = express();

app.use(express.json());
app.use(cors());
app.use(validateJWT);

// ROUTES
app.use('/', require('./src/routes/ping'));
app.use('/', require('./src/routes/register'));
app.use('/', require('./src/routes/login'));
app.use('/', require('./src/routes/uploadQuestion'));
app.use('/', require('./src/routes/getQuestions'));
app.use('/', require('./src/routes/answerQuestion'));
app.use('/', require('./src/routes/deleteQuestion'));
app.use('/', require('./src/routes/editFlairs'));

app.listen(process.env.PORT, () => {
  console.log('Backend started.');
});

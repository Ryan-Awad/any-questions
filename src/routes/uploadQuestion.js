const express = require('express');
const {writeData} = require('../firebase');
const router = express.Router();

router.post('/upload-question', (req, res) => {
  const {title, body, imageURL} = req.body;
  const data = {
    title: title,
    body: body,
    imgURL: imageURL,
    answered: false
  };

  writeData('questions', data, questionID => {
    res.send(`Question successfully uploaded under the ID ${questionID}!\n`);
  });
})

module.exports = router;
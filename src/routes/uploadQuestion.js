const express = require('express');
const jwt = require('jsonwebtoken');
const {writeData} = require('../firebase');
const router = express.Router();

router.post('/upload-question', (req, res) => {
  const {title, body, imageURL} = req.body;
  const userID = req.auth.id;

  const data = {
    userID: userID,
    title: title,
    body: body,
    imgURL: imageURL,
    answered: false
  };

  writeData('questions', data, questionID => {
    res.status(200).json({success: `Question successfully uploaded under the ID ${questionID}!`});
  });
})

module.exports = router;
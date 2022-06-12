const express = require('express');
const {readData} = require('../firebase');
const router = express.Router();

router.get('/get-questions', (req, res) => {
  readData('questions', data => {
    res.send(data);
  });
})

module.exports = router;
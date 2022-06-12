const express = require('express');
const jwt = require('jsonwebtoken');
const {readData} = require('../firebase');
const router = express.Router();

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  // CONTINUE . . . 
})

module.exports = router;
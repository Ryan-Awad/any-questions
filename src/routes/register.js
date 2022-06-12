const express = require('express');
const jwt = require('jsonwebtoken');
const {writeData} = require('../firebase');
const router = express.Router();

router.post('/register', (req, res) => {
  const {username, password} = req.body; // ENCRYPT THE PASSWORD
  const data = {
    username: username,
    password: password
  };

  writeData('users', data, userID => {
    const token = jwt.sign({username: username, id: userID}, JWTSECRET, {algorithm: 'HS256'});
    res.send(token);
  });
});

module.exports = router;
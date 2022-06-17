const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {writeData} = require('../firebase');
const router = express.Router();

router.post('/register', (req, res) => {
  const {username, password} = req.body; // ENCRYPT THE PASSWORD

  const saltRounds = 10; // 2^10 iterations
  bcrypt.hash(password, saltRounds, (err, passwordHash) => {
    const data = {
      username: username,
      password: passwordHash
    };

    writeData('users', data, userID => {
      const token = jwt.sign({username: username, id: userID}, process.env.JWT_SECRET, {algorithm: 'HS256'});
      res.status(200).send(token);
    });
  });
});

module.exports = router;
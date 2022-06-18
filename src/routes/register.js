const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {readData, writeData} = require('../firebase');
const router = express.Router();

router.post('/register', (req, res) => {
  const {username, password} = req.body;

  readData('users', data => {
    let userExists = false;
    for (let i = 0; i < data.length; i++) {
      if (username === data[i].username) {
        userExists = true;
        break;
      }
    }

    if (!userExists) {
      const saltRounds = 10; // 2^10 iterations
      bcrypt.hash(password, saltRounds, (err, passwordHash) => {
        const data = {
          username: username,
          password: passwordHash
        };

        writeData('users', data, userID => {
          const token = jwt.sign({username: username, id: userID}, process.env.JWT_SECRET, {algorithm: 'HS256'});
          res.status(200).json({success: token});
        });
      });
    } else {
      res.status(400).json({error: 'Username is already in use.'});
    }
  });
});

module.exports = router;
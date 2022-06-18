const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {readData} = require('../firebase');
const router = express.Router();

function checkCredential(users, index, username, password, callback) {
  let storedUser = users[index].username;
  let storedPassHash = users[index].password;
  let storedID = users[index].id;

  if (username === storedUser) {
    bcrypt.compare(password, storedPassHash, (err, valid) => { // use 'err' to check for potential errors
      if (valid) {
        const token = jwt.sign({username: storedUser, id: storedID}, process.env.JWT_SECRET, {algorithm: 'HS256'});
        callback(token);
      } else {
        if (index === users.length-1) { // no more users in the db to check
          callback(null);
        } else { // recurse to the next user
          checkCredential(users, index+1, username, password, callback);
        }
      }
    });
  }
  else if ((index+1) < users.length) {
    checkCredential(users, index+1, username, password, callback); // recurse to the next user
  } else { // no more users in the db to check
    callback(null);
  }
}

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  readData('users', data => {
    checkCredential(data, 0, username, password, (token) => {
      if (token) {
        res.status(200).json({success: token});
      } else {
        res.status(401).send({error: 'Invalid credentials.'});
      }
    });
  });
})

module.exports = router;
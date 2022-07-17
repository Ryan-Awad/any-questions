const express = require('express');
const jwt = require('jsonwebtoken');
const {createUserAccount} = require('../firebase');
const router = express.Router();

router.post('/register', (req, res) => {
  const {username, email, password} = req.body;
  const firebaseErrors = {
    'auth/email-already-in-use': 'This e-mail is already in use.',
    'auth/weak-password': 'Your password must be at least 6 characters long.'
  }

  createUserAccount(username, email, password, auth => {
    if (auth.name === 'FirebaseError') { // if there was an error when creating the user
      res.status(400).json({error: firebaseErrors[auth.code] ? firebaseErrors[auth.code] : 'An error has occured.'})
    } else { // if there is no errors, 'auth' is a JWT 
      res.status(200).json({success: auth});
    }
  });
});

module.exports = router;
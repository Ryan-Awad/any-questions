const express = require('express');
const jwt = require('jsonwebtoken');
const {login} = require('../firebase');
const router = express.Router();

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  const firebaseErrors = {
    'auth/wrong-password': 'Invalid email or password.',
    'auth/user-not-found': 'Invalid email or password.',
    'auth/invalid-email': 'Please enter a valid E-Mail.',
    'auth/internal-error': 'Please make sure to fill out all fields'
  }

  login(email, password, auth => {
    if (auth.name === 'FirebaseError') { // if there was an error when creating the user
      res.status(400).json({error: firebaseErrors[auth.code] ? firebaseErrors[auth.code] : 'An error has occured.'});
    } else { // if there is no errors, 'auth' is a JWT 
      res.status(200).json({success: auth});
    }
  });
})

module.exports = router;
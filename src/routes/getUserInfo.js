const express = require('express');
const {readData} = require('../firebase');
const router = express.Router();

router.get('/get-user-info', (req, res) => {
  const userID = req.auth.id;
  readData('users', data => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === userID) {
        delete data[i].password; // remove the user's password from the response
        res.status(200).json({success: data[i]});
        break;
      }
    }
  });
});

module.exports = router;
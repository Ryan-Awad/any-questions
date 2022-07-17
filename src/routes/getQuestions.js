const express = require('express');
const {readData} = require('../firebase');
const router = express.Router();

router.get('/get-questions', (req, res) => {
  const userID = req.auth.user_id;
  readData('questions', data => {
    const usersData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].userID === userID) {
        usersData.push(data[i]);
      }
    }

    res.status(200).json({success: usersData});
  });
})

module.exports = router;
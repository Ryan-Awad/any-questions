const express = require('express');
const {readData} = require('../firebase');
const router = express.Router();

router.get('/get-questions', (req, res) => {
  try {
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
  }
  catch (error) {
    res.status(500).json({error: 'Internal server error.'});
  }
})

module.exports = router;
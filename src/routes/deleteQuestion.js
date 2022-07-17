const express = require('express');
const {deleteData} = require('../firebase');
const router = express.Router();

router.post('/delete-question', (req, res) => {
  const userID = req.auth.user_id
  const {questionID} = req.body;

  deleteData('questions', questionID, 'userID', userID, permGranted => {
    if (permGranted) {
      res.status(200).json({success: 'Question successfully deleted.'});
    } else {
      res.status(401).json({error: 'Permission denied.'});
    }
  });
});

module.exports = router;
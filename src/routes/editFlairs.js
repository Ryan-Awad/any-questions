const express = require('express');
const {editData} = require('../firebase');
const router = express.Router();

router.post('/edit-flairs', (req, res) => {
  const userID = req.auth.user_id;
  const {questionID} = req.body;
  var {newFlairs} = req.body;
  newFlairs = newFlairs.map(f => f.toLowerCase())

  if (newFlairs.length === new Set(newFlairs).size) {
    editData('questions', questionID, 'userID', userID, {flairs: newFlairs}, permGranted => {
      if (permGranted) {
        res.status(200).json({success: 'Flairs successfully edited.'});
      } else {
        res.status(401).json({error: 'Permission denied.'});
      }
    });
  } else {
    res.status(400).json({error: 'You can only have each flair once.'});
  }
});

module.exports = router; 
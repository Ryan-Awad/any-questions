const express = require('express');
const {editData} = require('../firebase');
const router = express.Router();

router.post('/edit-flairs', (req, res) => {
  const userID = req.auth.user_id;
  const {questionID, newFlairs} = req.body;

  editData('questions', questionID, 'userID', userID, {flairs: newFlairs}, permGranted => {
    if (permGranted) {
      res.status(200).json({success: 'Flairs successfully editted.'});
    } else {
      res.status(401).json({error: 'Permission denied.'});
    }
  });
});

module.exports = router;
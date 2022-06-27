const express = require('express');
const {editData} = require('../firebase');
const router = express.Router();

router.post('/answer-question', (req, res) => {
  const userID = req.auth.id;
  const {questionID, answered} = req.body; // 'answered' could be true or false (you could mark something answered as unanswered again)
  var {answer} = req.body;
  if (!answered) { 
    answer = null;
  } else {
    if (!answer) {
      res.status(400).json({error: 'You must include an answer when marking a question as answered.'});
      return;
    }
  }

  editData('questions', questionID, 'userID', userID, {answered: answered, answer: answer}, permGranted => {
    if (permGranted) {
      res.status(200).json({success: 'This question is now marked as answered.'});
    } else {
      res.status(401).json({error: 'Permission denied.'});
    }
  });
});

module.exports = router;
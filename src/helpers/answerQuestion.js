const answerQuestion = (jwt, id, answered, answer=null) => {
  var confirmed = true;
  if (!answered) {
    confirmed = window.confirm('Are you sure you want to undo this question? This will erase the answer you currently have written.');
  }

  if (confirmed) {
    fetch('https://any-questions-backend.herokuapp.com/answer-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        questionID: id,
        answered: answered,
        answer: answered ? answer : null
      })
    })
    .then(res => {
      res.json().then(data => {
        if (res.status !== 200) { 
          alert(data.error);
        }
      });
    });
  }
}

export default answerQuestion;
const deleteQuestion = (jwt, id) => {
  const confirmed = window.confirm('Are you sure you want to delete this question? Your question will be erased forever.');

  if (confirmed) {
    fetch('https://any-questions-backend.herokuapp.com/delete-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        questionID: id
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

export default deleteQuestion;
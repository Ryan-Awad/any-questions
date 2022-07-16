// allFlairs = allFlairs.splice(allFlairs.indexOf(flair), 1); // remove the selected flair from all the flairs

const editFlair = (jwt, questionID, flairs) => {
  fetch('https://any-questions-backend.herokuapp.com/edit-flairs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      questionID: questionID,
      newFlairs: flairs
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

export default editFlair;
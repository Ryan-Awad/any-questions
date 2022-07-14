// allFlairs = allFlairs.splice(allFlairs.indexOf(flair), 1); // remove the selected flair from all the flairs

const editFlair = (jwt, id, flairs) => {
  fetch('https://any-questions-backend.herokuapp.com/edit-flairs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      questionID: id,
      newFlairs: flairs
    })
  })
  .then(res => {
    res.json().then(data => {
      if (res.status === 200) { // add the jwt to the user's cookies
        window.location.reload(); // refreshes the page
      } else {
        alert(data.error);
      }
    });
  });
}

export default editFlair;
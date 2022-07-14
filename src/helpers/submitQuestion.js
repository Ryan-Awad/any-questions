const submitQuestion = (jwt, title, body, imageURL) => {
  fetch('https://any-questions-backend.herokuapp.com/upload-question', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      imageURL: imageURL
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(res => {
    // change the display text to be on an element instead of just an alert
    if (res.status === 401) {
      alert('It appears you are not signed in. Sign into your account to upload questions.');
    } else {
      res.json().then(data => {
        alert(data.success);
        window.location.href = '/'; // redirect user to home page
      });
    }
  })
}

export default submitQuestion;
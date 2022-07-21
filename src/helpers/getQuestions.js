const getQuestions = (jwt, callback) => {
  fetch('https://any-questions-backend.herokuapp.com/get-questions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(res => {
    if (res.status === 401) {
      alert('An error occured.');
      console.log(res.text);
    } else {
      res.json().then(data => {
        callback(data['success']);
      });
    }
  })
}

export default getQuestions;
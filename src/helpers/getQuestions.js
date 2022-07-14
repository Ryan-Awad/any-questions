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
      alert('It appears that you are not logged in. To view your questions, please log into your account.');
      window.location.href = '/login';
    } else {
      res.json().then(data => {
        callback(data['success']);
      });
    }
  })
}

export default getQuestions;
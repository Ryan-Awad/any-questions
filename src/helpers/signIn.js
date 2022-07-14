const signIn = (username, password) => {
  fetch('https://any-questions-backend.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(res => {
    if (res.status === 401) {
      alert('Invalid credentials.');
    } 
    else if (res.status === 200) {
      res.json().then(data => {
        const jwt = data.success;
        document.cookie = `token=${jwt}`; // add the jwt to the user's cookies
        window.location.href = '/'; // redirect user to home page
      })
    }
  });
}

export default signIn;
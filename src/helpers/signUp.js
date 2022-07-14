const signUp = (username, password) => {
  fetch('https://any-questions-backend.herokuapp.com/register', {
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
    res.json().then(data => {
      if (res.status === 200) {
        const jwt = data.success;
        document.cookie = `token=${jwt}`; // add the jwt to the user's cookies
        window.location.href = '/'; // redirect user to home page
      } else {
        alert(data.error);
      }
    });
  });
}

export default signUp;
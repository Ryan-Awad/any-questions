import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  handleSubmit = (event) => {
    const username = event.target.username.value;
    const password = event.target.password.value;
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
    .then(res => res.json()) // *** edit the backend so that it returns JSON ***
    .then(data => {
      //console.log(data);
      alert(data);
    })
  }

  render() { 
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control as="input" name="username"/><br></br>

          <Form.Label>Password</Form.Label>
          <Form.Control as="input" type="password" name="password"/><br></br>

          <Button type="submit">Sing In →</Button>
        </Form.Group>
      </Form>
    );
  }
}
 
export default Login;
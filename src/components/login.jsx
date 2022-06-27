import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  state = {
    typedUsername: null,
    typedPassword: null
  }

  handleUserChange = (e) => this.setState({typedUsername: e.target.value});
  handlePassChange = (e) => this.setState({typedPassword: e.target.value});

  signIn = () => {
    const {typedUsername, typedPassword} = this.state;
    fetch('https://any-questions-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: typedUsername,
        password: typedPassword
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

  render() { 
    return (
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control as="input" name="username" onChange={this.handleUserChange}/><br></br>

          <Form.Label>Password</Form.Label>
          <Form.Control as="input" type="password" name="password" onChange={this.handlePassChange}/><br></br>

          <Button type="button" onClick={this.signIn}>Sign In →</Button>
        </Form.Group>
      </Form>
    );
  }
}
 
export default Login;
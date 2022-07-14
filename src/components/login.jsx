import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import signIn from '../helpers/signIn';

class Login extends Component {
  state = {
    typedUsername: null,
    typedPassword: null
  }

  handleUserChange = (e) => this.setState({typedUsername: e.target.value});
  handlePassChange = (e) => this.setState({typedPassword: e.target.value});

  render() { 
    return (
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control as="input" name="username" onChange={this.handleUserChange}/><br></br>

          <Form.Label>Password</Form.Label>
          <Form.Control as="input" type="password" name="password" onChange={this.handlePassChange}/><br></br>

          <Button type="button" onClick={() => {
            signIn(this.state.typedUsername, this.state.typedPassword)}
          }>Sign In →</Button>
        </Form.Group>
      </Form>
    );
  }
}
 
export default Login;
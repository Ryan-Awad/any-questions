import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import signIn from '../helpers/signIn';

class Login extends Component {
  state = {
    typedEmail: null,
    typedPassword: null
  }

  handleEmailChange = (e) => this.setState({typedEmail: e.target.value});
  handlePassChange = (e) => this.setState({typedPassword: e.target.value});

  render() { 
    return (
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control as="input" type="email" name="email" onChange={this.handleEmailChange} placeholder="johndoe@example.com"/><br></br>

          <Form.Label>Password</Form.Label>
          <Form.Control as="input" type="password" name="password" onChange={this.handlePassChange}/><br></br>

          <Button type="button" onClick={() => {
            signIn(this.state.typedEmail, this.state.typedPassword)}
          }>Sign In →</Button>
        </Form.Group>
      </Form>
    );
  }
}
 
export default Login;
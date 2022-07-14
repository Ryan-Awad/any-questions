import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import signUp from '../helpers/signUp';

class Register extends Component {
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
            signUp(this.state.typedUsername, this.state.typedPassword)}
          }>Sign Up!</Button>
        </Form.Group>
      </Form>
    );
  }
}
 
export default Register;
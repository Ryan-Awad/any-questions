import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import signUp from '../helpers/signUp';
import '../styles/index.css';

class Register extends Component {
  state = {
    typedUsername: null,
    typedEmail: null,
    typedPassword: null
  }

  handleUserChange = (e) => this.setState({typedUsername: e.target.value});
  handleEmailChange = (e) => this.setState({typedEmail: e.target.value});
  handlePassChange = (e) => this.setState({typedPassword: e.target.value});

  render() { 
    return (
      <Form className='form'>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control as="input" name="username" onChange={this.handleUserChange} placeholder="John Doe"/><br></br>

          <Form.Label>E-Mail</Form.Label>
          <Form.Control as="input" type="email" name="email" onChange={this.handleEmailChange} placeholder="johndoe@example.com"/><br></br>

          <Form.Label>Password</Form.Label>
          <Form.Control as="input" type="password" name="password" onChange={this.handlePassChange}/><br></br>

          <Button type="button" onClick={() => {
            signUp(this.state.typedUsername, this.state.typedEmail, this.state.typedPassword)}
          }>Sign Up!</Button>
        </Form.Group>
        <small style={{float: 'right'}}>Already have an account? <a href='/login'>Sign in.</a></small>
      </Form>
    );
  }
}
 
export default Register;
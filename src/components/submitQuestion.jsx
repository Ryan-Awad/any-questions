import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

// MAKE SURE TO DEAL WITH XSS VULNS (i DONT recommend blocking > and < because it would be used for math related questions)

class SubmitQuestion extends Component {
  state = {
    typedTitle: null,
    typedBody: null,
    typedImageURL: null
  }

  getCookie = (name) => { // https://stackoverflow.com/a/21125098/10273599
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  handleTitleChange = (e) => this.setState({typedTitle: e.target.value});
  handleBodyChange = (e) => this.setState({typedBody: e.target.value});
  handleImgChange = (e) => this.setState({typedImageURL: e.target.value});

  submitQuestion = () => {
    const {typedTitle, typedBody, typedImageURL} = this.state;
    const jwt = this.getCookie('token');
    fetch('https://any-questions-backend.herokuapp.com/upload-question', {
      method: 'POST',
      body: JSON.stringify({
        title: typedTitle,
        body: typedBody,
        imageURL: typedImageURL
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then(res => {
      // change the display text to be on an element instead of just an alert
      if (res.status === 401) {
        alert('It appears you are not signed in. Sign into your account to upload questions.');
      } else {
        res.json().then(data => {
          alert(data.success);
          window.location.href = '/'; // redirect user to home page
        });
      }
    })
  }

  render() { 
    return (
      <React.Fragment>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control as="input" name="title" onChange={this.handleTitleChange}/><br></br>

            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={7} name="body" onChange={this.handleBodyChange}/><br></br>

            <Form.Label>Image URL (optional)</Form.Label>
            <Form.Control as="input" name="imageURL" onChange={this.handleImgChange}/><br></br>
            <Button onClick={this.submitQuestion}>Submit question</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
 
export default SubmitQuestion;
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import submitQuestion from '../helpers/submitQuestion';
import getCookie from '../helpers/getCookie';

// MAKE SURE TO DEAL WITH XSS VULNS (i DONT recommend blocking > and < because it would be used for math related questions)

class SubmitQuestion extends Component {
  state = {
    typedTitle: null,
    typedBody: null,
    typedImageURL: null
  }

  handleTitleChange = (e) => this.setState({typedTitle: e.target.value});
  handleBodyChange = (e) => this.setState({typedBody: e.target.value});
  handleImgChange = (e) => this.setState({typedImageURL: e.target.value});

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
            <Button onClick={() => { 
              submitQuestion(getCookie('token'), this.state.typedTitle, this.state.typedBody, this.state.typedImageURL) 
            }}>Submit question</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
 
export default SubmitQuestion;
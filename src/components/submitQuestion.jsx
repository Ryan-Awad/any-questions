import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class SubmitQuestion extends Component {
  handleSubmit = () => {
    // SUBMIT QUESTION
  }

  render() { 
    return (
      <React.Fragment>
        <Form>
          <Form.Group>
            <Form.Label>What's your question?</Form.Label>
            <Form.Control as="textarea" rows={7}/><br></br>
            <Button onClick={() => this.handleSubmit()}>Submit question</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
 
export default SubmitQuestion;
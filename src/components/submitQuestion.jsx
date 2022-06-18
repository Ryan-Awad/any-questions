import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class SubmitQuestion extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const imageURL = event.target.imageURL.value;

    console.log(title);
    console.log(body);
    console.log(imageURL);

    /*fetch(process.env.BACKEND_URL + 'upload-question', {
      method: 'POST',
      body: {

      }
    }).then(data => {
      console.log(data);
    })*/
  }

  render() { 
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control as="input" name="title"/><br></br>

            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={7} name="body"/><br></br>

            <Form.Label>Image URL</Form.Label>
            <Form.Control as="input" name="imageURL"/><br></br>
            <Button type="submit">Submit question</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
 
export default SubmitQuestion;
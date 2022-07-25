import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import {BlockMath} from 'react-katex';
import submitQuestion from '../helpers/submitQuestion';
import Question from './question';
import getJwt from '../helpers/getJwt';
import '../styles/index.css';

// MAKE SURE TO DEAL WITH XSS VULNS (i DONT recommend blocking > and < because it would be used for math related questions)

class SubmitQuestion extends Component {
  state = {
    typedTitle: null,
    typedBody: null,
    typedImageURL: null,
    preview: null
  }

  handleTitleChange = (e) => this.setState({typedTitle: e.target.value});
  handleBodyChange = (e) => this.setState({typedBody: e.target.value});
  handleImgChange = (e) => this.setState({typedImageURL: e.target.value});

  generatePreview = () => {
    const {typedTitle, typedBody, typedImageURL} = this.state;
    const previewData = {
      id: 0,
      title: typedTitle,
      answered: false,
      answer: null,
      imgURL: typedImageURL,
      flairs: ['flair-1', 'flair-2', 'flair-3'],
      body: typedBody ? typedBody : ''
    }
    const questionPreview = (
      <div className='preview'>
        <h5 style={{textAlign: 'center'}}>Preview</h5>
        <Question 
          data={previewData}
          handleAnswer={() => null}
          handleDelete={() => null}
          handleEditFlair={() => null}
        />
      </div>
    )

    this.setState({preview: questionPreview});
  }

  render() { 
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className={'question-form'} onKeyUp={this.generatePreview}>
          <h2>Ask A Question</h2>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control as="input" name="title" onChange={this.handleTitleChange}/><br></br>

            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={7} name="body" onChange={this.handleBodyChange}/><br></br>

            <Form.Label>Image URL (optional)</Form.Label>
            <Form.Control as="input" name="imageURL" onChange={this.handleImgChange}/><br></br>
            <Button onClick={() => getJwt(jwt => submitQuestion(jwt, this.state.typedTitle, this.state.typedBody, this.state.typedImageURL))}>Submit question</Button>
          </Form.Group>

          <br></br><pre>All LaTeX Math expressions start with @</pre>
          <pre>For in-line expressions, end with &</pre>
          <pre>For block expressions, end with #</pre>
          <pre>{"Example: @\\frac{d}{dx} \\int_{a}^{x} f(t)dt = f(x)#"}</pre>
          <BlockMath>{"\\frac{d}{dx} \\int_{a}^{x} f(t)dt = f(x)"}</BlockMath>
        </Form>

        {this.state.preview}
      </React.Fragment>
    );
  }
}
 
export default SubmitQuestion;
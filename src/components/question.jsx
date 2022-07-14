import React, {Component} from 'react';
import {InlineMath, BlockMath} from 'react-katex';
import {Card, Button, Badge, Form} from 'react-bootstrap';
import getCookie from '../helpers/getCookie';
import '../styles/index.css';

class Question extends Component {
  state = {
    typedAnswer: null
  }

  processMath = (question) => { // algorithm for rendering LaTeX math
    // math expressions start with '@'
    // INLINE math expressions END with '&'
    // BLOCK math expressions END with '#'
    let sections = [];
    let currentStr = '';
    let captureMath = false;
    for (let i = 0; i < question.length; i++) {
      if (captureMath) {
        if (question[i] === '&' || question[i] === '#') { 
          sections.push(question[i] === '&' ? <InlineMath>{currentStr}</InlineMath> : <BlockMath>{currentStr}</BlockMath>);
          currentStr = '';
          captureMath = false;
        } else {
          currentStr += question[i];
        }
      } else {
        if (question[i] === '@') {
          sections.push(currentStr);
          currentStr = '';
          captureMath = true;
        }
        else {
          currentStr += question[i];
        }
      }
    }
    sections.push(currentStr.split('\n').map(str => str !== '' ? <p>{str}</p> : <br></br>)); // convert "\n" to a line break

    return sections;
  }

  handleAnswerChange = (e) => this.setState({typedAnswer: e.target.value});

  render() { 
    const {id, title, answered, answer, imgURL, flairs} = this.props.data;
    const body = this.processMath(this.props.data.body);
    const {handleAnswer, handleDelete} = this.props;

    return (
      <div style={{padding: 10}}>
        <Card style={{width: "20em", overflow: 'auto'}}>
          {imgURL ? <Card.Img variant='top' src={imgURL}/> : null}
          <Card.Body>
            <h5>
              <Badge 
                pill 
                bg={answered ? 'success' : 'warning'} 
                text={answered ? 'white' : 'dark'}
              >{answered ? 'Answered' : 'Unanswered'}</Badge>
            </h5>

            {flairs.map(f => <Badge className={'flair'} pill bg={'custom'}>{f}</Badge>)}

            <Card.Title style={{paddingTop: 10}}>{title}</Card.Title>
            <Card.Text>{body}</Card.Text>

            <Form>
              <Form.Control 
                as={'textarea'} 
                rows={5}
                name='answer'
                disabled={answered} 
                value={answered ? answer : undefined} 
                onChange={this.handleAnswerChange}
              ></Form.Control>
              <br></br>

              <Button 
                variant={!answered ? 'outline-primary' : 'secondary'} 
                onClick={() => handleAnswer(getCookie('token'), id, !answered, this.state.typedAnswer)}
              >
                {answered ? 'Undo Answer' : 'Answer'}
              </Button>

              <Button variant={'outline-danger'} style={{float: 'right'}} onClick={() => {handleDelete(getCookie('token'), id)}}>Delete</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
 
export default Question;
import React, {Component} from 'react';
import {InlineMath, BlockMath} from 'react-katex';
import {Card, Button, Badge} from 'react-bootstrap';

class Question extends Component {
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
    sections.push(currentStr);

    return sections;
  }

  render() { 
    const {id, title, answered} = this.props.data;
    const width = this.props.data.width + 'em';
    const body = this.processMath(this.props.data.body);
    const {handleAnswer} = this.props;

    return (
      <div style={{padding: 10}}>
        <Card style={{width: width, overflow: 'auto'}}>
          <Card.Img variant='top' src='./test-images/q2.png'/> {/* ADD A IMG TO THE PROPS FOR THIS COMPONENT */}
          <Card.Body>
            <h5>
              <Badge 
                pill 
                bg={answered ? 'success' : 'warning'} 
                text={answered ? 'white' : 'dark'}
              >{answered ? 'Answered' : 'Unanswered'}</Badge>
            </h5>

            <Card.Title style={{paddingTop: 10}}>{title}</Card.Title>
            <Card.Text>{body}</Card.Text>

            {!answered ? <Button variant='outline-primary' onClick={() => handleAnswer(id)}>Answered</Button> : null}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
 
export default Question;
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
    sections.push(currentStr.split('\n').map(str => str !== '' ? <p>{str}</p> : <br></br>)); // convert "\n" to a line break

    return sections;
  }

  render() { 
    const {id, title, answered, imgURL} = this.props.data;
    const body = this.processMath(this.props.data.body);
    const {handleAnswer} = this.props;

    return (
      <div style={{padding: 10}}>
        <Card style={{width: "20em", overflow: 'auto'}}>
          <Card.Img variant='top' src={imgURL}/>
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
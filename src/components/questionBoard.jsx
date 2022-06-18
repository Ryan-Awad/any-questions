import React, {Component} from 'react';
import Question from './question';

class QuestionBoard extends Component {
  state = {
    questions: [
      {id: 1, title: 'How can I find the derivative of a polynomial?', answered: false, width: 20, body: "If I have @f(x) = 4x^4 - 7x^3 + 2x^2 - 9x - 1# How can I find @\\frac{d}{dx} f(x)&"},
      {id: 2, title: 'Derive a rational function', answered: true, width: 20, body: 'How can I derive @f(x) = \\frac{3x^2 - 2x + 9}{x^2 - 16}#'},
      {id: 3, title: 'Is this differentiation rule correct?', answered: false, width: 20, body: 'Is this correct? @\\frac{d}{dx}\\Big(f(g(x))\\Big) = f\'(g(x)) \\cdot g\'(x)#'}
    ]
  }

  markAsAnswered = (id) => {
    let questions = this.state.questions;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        questions[i].answered = true;
        break;
      }
    }
    this.setState({questions: questions});
  }

  render() { 
    return (
      <React.Fragment>
        {this.state.questions.map(q => <Question key={q.id} data={q} handleAnswer={this.markAsAnswered}/>)}
      </React.Fragment>
    );
  }
}
 
export default QuestionBoard;
import React, {Component} from 'react';
import Question from './question';

/*
{id: 1, title: 'How can I find the derivative of a polynomial?', answered: false, width: 20, body: "If I have @f(x) = 4x^4 - 7x^3 + 2x^2 - 9x - 1# How can I find @\\frac{d}{dx} f(x)&"},
{id: 2, title: 'Derive a rational function', answered: true, width: 20, body: 'How can I derive @f(x) = \\frac{3x^2 - 2x + 9}{x^2 - 16}#'},
{id: 3, title: 'Is this differentiation rule correct?', answered: false, width: 20, body: 'Is this correct? @\\frac{d}{dx}\\Big(f(g(x))\\Big) = f\'(g(x)) \\cdot g\'(x)#'}
*/

class QuestionBoard extends Component {
  state = {
    questions: []
  };
    
  getCookie = (name) => { // https://stackoverflow.com/a/21125098/10273599
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  getQuestions = () => {
    const jwt = this.getCookie('token');
    fetch('https://any-questions-backend.herokuapp.com/get-questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then(res => {
      if (res.status === 401) {
        alert('It appears that you are not logged in. To view your questions, please log into your account.');
        window.location.href = '/login';
      } else {
        res.json().then(data => {
          this.setState({questions: data['success']});
        });
      }
    })
  }

  markAsAnswered = (id) => { // use a hash map to make this O(1)
    let questions = this.state.questions;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        questions[i].answered = true;
        break;
      }
    }
    this.setState({questions: questions}); // send request to backend to answer the question
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() { 
    return ( // GETTING ERROR THAT EACH Question COMPONENT NEEDS UNIQUE KEY, YET I AM DOING THAT. FIX
      <React.Fragment>
        {this.state.questions.map(q => <Question key={q.id} data={q} handleAnswer={this.markAsAnswered}/>)}
      </React.Fragment>
    );
  }
}
 
export default QuestionBoard;
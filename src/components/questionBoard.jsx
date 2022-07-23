import React, {Component} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Question from './question';
import getQuestions from '../helpers/getQuestions';
import answerQuestion from '../helpers/answerQuestion';
import deleteQuestion from '../helpers/deleteQuestion';
import editFlair from '../helpers/editFlair';
import getJwt from '../helpers/getJwt';

class QuestionBoard extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    getJwt(jwt => {
      getQuestions(jwt, questions => {
        this.setState({questions: questions});
      });
    });
  }

  render() { 
    return ( // GETTING ERROR THAT EACH Question COMPONENT NEEDS UNIQUE KEY, YET I AM DOING THAT. FIX
      <React.Fragment>
        <Container style={{float: 'left'}}>
          <Row>
            {this.state.questions.map(q => {
              return (
                <Col>
                  <Question 
                    key={q.id} 
                    data={q} 
                    handleAnswer={answerQuestion} 
                    handleDelete={deleteQuestion}
                    handleEditFlair={editFlair}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
 
export default QuestionBoard;
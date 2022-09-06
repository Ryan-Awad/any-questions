import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import Question from './question';
import getQuestions from '../helpers/getQuestions';
import answerQuestion from '../helpers/answerQuestion';
import deleteQuestion from '../helpers/deleteQuestion';
import editFlair from '../helpers/editFlair';
import getJwt from '../helpers/getJwt';

class QuestionBoard extends Component {
  state = {
    questions: [],
    typedSortFlair: null
  };

  componentDidMount() {
    getJwt(jwt => {
      getQuestions(jwt, questions => {
        this.setState({questions: questions});
      });
    });
  }

  sortQuestions = (flair) => {
    flair = flair.trim();
    if (flair) {
      getJwt(jwt => {
        getQuestions(jwt, questions => {
          const filtered = questions.filter(q => q.flairs.includes(flair));
          this.setState({questions: filtered});
        });
      });
    }
  }

  handleSortFlairChange = (e) => this.setState({typedSortFlair: e.target.value});

  render() { 
    return ( // GETTING ERROR THAT EACH Question COMPONENT NEEDS UNIQUE KEY, YET I AM DOING THAT. FIX
      <React.Fragment>
        <Container style={{float: 'left'}}>
          <div style={{paddingBottom: 60}}>
            <Dropdown style={{paddingTop: 5}}>
              <Dropdown.Toggle variant='info' size='lg'>
                <i class="bi bi-filter"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{padding: 10}}>
              <input style={{padding: 2}} placeholder='Sort by flair' onChange={this.handleSortFlairChange}/>
                <Button variant='secondary' size='sm' onClick={() => {
                  this.sortQuestions(this.state.typedSortFlair);
                }}>
                  <i className="bi bi-tags-fill" style={{paddingRight: 4}}></i>Sort
                </Button>
              </Dropdown.Menu>
            </Dropdown>
          </div>

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
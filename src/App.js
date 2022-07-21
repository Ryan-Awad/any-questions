import React, { Component } from 'react';
import QuestionBoard from './components/questionBoard';
import SubmitQuestion from './components/submitQuestion';
import Login from './components/login';
import Register from './components/register';
import VerifyEmail from './components/verifyEmail';
import NavBar from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isEmailVerified from './helpers/isEmailVerified';
import isSignedIn from './helpers/isSignedIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';

class App extends Component {
  componentDidMount() {
    isSignedIn(signedIn => {
      if (!signedIn) {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      } else {
        isEmailVerified(verified => {
          if (!verified && window.location.pathname !== '/verify-email') {
            window.location.href = '/verify-email';
          }
          else if (verified && (['/login', '/register'].includes(window.location.pathname))) {
            window.location.href = '/';
          }
        });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar/>
        <div style={{padding: 25}}>
          <Routes>
            <Route path='/' element={<QuestionBoard />}/>
            <Route path='ask-question' element={<SubmitQuestion />}/>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
            <Route path='verify-email' element={<VerifyEmail />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

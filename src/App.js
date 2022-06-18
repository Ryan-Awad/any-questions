import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import QuestionBoard from './components/questionBoard';
import SubmitQuestion from './components/submitQuestion';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<QuestionBoard />}/>
        <Route path='ask-question' element={<SubmitQuestion />}/>
        <Route path='login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import NotFoundPage from "./Components/PageNotFound";
import Home from "./Components/Home"
import Header from "./Components/Header";
import Questionnaire from './Components/Questionnaire';
import QuizScore from './Components/QuizScore';
import GamePage from './Components/GamePage';
function App() {
  return (
    <div className="App">
        <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Questionnaire" element={<Questionnaire/>} />
          <Route path="/GamePage" element={<GamePage/>} />
          <Route path="/QuizScore" element={<QuizScore/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

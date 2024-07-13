import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotFoundPage from "./Components/PageNotFound";
import Home from "./Components/Home"
/* import Header from "./Components/Header"; */
import Questionnaire from './Components/Questionnaire';
import QuizScore from './Components/QuizScore';
import GamePage from './Components/GamePage';
import HelpPage from './Components/HelpPage';
import Navbar from './Components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


library.add(fas, far)

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Questionnaire" element={<Questionnaire />} />
          <Route path="/Guidance" element={<HelpPage />} />
          <Route path="/GamePage" element={<GamePage />} />
          <Route path="/QuizScore" element={<QuizScore />} />
          <Route path="/GetStarted" />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

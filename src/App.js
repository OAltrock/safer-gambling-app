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
import { far, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { QueryClientProvider, QueryClient } from "react-query";
import EvaluationPage from './Components/EvaluationPage';
import Footer from './Components/Footer'
import LandingPage from './Components/LandingPage';
import ProtectedRoute from './Components/ProtectedRoute';


library.add(fas, far, faMoon, faSun)
const queryClient = new QueryClient();


function App() { 
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>            
              <Route path="/" element={<LandingPage />} />
              <Route path="/Questionnaire" element={<Questionnaire />} />
              <Route path='/Home' element={<Home />} 
               /* path="/Home" element={<ProtectedRoute component={Home} />} */ />              
              <Route path="/Guidance" element={<HelpPage />} />
              <Route path="/GamePage" element={<GamePage />} />
              <Route path="/QuizScore" element={<QuizScore />} />
              <Route path="/Evaluation" element={<EvaluationPage />} />
              <Route path="*" element={<NotFoundPage />} />            
          </Routes>
          <Footer />
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;

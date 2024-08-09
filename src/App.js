import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotFoundPage from "./Components/PageNotFound";
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from "./Components/Home";
import Questionnaire from './Components/Questionnaire';
import GamePage from './Components/GamePage';
import EvaluationPage from './Components/EvaluationPage';
import Footer from './Components/Footer'
/* import Header from "./Components/Header"; */
import QuizScore from './Components/QuizScore';
import HelpPage from './Components/HelpPage';
import Navbar from './Components/Navbar';



import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { QueryClientProvider, QueryClient } from "react-query";

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
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
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

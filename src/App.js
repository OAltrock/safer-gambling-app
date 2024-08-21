import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotFoundPage from "./Components/PageNotFound";
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Home from "./Components/Home";
import Questionnaire from './Components/Questionnaire';
import GamePage from './Components/GamePage';
import EvaluationPage from './Components/EvaluationPage';
import Footer from './Components/Footer'
/* import Header from "./Components/Header"; */
import QuizScore from './Components/QuizScore';
import HelpPage from './Components/HelpPage';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp.jsx';

import { useDispatch } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { QueryClientProvider, QueryClient } from "react-query";
import ProtectedRoute from './Components/ProtectedRoute';
import { setSize } from './slices/fontSlice';
import { setLanguage } from './slices/languageSlice';
import { getCookie } from './hooks/getCookie.js';
import { useTokenExpiration } from './hooks/useTokenExpiration';
import AuthWrapper from './Components/AuthWrapper.jsx';
import { setFalse } from './slices/gameDoneSlice.js';
import { setQuestionnaireDoneFalse } from './slices/questionnaireDoneSlice.js';
import { reset } from './slices/questionnaireSlice.js';


library.add(fas, far, faMoon, faSun)
const queryClient = new QueryClient();


function App() {
  //document.cookie = "darkMode=; expires=Thu, 01 Jan 1970 00:00:00 GMT";  
  let dispatch = useDispatch();
  let fontSize = getCookie('fontSize');
  let currentLanguage = getCookie('language');
  useTokenExpiration(() => {
    console.log('token expired');
    localStorage.removeItem('token');
    dispatch(setQuestionnaireDoneFalse());
    dispatch(setFalse());
    dispatch(reset());
  });

  if (fontSize) {
    document.documentElement.style.setProperty('--fdm-normal-font-size', fontSize + 'rem');
    document.documentElement.style.setProperty('--fdm-subHeader-font-size', new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 3 }).format(fontSize * 1.5) + 'rem');
    document.documentElement.style.setProperty('--fdm-headings-font-size', fontSize * 2 + 'rem');
    dispatch(setSize({
      normalSize: fontSize + 'rem',
      subHeaderSize: new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 3 }).format(fontSize * 1.5) + 'rem',
      headerSize: fontSize * 2 + 'rem'
    }));
  }

  if (currentLanguage) {
    dispatch(setLanguage(currentLanguage))
  }

  /* let fontSize = useSelector(state => state.setFontSize)
  document.cookie = "fontSize=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; */
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<SignUp />} />
            <Route element={<AuthWrapper />}>
              <Route path="/Questionnaire" element={<ProtectedRoute component={Questionnaire} />} />
              <Route path="/Home" element={<ProtectedRoute component={Home} />} />
              <Route path="/GamePage" element={<ProtectedRoute component={GamePage} />} />
              <Route path="/Evaluation" element={<ProtectedRoute component={EvaluationPage} />} />
            </Route>
            <Route path="/Guidance" element={<HelpPage />} />

            <Route path="/QuizScore" element={<QuizScore />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;

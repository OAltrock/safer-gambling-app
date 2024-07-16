import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import questionnaireDoneReducer from './slices/questionnaireDoneSlice.js';
import gameDoneReducer from './slices/gameDoneSlice.js';
import questionnaireReducer from './slices/questionnaireSlice.js';


const store = configureStore({
  reducer: {
    questionnaireDone: questionnaireDoneReducer,
    gameDone: gameDoneReducer,
    questionnaire: questionnaireReducer 
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { render, screen, prettyDOM } from '@testing-library/react';
import React from 'react';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import questionnaireDoneReducer from './slices/questionnaireDoneSlice.js';
import gameScoresReducer from './slices/gameSlice.js';
import questionnaireReducer from './slices/questionnaireSlice.js';
import darkModeReducer from './slices/darkModeSlice.js';
import languagesReducer from './slices/languageSlice.js';
import setFontSizeReducer from './slices/fontSlice.js';
import gameDoneReducer from './slices/gameDoneSlice.js';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const realLocalStorage = global.localStorage;
const mockLocalStorage = new LocalStorageMock();

describe("Logged out Landing Page", () =>{
  global.localStorage = realLocalStorage;
  const store = configureStore({
    reducer: {
      // questionnaireDone: questionnaireDoneReducer,
      // gameDone: gameDoneReducer,
      // gameScores: gameScoresReducer,
      // questionnaire: questionnaireReducer,
      darkMode: darkModeReducer,
      languages: languagesReducer,
      // setFontSize: setFontSizeReducer
    }
  })
  
  beforeEach(()=> {
    global.localStorage = realLocalStorage;
  })

  test('renders name of app', () => {  
    render(
      <Provider store={store}>
        <App />
      </Provider>);
    const linkElement = screen.getByText(/Safer Gambling App/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Has register button', () => {
    render(
        <Provider store={store}>
          <App />
        </Provider>);

    const linkElement = screen.getByRole('register');
    expect(linkElement).toBeInTheDocument();
  })
  
  test('Has Sign in button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>);

    const linkElement = screen.getByRole('login');
    expect(linkElement).toBeInTheDocument();
  })

  test('Start Button is not visible', ()=> {
    render(
      <Provider store={store}>
        <App />
      </Provider>);

      const linkElement = screen.queryByRole('start');
      expect(linkElement).toBeNull();
  })
});
describe("Logged in Landing Page", () =>{
  const store = configureStore({
    reducer: {
      questionnaireDone: questionnaireDoneReducer,
      gameDone: gameDoneReducer,
      gameScores: gameScoresReducer,
      questionnaire: questionnaireReducer,
      darkMode: darkModeReducer,
      languages: languagesReducer,
      setFontSize: setFontSizeReducer
    }
  });
  beforeEach(()=> {
    global.localStorage = mockLocalStorage;
    global.localStorage.setItem("token", "Logged in user");
  })
  test('renders name of app', () => {  
    render(
      <Provider store={store}>
        <App />
      </Provider>);
    const linkElement = screen.getByText(/Safer Gambling App/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Does not have register button', () => {
    render(
        <Provider store={store}>
          <App />
        </Provider>);

    const linkElement = screen.queryByRole('register');
    expect(linkElement).toBeNull();
  })
  
  test('Has Sign in button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>);

    const linkElement = screen.queryByRole('login');
    expect(linkElement).toBeNull();
  })

  test('Start Button is not visible', ()=> {
    render(
      <Provider store={store}>
        <App />
      </Provider>);

      const linkElement = screen.getByRole('start');
      expect(linkElement).toBeInTheDocument();
  })
});

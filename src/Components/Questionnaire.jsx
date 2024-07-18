import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Questionnaire.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from '../slices/questionnaireSlice.js';
import { toggle } from '../slices/questionnaireDoneSlice.js';
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Form from 'react-bootstrap/Form';

const Questionnaire = () => {

  let dispatch = useDispatch();
  let questionnaire = useSelector(state => state.questionnaire)  
  const navigate = useNavigate();  

  const questions = [
    "You feel very strong negative emotions when you lose a bet.",
    "You often gamble with more money than you originally planned.",
    "You have tried to cut back on gambling but have been unsuccessful.​​​​",
    "You lie to family members or friends about how much you gamble.​",
    "You gamble to escape problems or relieve feelings of anxiety or depression.​",
    "You feel restless or irritable when you try to cut down on gambling.​​​​",
    "You have had financial problems due to gambling (e.g. needing to borrow money, unpaid bills).​",
    "You often think about gambling (e.g. reliving past gambling and/ or planning future gambling).​",
    "You have gambled to try to win back money you have lost (chasing losses).​",
    "You have neglected work, school, or family responsibilities because of gambling.",
  ];

  const totalQuestions = questions.length;
  //checks if questions has been answered (has a postive value)
  const answeredQuestions = Object.values(questionnaire)
    .reduce((acc, value, index) => {
      if (value > 0) {
        return acc += 1
      }
      else return acc
    }, 0);
  const progress = (answeredQuestions / totalQuestions) * 100;
  const [index, setIndex] = useState(0);

  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];  

  //can be moved to where we want to evaluate the questionnaire since we can access the redux store from anywhere 
  /* const calculateTotalScore = () => {
    return Object.values(scores).reduce((total, score) => total + score, 0);
  }; */
  

  /**result is being stored in redux store accessible from anywhere (useSelector(state => state.questionnaire))
  * questionnaire is an object,eg: {question1: 1,question2: 3,...}
  * questions can be set by dispatch {@link handleAnswer}
  */
  const handleSubmit = () => {    
    dispatch(toggle())
    console.log(questionnaire)    
    navigate("/");
  };

  const handleSelect = (selectedIndex, e) => {    
    setIndex(selectedIndex)
  }

  /**
   * uses redux reducers (dispatch {@link useDispatch}) to update questionnaire {@link questionnaire}
   * @param {*} e SyntheticBaseEvent containing target, nativeEvent etc.
   */
  const handleAnswer = (e) => {           
    dispatch(setQuestion({
      id: index + 1,
      data: parseInt(e.target.value)
    }))    
  };

  return (
    <Container fluid>
      <div>
        <h3>Questionnaire</h3>
        <h4 key={'questionCount' + index}>Question {index + 1} of {questions.length} </h4>
      </div>
      <Carousel activeIndex={index} interval={null} onSelect={handleSelect}>
        {questions.map(question => {
          return (
            <Carousel.Item key={`citem${questions.indexOf(question)}`}>
              <p key={`pquest${questions.indexOf(question)}`}>{question}</p>
              <Form key={`radio${questions.indexOf(question)}`}>
                {options.map((option, score) => (
                  <Form.Check
                    inline
                    label={option}
                    name={questions.indexOf(question)}
                    type='radio'                    
                    value={questionnaire['question' + (index + 1)] !== -1 ? questionnaire['question' + (index + 1)] : score + 1}
                    onChange={handleAnswer}                    
                    key={`q${(score + 1)}`}
                  />
                ))}
              </Form>
            </Carousel.Item>
          )
        })}
      </Carousel>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button onClick={handleSubmit} className="submit-button" disabled={answeredQuestions !== questions.length}>Submit</button>
    </Container>
  )
}

export default Questionnaire;

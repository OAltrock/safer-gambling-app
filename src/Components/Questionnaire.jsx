import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Questionnaire.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from '../slices/questionnaireSlice.js';
import { setQuestionnaireDoneTrue } from '../slices/questionnaireDoneSlice.js';
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Form from 'react-bootstrap/Form';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Questionnaire = () => {

  let dispatch = useDispatch();
  let questionnaire = useSelector(state => state.questionnaire);
  const navigate = useNavigate();
  let [header, questionText, preposition, button] = useSelector(state => state.languages[state.languages.current].questionnaire.text);

  const questions = useSelector(state => state.languages[state.languages.current].questionnaire.questions);
  const totalQuestions = questions.length;
  const answeredQuestions = Object.values(questionnaire)
    .reduce((acc, value, index) => {
      if (value.score >= 0) {
        return acc += 1;
      }
      else return acc;
    }, 0);
  const progress = (answeredQuestions / totalQuestions) * 100;
  const [index, setIndex] = useState(0);

  const options = useSelector(state => state.languages[state.languages.current].questionnaire.options);
  const popups = useSelector(state => state.languages[state.languages.current].questionnaire.popups);

  const handleSubmit = () => {
    dispatch(setQuestionnaireDoneTrue());
    navigate("/Home");
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleAnswer = (e) => {
    dispatch(setQuestion({
      id: index + 1,
      data: parseInt(e.target.value)
    }));
  };

  const renderTooltip = (props, popup) => (
    <Tooltip id="button-tooltip" {...props}>
      {popup}
    </Tooltip>
  );

  return (
    <Container fluid>
      <div>
        <h3>{header}</h3>
      </div>

      <Carousel style={{ minHeight: '60vh' }} activeIndex={index} interval={null} onSelect={handleSelect} keyboard={true}>
        {questions.map((question, qIndex) => (
          <Carousel.Item style={{ minHeight: "unset" }} key={`citem${qIndex}`}>
            <h4 key={`questionCount${qIndex}`}>{questionText} {index + 1} {preposition} {questions.length}</h4>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, popups[qIndex])}
            >
              <p key={`pquest${qIndex}`}>{question}</p>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, popups[qIndex])}
            >
              <Form key={`radio${qIndex}`}>
                {options.map((option, score) => (
                  <Form.Check
                    inline
                    label={option}
                    name={qIndex}
                    type='radio'
                    value={questionnaire[`question${index + 1}`].score !== -1 ? questionnaire[`question${index + 1}`].score : score}
                    onChange={handleAnswer}
                    key={`q${score}`}
                  />
                ))}
              </Form>
            </OverlayTrigger>
          </Carousel.Item>

        ))}

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
      <button style={{ alignSelf: 'center' }} onClick={handleSubmit} className="submit-button" disabled={answeredQuestions !== questions.length}>{button}</button>
    </Container>
  );
};

export default Questionnaire;

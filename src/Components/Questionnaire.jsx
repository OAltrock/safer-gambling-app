import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Questionnaire.css";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const questions = [
    "You feel very strong negative emotions when you lose a bet.",
    "You often gamble with more money than you originally planned.",
    "You have tried to cut back on gambling but have been unsuccessful.​​​​",
    "You lie to family members or friends about how much you gamble.​",
    "You gamble to escape problems or relieve feelings of anxiety or depression.​",
    "You feel restless or irritable when you try to cut down on gambling.​​​​",
    "You have had financial problems due to gambling (e.g., needing to borrow money, unpaid bills).​",
    "You often think about gambling (e.g., reliving past gambling and/ or planning future gambling).​",
    "You have gambled to try to win back money you have lost (chasing losses).​",
    "You have neglected work, school, or family responsibilities because of gambling.",
  ];

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(scores).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  const handleAnswer = (questionId, score) => {
    setScores((prevScores) => ({ ...prevScores, [questionId]: score }));
    checkSubmitButton();
  };

  const checkSubmitButton = () => {
    const allQuestionsAnswered =
      Object.keys(scores).length === questions.length;
    setIsSubmit(allQuestionsAnswered);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => (prevQuestion + 1) %questions.length);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion === 0 ? questions.length- 1 : prevQuestion -1);
  };

  const calculateTotalScore = () => {
    return Object.values(scores).reduce((total, score) => total + score, 0);
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    // You can save the totalScore to a state or send it to another component/page
    navigate("/QuizScore", { state: { totalScore } });
  };

  const validateAnswers = () => {
    // Check if all questions have been answered
    return Object.keys(scores).length === questions.length;
  };
  return (
    <div className="questionnaire-container">
      <h1>Questionnaire</h1>
      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <div className="question-card-container">
        <div className="arrow-buttons">
          {/* {currentQuestion > 0 && ( */}
            <button onClick={handlePreviousQuestion}>←</button>
          {/* )} */}

          <div className="question-card">
            <p>{questions[currentQuestion]}</p>
            <div className="options">
              {options.map((option, score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name={`q${currentQuestion + 1}`}
                    value={score + 1}
                    onChange={() =>
                      handleAnswer(`q${currentQuestion + 1}`, score + 1)
                    }
                    checked={scores[`q${currentQuestion + 1}`] === score + 1}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* {currentQuestion < questions.length - 1 ? ( */}
            <button onClick={handleNextQuestion}>→</button>
          {/* ) : (
            <button onClick={handleSubmit} disabled={!validateAnswers()}>
              {isSubmit ? "Submit" : "Next"}
            </button>
          )} */}
        </div>
        <div className="progress-bar">
          <div
            className="progress-filled"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {validateAnswers() && (
        <button onClick={handleSubmit}>Submit</button>
      )}
      </div>
    </div>
  );
};
export default Questionnaire;

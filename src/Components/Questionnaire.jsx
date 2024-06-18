import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Questionnaire.css";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});

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
    "You have neglected work, school, or family responsibilities because of gambling."  ];

  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  const handleAnswer = (questionId, score) => {
    setScores((prevScores) => ({ ...prevScores, [questionId]: score }));
  };

  const calculateTotalScore = () => {
    return Object.values(scores).reduce((total, score) => total + score, 0);
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    // You can save the totalScore to a state or send it to another component/page
    navigate("/QuizScore", { state: { totalScore } }); // Navigate to QuizScore component
  };

  return (
    <div className="questionnaire-container">
      <h1>Questionnaire</h1>
      <div className="question-card-container">
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p>{question}</p>
            <div className="options">
              {options.map((option, score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value={score + 1}
                    onChange={() => handleAnswer(`q${index + 1}`, score + 1)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
export default Questionnaire;

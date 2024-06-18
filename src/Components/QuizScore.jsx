import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing location state
import "../Styles/QuizScore.css"

const QuizScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalScore = location.state?.totalScore || 0; // Get total score from location state


  let message;
  if (totalScore >= 36 && totalScore <= 50) {
    message = (
      <div>
        <h2>Severe Problem Gambler</h2>
        <p>
          This score range indicates a high level of problem gambling behavior. The individual consistently experiences negative emotions related to gambling, frequently exceeds gambling limits, is unable to control their gambling, and faces significant negative consequences in their personal and financial life. Immediate intervention is necessary.
        </p>
      </div>
    );
  } else if (totalScore >= 26 && totalScore <= 35) {
    message = (
      <div>
        <h2>Moderate Problem Gambler</h2>
        <p>
          This score range suggests moderate problem gambling behavior. The individual exhibits many signs of gambling problems but may still have some degree of control. They are at a high risk of developing more severe gambling issues if no preventive measures are taken.
        </p>
      </div>
    );
  } else if (totalScore >= 16 && totalScore <= 25) {
    message = (
      <div>
        <h2>At-Risk Gambler</h2>
        <p>
          This score range indicates that the individual is at risk of developing problem gambling behavior. They may occasionally exceed their gambling limits and face some negative consequences but are not yet deeply entrenched in gambling problems. Preventive measures and education could help prevent further escalation.
        </p>
      </div>
    );
  } else {
    message = (
      <div>
        <h2>Safe and Sensible Gambler</h2>
        <p>
          This score range suggests that the individual is a safe and sensible gambler. They do not exhibit significant signs of problem gambling and can manage their gambling activities without severe negative consequences. Continued responsible gambling practices are encouraged.
        </p>
      </div>
    );
  }
  return (
    <div className="quiz-score-container">
      <h1>Quiz Score</h1>
      <p>Your total score is: {totalScore}</p>
      {message}
      <button onClick={() => navigate(-1)}>Go Back</button> 
    </div>
  );
};

export default QuizScore;
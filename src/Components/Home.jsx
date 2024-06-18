import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

function Home() {

    const navigate = useNavigate();

    const handleQuestionnaireClick = () =>
        navigate("/Questionnaire");

    const handleGameClick = () =>
        navigate("GamePage");
  return (
    <div className="container">
        <div className="text-container">
      <h1>Welcome to the Safer Gambling App</h1>
      <p>
        This application is aimed to test your risk appitite based on a number
        of factors.
      </p>
      <p>
        {" "}
        First we will look at a short questionnaire which will then be followed
        by a risk based diving game.
      </p>
      </div>
      <div className="button-container">
        <button onClick={handleQuestionnaireClick}>Questionnaire</button>
        <button onClick={handleGameClick}>Deep Diving Game</button>
      </div>
    </div>
  );
}

export default Home;

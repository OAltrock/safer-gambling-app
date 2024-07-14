import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";

function Home() {

  let questionnaireDone = useSelector(state => state.questionnaireDone.done);  
  let gameDone = useSelector(state=> state.gameDone.done);    

  const evalDone = false;

  const navigate = useNavigate();

  const handleQuestionnaire = () =>
    navigate("/Questionnaire")

  const handleGame = () =>
    navigate("/GamePage")

  return (
    <div id="home-page">
      <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh" }} >How the Safer Gambling App works:</h1>
      <div className="container">
        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 1</strong> Insightful Questionaire:</span>
          </h3>
          <p>Begin your journey to safer gambling with our insightful Questionaire. This quick and easy step
            helps you understand your gambling behaviour by asking a series of carefully crafted questions.
          </p>
          {!questionnaireDone ? (<button onClick={handleQuestionnaire}>Let's get started</button>)
            : (<div className="doneContainer"> <FontAwesomeIcon icon="fa-solid fa-check" size="3x" className="doneIcon" /></div>)}
        </div>

        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 2</strong> Interactive Assesment Game:</span>
          </h3>
          <p>
            Dive into our interactive Assesment Game, where fun meets insight. This engaging and dynamic
            game is designed to estimate your gambling tendencies in a playful yet accurate way.
          </p>
          {!questionnaireDone ?
            (<button style={{ visibility: "hidden" }}>Let's get started</button>)
            : !gameDone ?
              (<button onClick={handleGame}>Let's get started</button>)
              : (<div className="doneContainer"> <FontAwesomeIcon icon="fa-solid fa-check" size="3x" className="doneIcon" /></div>)             
          }
        </div>

        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 3</strong> Personalized Evaluation:</span>
          </h3>
          <p>
            After the questionnaire and interactive game, receive a comprehensive analysis of your gambling behaviour.
            Our detailed feedback is tailored to you, providing clear insights and actionable advice to help you
            stay in control.
          </p>
          {gameDone ?
            (<button onClick={handleGame}>Let's get started</button>)
            : evalDone ? (<div className="doneContainer"> <FontAwesomeIcon icon="fa-solid fa-check" size="3x" className="doneIcon" /></div>)
              : (<button style={{ visibility: "hidden" }}>Let's get started</button>)
          }
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Home;

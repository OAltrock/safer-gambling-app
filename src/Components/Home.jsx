import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import checkMark from '../Assets/checkMark.png';

function Home() {

  let questionnaireDone = useSelector(state => state.questionnaireDone.done);
  let gameDone = useSelector(state => state.gameScores.done);
  //questionnaireDone = true;
  const evalDone = false;

  const navigate = useNavigate();

  const handleQuestionnaire = () =>
    navigate("/Questionnaire")

  const handleGame = () =>
    navigate("/GamePage")

  const handleEval = () => 
    navigate("/Evaluation")

  return (
    <div id="home-page">
      <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh", fontSize: "var(--fdm-headings-font-size)" }} >How the Safer Gambling App works:</h1>
      <div className="container">
        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 1</strong> Insightful Questionnaire:</span>
          </h3>
          <p>Begin your journey to safer gambling with our insightful questionnaire. This quick and easy step
            helps you understand your gambling behaviour by asking a series of carefully crafted questions.
          </p>
          <div className='thirdContainer'>
            {!questionnaireDone ? (<button onClick={handleQuestionnaire}>Let's get started</button>)
              : (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)}
          </div>
        </div>

        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 2</strong> Interactive Assessment Game:</span>
          </h3>
          <p>
            Dive into our interactive Assesment Game, where fun meets insight. This engaging and dynamic
            game is designed to estimate your gambling tendencies in a playful yet accurate way.
          </p>
          <div className='thirdContainer'>
            {!questionnaireDone ?
              (<button style={{ visibility: "hidden" }}>Let's get started</button>)
              : !gameDone ?
                (<button onClick={handleGame}>Let's get started</button>)
                : (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)
            }
          </div>
        </div>

        <div className="text-container">
          <h3 style={{ marginBottom: "10px" }}>
            <span><strong>Step 3</strong> Personalised Evaluation:</span>
          </h3>
          <p>
            After the questionnaire and interactive game, receive a comprehensive analysis of your gambling behaviour.
            Our detailed feedback is tailored to you, providing clear insights and actionable advice to help you
            stay in control.
          </p>
          <div className='thirdContainer'>
            {gameDone ?
              (<button onClick={handleEval}>Let's get started</button>)
              : evalDone ? (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)
                : (<button style={{ visibility: "hidden" }}>Let's get started</button>)
            }
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Home;

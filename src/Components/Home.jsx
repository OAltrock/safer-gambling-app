import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import { useSelector } from "react-redux";
import checkMark from '../Assets/checkMark.png';

function Home({component: Component, ...rest}) {

  let questionnaireDone = useSelector(state => state.questionnaireDone.questionnaireDone);
  let gameDone = useSelector(state => state.gameDone.gameDone);
  let [header, text1Strong, text1Header, text1, text2Strong, text2Header, text2, text3Strong, text3Header, 
    text3, button] = useSelector(state => state.languages[state.languages.current].homePage);
  
  //console.log(header);
  //questionnaireDone = true;
  const evalDone = false;  

  const navigate = useNavigate();

  const handleQuestionnaire = () =>
    navigate("/Questionnaire")

  const handleGame = () =>
    navigate("/GamePage")

  const handleEval = () => 
    navigate("/Evaluation")

  console.log(gameDone)
  return (
    <div id="home-page">
      <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh", fontSize: "var(--fdm-headings-font-size)" }} >{header}</h1>
      <div className="container">
        <div className="text-container">
          <h3>
            <span><strong>{text1Strong} </strong> {text1Header}</span>
          </h3>
          <p>
            {text1}
          </p>
          <div className='thirdContainer'>
            {!questionnaireDone ? (<button onClick={handleQuestionnaire}>{button}</button>)
              : (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)}
          </div>
        </div>

        <div className="text-container">
          <h3>
            <span><strong>{text2Strong} </strong>{text2Header}</span>
          </h3>
          <p>
            {text2}
          </p>
          <div className='thirdContainer'>
            {!questionnaireDone ?
              (<button style={{ visibility: "hidden" }}>{button}</button>)
              : !gameDone ?
                (<button onClick={handleGame}>{button}</button>)
                : (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)
            }
          </div>
        </div>

        <div className="text-container">
          <h3>
            <span><strong>{text3Strong} </strong>{text3Header}</span>
          </h3>
          <p>
            {text3}
          </p>
          <div className='thirdContainer'>
            {gameDone ?
              (<button onClick={handleEval}>{button}</button>)
              : evalDone ? (<div className='imgContainer'> <img src={checkMark} alt='done' /> </div>)
                : (<button style={{ visibility: "hidden" }}>{button}</button>)
            }
          </div>
        </div>
      </div>      
    </div >
  );
}

export default Home;

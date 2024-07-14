import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toggle} from '../slices/gameDoneSlice.js';

const GamePage = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const isFirstRun = useRef(true);

  const loadGame = () => {
    if (!gameLoading) {
      setGameLoading(true);
      fetch("http://localhost:5000/start_game")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setGameLoaded(true);
          dispatch(toggle());
          setGameLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setGameLoading(false);
        });
    }
  };

   
    useEffect(() => {
      
      if (isFirstRun.current){
        console.log("Loading game");
        loadGame();
        isFirstRun.current = false;     
      }
  }, []);

  const playAgain = () => {
    loadGame();
  };

  return (
    <div>
      <div>Work in progress</div>
      <div className="button-container">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};
export default GamePage;

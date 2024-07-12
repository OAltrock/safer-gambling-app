import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
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
          setGameLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setGameLoading(false);
        });
    }
  };

   
    useEffect(() => {
      console.log("Loading game");
      if (isFirstRun.current){
        loadGame();
        isFirstRun.current = false;     
      }
  }, [loadGame]);

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

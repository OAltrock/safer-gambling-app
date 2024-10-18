import React, { useEffect, useState } from 'react';
import GameComponent from './GameComponent';
import { useNavigate } from 'react-router-dom';
import { useSendGameData } from '../hooks/useSendGameData';

function LoadGame() {
  const navigate = useNavigate();
  const [gameOverData, setGameOverData] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const { mutate, isLoading, isError, error } = useSendGameData();  

  const handleGameOver = (data)=>{
    setGameActive(false);
    setGameOverData(null);
  };

  const handleGameQuit = (data) => {
    console.log(data)
    mutate(
      {data},
      {
        onSuccess: () => {          
          navigate('/Evaluation');
        },
      }
    )    
  };

  const restartGame = () => {
    setGameActive(true);
    setGameOverData(null);
  };

  return (
    <div className="App">
      <h1>My Pygame Game</h1>
      {gameActive ? (
        <GameComponent onGameOver={handleGameOver} onGameQuit={handleGameQuit} />
      ) : (
        <button onClick={restartGame}>Start New Game</button>
      )}
      {gameOverData && (
        <div>
          <h2>Game Over!</h2>
          <p>Final Score: {gameOverData.score}</p>
          <p>Time Played: {gameOverData.time_played}</p>
          <h3>Time Spent in Zones:</h3>
          <ul>
            {Object.entries(gameOverData.zone_times).map(([zone, time]) => (
              <li key={zone}>{zone}: {time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoadGame;
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { setTrue, setFalse } from '../slices/gameDoneSlice.js';
import { setGameScore, increaseAmountPlayed, resetAmount, setDone } from "../slices/gameSlice.js";
import { useQuery } from "react-query";
import axios from "axios";

const GamePage = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();  
  const gameDone = useSelector(state => state.gameScores);
  //const gameScore = useSelector(state => state.gameScores.score);

  async function playAgain() {    
    let promise = await axios.get('http://localhost:5000/start_game');
    let data = promise.data;
    if (data) {      
      dispatch(setDone(true))
      dispatch(setGameScore(data));
      dispatch(increaseAmountPlayed());
      console.log(gameDone);
    }
    return promise;
  };
  const { isFetching, data, refetch, error, isError } = useQuery('StartGame', playAgain, {
    refetchOnWindowFocus: false
  })

  return (
    <div>
      {console.log({ data })}
      <div>Work in progress</div>
      <div className="button-container">
        <button onClick={() => navigate('/')}>Go Back</button>
        <button disabled={isFetching} onClick={() => refetch()}>Play Again</button>
      </div>
      <div> {(isFetching) ? 'Playing the game...' : (isError) ? `${ error }` : null} </div>
    </div>
  );
};
export default GamePage;

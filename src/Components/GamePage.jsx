import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { setTrue, setFalse } from '../slices/gameDoneSlice.js';
import { setGameScore, increaseAmountPlayed, resetAmount, setDone } from "../slices/gameSlice.js";
import { useQuery } from "react-query";
import axios from "axios";
import '../Styles/GamePage.css'

const GamePage = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, data, refetch, error, isError } = useQuery('StartGame', playAgain, {
    refetchOnWindowFocus: false,
    enabled: false
  });
  const gameDone = useSelector(state => state.gameScores);
  let [mainHeadings, paragraph1Strong, paragraph1, orderedList1, unorderedList1_1,
    unorderedList1_2, unorderedList1_3, unorderedList1_4, unorderedList1_5,
    unorderedList1_6, orderedList2, unorderedList2_1, unorderedList2_2, unorderedList2_3,
    orderedList3, unorderedList3_1, unorderedList3_2,
    back,
    again,
    playing] = useSelector(state => state.languages[state.languages.current].gamePage);

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
  /* 
  }) */


  const mapListItems = (listItem) => {    
    return Array.isArray(listItem) ? (<li key={listItem[0]}><strong>{listItem[0]} </strong>{listItem}</li>)
      : (<li key={listItem}>{listItem}</li>);
  }

  return (
    <div id="gamePageContainer" >
      <div>
        <h4>{mainHeadings[0]}</h4>
        <p className="gamePageParagraph"><strong>{paragraph1Strong}</strong>{paragraph1}</p>
      </div>
      <div className="gamePageListContainer">
        <h4>{mainHeadings[1]}</h4>
        <ol>
          <li key={orderedList1[0]} className="headerLI">
            {orderedList1[0]}
            <ul>
              {unorderedList1_1.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[1]} className="headerLI">
            {orderedList1[1]}
            <ul>
              {unorderedList1_2.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[2]} className="headerLI">
            {orderedList1[2]}
            <ul>
              {unorderedList1_3.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[3]} className="headerLI">
            {orderedList1[3]}
            <ul>
              {unorderedList1_4.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[4]} className="headerLI">
            {orderedList1[4]}
            <ul>
              {unorderedList1_5.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[5]} className="headerLI">
            {orderedList1[5]}
            <ul>
              {unorderedList1_6.map(uli => mapListItems(uli))}
            </ul>
          </li>
        </ol>
        <h4>{mainHeadings[2]}</h4>
        <ol>
          <li key={orderedList2[0]} className="headerLI">
            {orderedList2[0]}
            <ul>
              {unorderedList2_1.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[1]} className="headerLI">
            {orderedList1[1]}
            <ul>
              {unorderedList2_2.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList1[2]} className="headerLI">
            {orderedList1[2]}
            <ul>
              {unorderedList2_3.map(uli => mapListItems(uli))}
            </ul>
          </li>
        </ol>
        <h4>{mainHeadings[3]}</h4>
        <ol>
          <li key={orderedList3[0]} className="headerLI">
            {orderedList3[0]}
            <ul>
              {unorderedList3_1.map(uli => mapListItems(uli))}
            </ul>
          </li>
          <li key={orderedList3[1]} className="headerLI">
            {orderedList3[1]}
            <ul>
              {unorderedList3_2.map(uli => mapListItems(uli))}
            </ul>
          </li>
        </ol>
      </div>
      <div className="button-container">
        <button onClick={() => navigate('/')}>{back}</button>
        <span>{(isFetching) ? `${playing}` : (isError) ? `${error}` : null}</span>
        <button disabled={isFetching || gameDone.amountPlayed > 5} onClick={() => refetch()}>{(gameDone.amountPlayed === 0) ? again[0] : again[1]}</button>
      </div>
    </div>
  );
};
export default GamePage;
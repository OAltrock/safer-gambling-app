import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGameScore, increaseAmountPlayed, resetAmount } from "../slices/gameSlice.js";
import { setTrue } from '../slices/gameDoneSlice.js';
import { useMutation, useQuery } from "react-query";
import { Carousel } from "react-bootstrap";
import Image2 from '../Assets/pyGameObstacle2.png';
import Image3 from '../Assets/pyGameResult.jpeg';
import RiskyDiving from '../Assets/shark-dive-xtreme2.jpg';
import axios from "axios";
import '../Styles/GamePage.css'

const GamePage = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const playGame = async () => {
    const response = await axios.get('http://localhost:5000/start_game', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response.data)
    if (response.data) {
      dispatch(setTrue())
      dispatch(setGameScore(response.data));
      console.log(gameDone);
    }
  };
  /* const { isFetching, data, refetch, error, isError } = useQuery('StartGame', playAgain, {
    refetchOnWindowFocus: false,
    enabled: false
  }); */
  const { mutate, isLoading, isError, error } = useMutation(playGame, {
    onSuccess: () => {
      navigate('/Home');
    }
  });
  const gameDone = useSelector(state => state.gameScores);
  
  let [mainHeadings, paragraph1Strong, paragraph1, orderedList1, unorderedList1_1,
    unorderedList1_2, unorderedList1_3, unorderedList1_4, unorderedList1_5,
    unorderedList1_6, orderedList2, unorderedList2_1, unorderedList2_2, unorderedList2_3,
    orderedList3, unorderedList3_1, unorderedList3_2,
    back,
    again,
    playing] = useSelector(state => state.languages[state.languages.current].gamePage);

  /* async function playAgain() {
    let promise = await axios.get('http://localhost:5000/start_game', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    let data = promise.data;
    if (data) {
      dispatch(setTrue())
      dispatch(setGameScore(data));
      dispatch(increaseAmountPlayed());
      console.log(gameDone);
    }
    return promise;
  }; */  
  /* 
  }) */


  const mapListItems = (listItem) => {
    return Array.isArray(listItem) ? (<li key={listItem[0]}><strong>{listItem[0]} </strong>{listItem[1]}</li>)
      : (<li key={listItem}>{listItem}</li>);
  }

  const handlePlayGame = (e) => {
    /* e.preventDefault(); */
    navigate('/loadGame')
  }

  return (
    <div>      
        <div id="gamePageContainer" >
          <div>
            <h4>{mainHeadings[0]}</h4>
            <p style={{ textAlign: 'center' }} className="gamePageParagraph"><strong>{paragraph1Strong}</strong>{paragraph1}</p>
          </div>
          <Carousel fade interval={null}>
            <Carousel.Item>
              <img src={Image2} style={{ scale: 1 }} alt="obstacle2" />
              <p><strong>{mainHeadings[1]}</strong></p>
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

              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={Image3} alt="obstacles" />
              <p>{mainHeadings[2]}</p>
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
              <Carousel.Caption>

              </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
              <img src={RiskyDiving} alt="riskyDiving" />
              <p>{mainHeadings[3]}</p>
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
              <Carousel.Caption>

              </Carousel.Caption>


            </Carousel.Item>
          </Carousel>
          {
            <div className="gamePageListContainer">


            </div>
          }
          <div className="button-container">
            <button onClick={() => navigate('/Home')}>{back}</button>
            <span style={{ color: "var(--fdm-font-color)", fontSize: '2em' }} >{(isLoading) ? `${playing}` : (isError) ? `${error.message}` : null}</span>
            <button disabled={isLoading} onClick={handlePlayGame}>{(gameDone.amountPlayed === 0) ? again[0] : again[1]}</button>
          </div>
        </div>      
    </div>);
}
export default GamePage;
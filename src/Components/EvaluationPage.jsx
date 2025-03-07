import React, { useEffect, useState } from 'react';
import '../Styles/EvaluationPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EvaluationPage = () => {
    let questionnaire = useSelector(state => state.questionnaire);
    const [games, setGames] = useState([])
    let [header, paragraph1, paragraph2Strong, paragraph2, scoreText1, scoreText2, scoreEval, legend, li1Strong, li1
        , li2Strong, li2, li3Strong, li3] = useSelector(state => state.languages[state.languages.current].evaluationPage)
    /*let answered = 0;
     let average = Object.values(questionnaire).reduce((acc, value) => {
        if (value>0) {
            answered+=1;
            return acc+value;
        }
        return 0;
    },0) /answered */

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_games', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setGames(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchGames();
    }, []);


    let scoreBehaviour = 0;
    let scorePersConseq = 0;
    let scoreSocConseq = 0;
    let avg_risk_score = 0;
    let avg_score = 0;

    games.forEach(game=>{
        avg_risk_score+=game.risk_score;
        avg_score+=game.score;
    })
    avg_risk_score/=games.length
    avg_score/=games.length
    console.log(avg_risk_score)
    console.log(avg_score)
    const answeredQuestions = Object.values(questionnaire)
    .reduce((acc, value, index) => {
      if (value.score >= 0) {
        return acc += 1;
      }
      else return acc;
    }, 0);
    Object.values(questionnaire).forEach(value => {
        if (value.dimension === 'Behaviour') scoreBehaviour += value.score;
        if (value.dimension === 'Personal Consequence') scorePersConseq += value.score;
        if (value.dimension === 'Social Consequence') scoreSocConseq += value.score;
    })
    let sum = scoreBehaviour + scorePersConseq + scoreSocConseq;
    return (
        <div className='evalContainer'>
            <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh", marginBottom: "5vh", fontSize: "var(--fdm-headings-font-size)" }}>{header}</h1>
            <p>
                {paragraph1}
            </p>
            <p>
                <strong>{paragraph2Strong}</strong><br />
                {paragraph2}
            </p>
            <p style={{ fontSize: '1.15em' }}><strong>{scoreText1} {sum} {scoreText2}
                {(sum < 1) ? <span> {scoreEval[0]}</span>
                    : (sum < 3) ? <span> {scoreEval[1]}</span>
                        : (sum < 8) ? <span> {scoreEval[2]}</span>
                            : <span> {scoreEval[3]}</span>
                }</strong></p>
            <ul>
                {legend.map(item => {
                    return <li>{item}</li>
                })}
            </ul>
            <ol>
                <li><strong>{li1Strong} (score: {scoreBehaviour}): </strong>{li1[0]}</li>
                <li><strong>{li2Strong} (score: {scorePersConseq}): </strong>{li2[0]}</li>
                <li><strong>{li3Strong} (score: {scoreSocConseq}): </strong>{li3[0]}</li>
            </ol>
            <p>You played {games.length} games today and had an average risk score of: {avg_risk_score} with an average score of: {avg_score}</p>
           
        </div>
    )
}

export default EvaluationPage
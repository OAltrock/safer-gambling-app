import React from 'react';
import '../Styles/EvaluationPage.css';
import { useSelector } from 'react-redux';

const EvaluationPage = () => {
    let questionnaire = useSelector(state => state.questionnaire)
    let answered = 0;
    let average = Object.values(questionnaire).reduce((acc, value) => {
        if (value>0) {
            answered+=1;
            return acc+value;
        }
        return 0;
    },0) /answered
     
    console.log(average);
    return (
        <div className='evalContainer'>
            <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh", marginBottom: "5vh", fontSize: "var(--fdm-headings-font-size)" }}>Your Personalised Evaluation Results</h1>
            <p>
                Thank you for taking the time to complete our questionnaire and participate in the simulated coin-based game.
                The purpose of this evaluation is to assess your gambling behavior and identify any potential risks associated with
                problem gambling. Based on your responses and game performance, we have compiled the following report.
            </p>
            <p>
                <strong>Questionnaire Analysis:</strong><br />                
                The questionnaire consisted of several questions designed to gauge your gambling habits,
                emotional responses, and self-control levels. Your responses indicate the following:
            </p>
            <ol>
                <li><strong>Frequency of Gambling: </strong>You reported engaging in gambling activities multiple times per week.</li>
                <li><strong>Chasing Losses: </strong>You admitted to frequently attempting to win back money after a loss.</li>
                <li><strong>Emotional Responses: </strong>You often feel anxious or stressed when thinking about gambling.</li>
            </ol>
        </div>
    )
}

export default EvaluationPage
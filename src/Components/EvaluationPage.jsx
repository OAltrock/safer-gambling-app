import React from 'react';
import '../Styles/EvaluationPage.css';
import { useSelector } from 'react-redux';

const EvaluationPage = () => {
    let questionnaire = useSelector(state => state.questionnaire);
    let [header, paragraph1, paragraph2Strong, paragraph2, li1Strong, li1
        ,li2Strong, li2, li3Strong, li3] = useSelector(state => state.languages[state.languages.current].evaluationPage)
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
            <h1 style={{ textAlign: "center", color: "#3FE03F", marginTop: "3vh", marginBottom: "5vh", fontSize: "var(--fdm-headings-font-size)" }}>{header}</h1>
            <p>
                {paragraph1}
            </p>
            <p>
                <strong>{paragraph2Strong}</strong><br />                
                {paragraph2}
            </p>
            <ol>
                <li><strong>{li1Strong} </strong>{li1[0]}</li>
                <li><strong>{li2Strong} </strong>{li2[0]}</li>
                <li><strong>{li3Strong} </strong>{li3[0]}</li>
            </ol>
        </div>
    )
}

export default EvaluationPage
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    question1: {
        dimension: "Behaviour",
        label: "Control",
        score: -1
    },
    question2: {
        dimension: "Behaviour",
        label: "Tolerance",
        score: -1
    },
    question3: {
        dimension: "Behaviour",
        label: "Chasing",
        score: -1
    },
    question4: {
        dimension: "Behaviour",
        label: "Borrowing",
        score: -1
    },
    question5: {
        dimension: "Personal Consequence",
        label: "Felt problem",
        score: -1
    },
    question6: {
        dimension: "Personal Consequence",
        label: "Negative Health",
        score: -1
    },
    question7: {
        dimension: "Personal Consequence",
        label: "Criticism",
        score: -1
    },
    question8: {
        dimension: "Social Consequence",
        label: "Financial problems",
        score: -1
    },
    question9: {
        dimension: "Personal Consequence",
        label: "Guilt feelings",
        score: -1
    }
}

const questionnaireSlice = createSlice({
    name: "questionnaire",
    initialState,
    reducers: {
        setQuestion: (state, payload) => {            
            state["question" + payload.payload['id']].score = payload.payload['data']
        }
    }
})

export const { setQuestion } = questionnaireSlice.actions
export default questionnaireSlice.reducer
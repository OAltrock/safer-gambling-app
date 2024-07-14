import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    question1: -1,
    question2: -1,
    question3: -1,
    question4: -1,
    question5: -1,
    question6: -1,
    question7: -1,
    question8: -1,
    question9: -1,
    question10:-1
}

const questionnaireSlice= createSlice({
    name: "questionnaire",
    initialState,
    reducers: {
        setQuestion: (state, payload)=> {
            state["question"+payload.payload['id']] = payload.payload['data']
        }
    }
})

export const {setQuestion} = questionnaireSlice.actions
export default questionnaireSlice.reducer
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    score: 0,
    amountPlayed: 0,
}

const gameScoresSlice= createSlice({
    name: "gameScores",
    initialState,
    reducers: {
        setGameScore: (state, payload)=> {                       
            state.score = (state.amountPlayed===0) ? payload.payload.score : (state.score + payload.payload['score']) /2;
            console.log(state.score);
        },
        increaseAmountPlayed: (state) => {
            state.amountPlayed += 1;            
        },
        resetAmount: (state) => {
            state.amountPlayed = 0;            
        },
        setDone: (state, payload) => {         
            state.done = payload.payload;
        },
    }
})

export const {setGameScore, increaseAmountPlayed, resetAmount, setDone} = gameScoresSlice.actions
export default gameScoresSlice.reducer
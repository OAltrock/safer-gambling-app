import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    gameDone: false
}

const gameSlice= createSlice({
    name: "gameDone",
    initialState,
    reducers: {
        setTrue: (state)=> {
            console.log(state);
            state.gameDone = true;
        },
        setFalse: (state) => {
            state.gameDone = false;
        }
    }
})

export const {setTrue, setFalse} = gameSlice.actions
export default gameSlice.reducer
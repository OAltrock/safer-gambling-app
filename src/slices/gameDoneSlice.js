import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    done: false
}

const gameSlice= createSlice({
    name: "gameDone",
    initialState,
    reducers: {
        setTrue: (state)=> {
            console.log(state);
            state.done = true;
        },
        setFalse: (state) => {
            state.done = false;
        }
    }
})

export const {setTrue, setFalse} = gameSlice.actions
export default gameSlice.reducer
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    done: false
}

const gameSlice= createSlice({
    name: "gameDone",
    initialState,
    reducers: {
        toggle: (state)=> {
            state.done = !state.done
        }
    }
})

export const {toggle} = gameSlice.actions
export default gameSlice.reducer
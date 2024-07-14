import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    done: false
}

const questionnaireDoneSlice= createSlice({
    name: "questionnaireDone",
    initialState,
    reducers: {
        toggle: (state)=> {            
            state.done = !state.done            
        }
    }
})

export const {toggle} = questionnaireDoneSlice.actions
export default questionnaireDoneSlice.reducer
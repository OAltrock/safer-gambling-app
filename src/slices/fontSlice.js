import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    normalSize: '1rem',
    headerSize: '2rem'
}

const setFontSize= createSlice({
    name: "setSize",
    initialState,
    reducers: {
        setSize: (state, payload)=> {                       
            state.normalSize = payload.payload.normalSize;
            state.headerSize = payload.payload.headerSize;
        }
    }
})

export const {setSize} = setFontSize.actions
export default setFontSize.reducer
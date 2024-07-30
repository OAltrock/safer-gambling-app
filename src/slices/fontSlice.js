import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    normalSize: '1rem',
    subHeaderSize: '1.5rem',
    headerSize: '2rem'
}

const setFontSize= createSlice({
    name: "setSize",
    initialState,
    reducers: {
        setSize: (state, payload)=> {  
            state.normalSize = payload.payload.normalSize;
            state.subHeaderSize = payload.payload.subHeaderSize;
            state.headerSize = payload.payload.headerSize;
        }
    }
})

export const {setSize} = setFontSize.actions
export default setFontSize.reducer
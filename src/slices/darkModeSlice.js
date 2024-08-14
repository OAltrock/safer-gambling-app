import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        setDarkMode: (state, payload) => {            
            state.darkMode = payload.payload            
        }
    }
})

export const { setDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer
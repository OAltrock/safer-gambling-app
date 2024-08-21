import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    questionnaireDone: false
}

const questionnaireDoneSlice= createSlice({
    name: "questionnaireDone",
    initialState,
    reducers: {
        setQuestionnaireDoneFalse: (state)=> {            
            state.questionnaireDone = false
        },
        setQuestionnaireDoneTrue: (state)=> {            
            state.questionnaireDone = true
        }
    }
})

export const {setQuestionnaireDoneFalse, setQuestionnaireDoneTrue} = questionnaireDoneSlice.actions
export default questionnaireDoneSlice.reducer
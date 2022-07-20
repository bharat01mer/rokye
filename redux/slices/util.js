import { createSlice } from "@reduxjs/toolkit";

const utilSlice=createSlice({
    name:"util",
    initialState:{
        winWidth:0
    },
    reducers:{
        setwinWidth:(state,action)=>{
            state.winWidth=action.payload
        }
    }
})

export const {setwinWidth}=utilSlice.actions

export default utilSlice
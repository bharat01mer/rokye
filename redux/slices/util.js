import { createSlice } from "@reduxjs/toolkit";


const utilSlice=createSlice({
    name:"util",
    initialState:{
        winWidth:0
    },
    reducers:{
        setwinWidth:(state,action)=>{
            state.winWidth=action.payload
        },
        userData:(state,action)=>{
            state.user=action.payload
        },
        updateUserData:(state,action)=>{
            console.log({action})
            state.user.data.data=action.payload
            
        },
        logout:(state,action)=>{
            state.user=null
            localStorage.clear("user")
        }
    }
})

export const {setwinWidth,userData,logout,updateUserData}=utilSlice.actions

export default utilSlice
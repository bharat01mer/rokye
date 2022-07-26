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
            state.user.data=action.payload
            
        },
        logout:(state,action)=>{
            state.user=null
            localStorage.clear("user")
        },
        searchQuery:(state,action)=>{
            state.search=action.payload
        }
    }
})

export const {setwinWidth,userData,logout,updateUserData,searchQuery}=utilSlice.actions

export default utilSlice
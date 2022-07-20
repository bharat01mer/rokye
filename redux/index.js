import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import {combineReducers} from "redux"
import utilSlice from "./slices/util";


export const rootReducer=combineReducers({
    util: utilSlice.reducer
})

export const store=configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[],
            ignoredPaths:[],
        }
    })
})
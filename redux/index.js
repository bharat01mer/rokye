import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import {combineReducers} from "redux"
import utilSlice from "./slices/util";
import { userApi } from "./slices/user";
import { propertyApi } from "./slices/property";
import { reviewApi } from "./slices/review";

import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore} from "redux-persist";
import thunk from "redux-thunk"


export const rootReducer=combineReducers({
    util: utilSlice.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer
})
const persistConfig={
    key:"root",
    blacklist:[
        "property",
        "review"
    ],
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)


export const store=configureStore({
    reducer: persistedReducer,
    devTools:process.env.NODE_ENV!=="production",
    middleware:[thunk]
})

export const persistor=persistStore(store)
import { legacy_createStore as createStore } from 'redux';
import {Provider} from "react-redux"
import {configureStore, createSlice } from "@reduxjs/toolkit";

const billSlice=createSlice({
    name:"totalAmount",
    initialState:{
       totalAmount :0
    },
    reducers:{
        getTotalI
    }
})
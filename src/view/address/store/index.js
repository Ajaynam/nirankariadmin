import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';
import state from './stateSlice'

const addressReducer = combineReducers({
    data,
    state
})

export default addressReducer

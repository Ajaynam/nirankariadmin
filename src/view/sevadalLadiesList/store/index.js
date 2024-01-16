import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminLadiesSevadalReducer = combineReducers({
    data,
    state,
})

export default adminLadiesSevadalReducer

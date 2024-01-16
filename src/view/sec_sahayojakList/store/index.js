import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminSahayojakReducer = combineReducers({
    data,
    state,
})

export default adminSahayojakReducer

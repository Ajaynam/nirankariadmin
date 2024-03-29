import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminMediaReducer = combineReducers({
    data,
    state,
})

export default adminMediaReducer

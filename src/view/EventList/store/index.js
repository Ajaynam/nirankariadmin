import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminEventsReducer = combineReducers({
    data,
    state,
})

export default adminEventsReducer

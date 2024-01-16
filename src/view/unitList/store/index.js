import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminUnitsReducer = combineReducers({
    data,
    state,
})

export default adminUnitsReducer

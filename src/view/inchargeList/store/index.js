import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminInchargeReducer = combineReducers({
    data,
    state,
})

export default adminInchargeReducer

import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const adminSevadalReducer = combineReducers({
    data,
    state,
})

export default adminSevadalReducer

import { combineReducers } from '@reduxjs/toolkit'
import apiUpdateInchargeDetails from './dataSlice'

const editInchargeReducer = combineReducers({
    apiUpdateInchargeDetails,
   
})

export default editInchargeReducer

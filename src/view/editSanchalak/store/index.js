import { combineReducers } from '@reduxjs/toolkit'
import apiUpdateEmployeeDetails from './dataSlice'

const editEmployeeReducer = combineReducers({
    apiUpdateEmployeeDetails,
   
})

export default editEmployeeReducer

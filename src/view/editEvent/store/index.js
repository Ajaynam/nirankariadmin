import { combineReducers } from '@reduxjs/toolkit'
import apiUpdateEventDetails from './dataSlice'

const editEventReducer = combineReducers({
    apiUpdateEventDetails,
   
})

export default editEventReducer

import React from 'react'
import Userinformation from './components/Sanchalakinformation'
import adminUserReducer from './store'
import { injectReducer } from '../../store'
import Sanchalakinformation from './components/Sanchalakinformation'


injectReducer('adminuserinformation', adminUserReducer)

function index() {


  return (
    <div><Sanchalakinformation/></div>
  )
}

export default index
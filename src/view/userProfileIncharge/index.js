import React from 'react'
import Userinformation from './components/Inchargeinformation'
import adminUserReducer from './store'
import { injectReducer } from '../../store'
import Inchargeinformation from './components/Inchargeinformation'


injectReducer('adminuserinformation', adminUserReducer)

function index() {


  return (
    <div><Inchargeinformation/></div>
  )
}

export default index
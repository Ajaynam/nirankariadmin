import React from 'react'
import adminUserReducer from './store'
import { injectReducer } from '../../store'
import Sevadalinformation from './components/Sevadalinformation'


injectReducer('adminuserinformation', adminUserReducer)

function index() {


  return (
    <div><Sevadalinformation/></div>
  )
}

export default index
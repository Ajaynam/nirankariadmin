import React from 'react'
import Userinformation from './components/Sahayojakinformation'
import adminUserReducer from './store'
import { injectReducer } from '../../store'
import Sahayojakinformation from './components/Sahayojakinformation'


injectReducer('adminuserinformation', adminUserReducer)

function index() {


  return (
    <div><Sahayojakinformation/></div>
  )
}

export default index
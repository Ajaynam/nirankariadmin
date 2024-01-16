import React, { lazy, Suspense } from 'react'
import { Container, AdaptableCard } from '../../components/shared'
import { injectReducer } from '../../store'
import { Card } from '../../components/ui'
import addEmployeeReducer from './store'
import AddMedia from './components/AddMedia'

injectReducer('addEmployee', addEmployeeReducer)

const addMedia = lazy(() =>
    import('./components/AddMedia'))

const AddEmployee = () => {
    return (
        <Suspense fallback={<></>}>
            <Card>
                <AddMedia />
            </Card>
        </Suspense>
    )
}

export default AddEmployee

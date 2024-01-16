
import { injectReducer } from '../../store';
import adminUnitsReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import UnitsTable from './components/UnitTable';


injectReducer('adminUnitsList', adminUnitsReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All  Units</h4>
                <EmployeeTableTools />
            </div>
            <UnitsTable />
        </Card>
    )
}

export default Employee
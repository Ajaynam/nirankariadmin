
import { injectReducer } from '../../store';
import adminInchargeReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import InchargeTable from './components/InchargeTable';

injectReducer('adminInchargeList', adminInchargeReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All Incharge</h4>
                <EmployeeTableTools />
            </div>
            <InchargeTable />
        </Card>
    )
}

export default Employee
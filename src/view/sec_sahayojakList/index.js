
import { injectReducer } from '../../store';
import adminSahayojakReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import SahayojakTable from './components/SahayojakTable';


injectReducer('adminSahayojakList', adminSahayojakReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All Sahayojak</h4>
                <EmployeeTableTools />
            </div>
            <SahayojakTable />
        </Card>
    )
}

export default Employee
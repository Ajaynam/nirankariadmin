
import { injectReducer } from '../../store';
import adminSevadalReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import SevadalGentsTable from './components/SevadalGentsTable';

injectReducer('adminSevadalList', adminSevadalReducer)

const SevadaList = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All Gents Sevadal</h4>
                <EmployeeTableTools />
            </div>
            <SevadalGentsTable />
        </Card>
    )
}

export default SevadaList
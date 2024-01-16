
import { injectReducer } from '../../store';
import adminLadiesSevadalReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import SevadalLadiesTable from './components/SevadalLadiesTable';

injectReducer('adminLadiesSevadalList', adminLadiesSevadalReducer)


const SevadaList = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All Ladies Sevadal</h4>
                <EmployeeTableTools />
            </div>
            <SevadalLadiesTable />
        </Card>
    )
}

export default SevadaList

import { injectReducer } from '../../store';
import adminMediaReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import MediaTable from './components/MediaList';
import MediaList from './components/MediaList';


injectReducer('adminMediaList', adminMediaReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All Media</h4>
                <EmployeeTableTools />
            </div>
            <MediaList />
        </Card>
    )
}

export default Employee
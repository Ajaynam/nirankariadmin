
import { injectReducer } from '../../store';
import adminEventsReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import EventsTable from './components/EventsTable';


injectReducer('adminEventsList', adminEventsReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All  Events</h4>
                <EmployeeTableTools />
            </div>
            <EventsTable />
        </Card>
    )
}

export default Employee
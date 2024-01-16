


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Input, Button, Notification, Toast, Select } from '../../../components/ui';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { updateEventDetails } from '../store/dataSlice';

// const PersonalInformation = () => {
//     const { eventId } = useParams();

//     const event = useSelector((state) => {
//         return state.adminEventsList.data.eventsList.find((e) => e.id === Number(eventId));
//     });


//     const [formData, setFormData] = useState({

//         name: '',
//         date: '',
//         purpuse: '',
//         description: '',
//         branchId: '', // Use branchId as a string
//     });


//     const handleBranchChange = (selectedOption) => {
//         setFormData({ ...formData, branchId: selectedOption.value });
//     };

//     const branchOptions = [
//         { label: 'Sangli', value: '1' },
//         { label: 'Tasgaon', value: '2' },
//         { label: 'Jath', value: '3' },
//     ];

//     const branchIdToName = {
//         1: 'Sangali',
//         2: 'Tasgaon',
//         3: 'Jath',
//     };

//     const [isEditing, setIsEditing] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (event) {
//             setFormData({

//                 name: event.event_name,
//                 branchId: event.event_branch.toString(),
//                 date: event.event_date,
//                 purpuse: event.event_purpuse,
//                 description: event.event_description,
//                 // branchId: event.sec_event_branch_id.toString(), // Ensure it's a string
//             });
//         }
//     }, [event]);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleSave = async () => {
//         try {  
//             const updatedEventData = {
//                 id: eventId,
//                 event_name: formData.name,
//                 event_branch: formData.branchId,
//                 event_date: formData.date,
//                 event_purpuse: formData.purpuse,
//                 event_description: formData.description,
//                 // sec_event_branch_id: parseInt(formData.branchId, 10), // Parse it back to an integer
//             };

//             await dispatch(updateEventDetails(updatedEventData));

//             setIsEditing(false);
//             Toast.push(
//                 <Notification title="Details Updated" type="success">
//                     Event details have been updated successfully.
//                 </Notification>
//             );
//         } catch (error) {
//             console.error('Error updating event details:', error);
//             Toast.push(
//                 <Notification title="Update Failed" type="danger">
//                     Unable to update event details. Please try again later.
//                 </Notification>
//             );
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="mb-8">
//                 <h4 className="text-lg font-semibold mb-2">event Information</h4>
//                 <p className="text-gray-500">Basic information for event</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block font-medium mb-1">
//                         event name
//                     </label>
//                     <Input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="purpuse" className="block font-medium mb-1">
//                         purpuse
//                     </label>
//                     <Input
//                         type="text"
//                         id="purpuse"
//                         name="purpuse"
//                         value={formData.purpuse}
//                         onChange={(e) => setFormData({ ...formData, purpuse: e.target.value })}
//                     />
//                 </div>
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="date" className="block font-medium mb-1">
//                     event date
//                 </label>
//                 <Input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="description" className="block font-medium mb-1">
//                     description
//                 </label>
//                 <Input
//                     type="text"
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label htmlFor="branchId">select unit</label>

//                 <Select
//                     name="branchId"
//                     // options= {branchOptions}
//                     options={Object.keys(branchIdToName).map((id) => ({
//                         label: branchIdToName[id],
//                         value: id,
//                     }))}
//                     onChange={handleBranchChange}
//                     value={branchOptions.find(option => option.value === formData.branchId)}

//                 />

//             </div>


//             <div className="flex justify-end mt-4">
//                 <Button variant="solid" onClick={handleSave}>
//                     Save
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default PersonalInformation;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, DatePicker, Notification, Toast, Select } from '../../../components/ui';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateEventDetails } from '../store/dataSlice';

// import  from '../../../components/ui/DatePicker'; // Import your DatePicker component
import dayjs from 'dayjs';

const PersonalInformation = () => {
    const { eventId } = useParams();

    const event = useSelector((state) => {
        return state.adminEventsList.data.eventsList.find((e) => e.id === Number(eventId));
    });

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        purpuse: '',
        description: '',
        branchId: '', // Use branchId as a string
    });

    const handleBranchChange = (selectedOption) => {
        setFormData({ ...formData, branchId: selectedOption.value });
    };

    const branchOptions = [
        { label: 'Sangli', value: '1' },
        { label: 'Tasgaon', value: '2' },
        { label: 'Jath', value: '3' },
    ];

    const branchIdToName = {
        1: 'Sangali',
        2: 'Tasgaon',
        3: 'Jath',
    };

    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (event) {
            const parts = event.event_date.split('-');
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            console.log("prefilled", event.event_date)
            console.log( formattedDate)
            
            setFormData({
                name: event.event_name,
                branchId: event.event_branch.toString(),
                date: formattedDate,
                // date:event.event_date,
                purpuse: event.event_purpuse,
                description: event.event_description,
            });
        }
    }, [event]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {

            const dateForSubmission = formData.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');

            const updatedEventData = {
                id: eventId,
                event_name: formData.name,
                event_branch: formData.branchId,
                event_date: dateForSubmission,
                event_purpuse: formData.purpuse,
                event_description: formData.description,
                // sec_event_branch_id: parseInt(formData.branchId, 10), // Parse it back to an integer
            };

            await dispatch(updateEventDetails(updatedEventData));

            setIsEditing(false);
            Toast.push(
                <Notification title="Details Updated" type="success">
                    Event details have been updated successfully.
                </Notification>
            );
        } catch (error) {
            console.error('Error updating event details:', error);
            Toast.push(
                <Notification title="Update Failed" type="danger">
                    Unable to update event details. Please try again later.
                </Notification>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">event Information</h4>
                <p className="text-gray-500">Basic information for event</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        event name
                    </label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="purpuse" className="block font-medium mb-1">
                        purpuse
                    </label>
                    <Input
                        type="text"
                        id="purpuse"
                        name="purpuse"
                        value={formData.purpuse}
                        onChange={(e) => setFormData({ ...formData, purpuse: e.target.value })}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block font-medium mb-1">
                    event date
                </label>
                <Input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {/* <DatePicker
                    value={formData.date}
                    onChange={(date) => setFormData({ ...formData, date: date })}
                    dateFormatter="DD-MM-YYYY"
                    yearLabelFormat="YYYY"
                /> */}
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                    description
                </label>
                <Input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="branchId">select unit</label>

                <Select
                    name="branchId"
                    // options= {branchOptions}
                    options={Object.keys(branchIdToName).map((id) => ({
                        label: branchIdToName[id],
                        value: id,
                    }))}
                    onChange={handleBranchChange}
                    value={branchOptions.find((option) => option.value === formData.branchId)}
                />
            </div>

            <div className="flex justify-end mt-4">
                <Button variant="solid" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default PersonalInformation;

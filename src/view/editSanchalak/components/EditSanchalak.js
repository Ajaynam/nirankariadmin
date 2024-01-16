


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Notification, Toast, Select } from '../../../components/ui';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateEmployeeDetails } from '../store/dataSlice';

const PersonalInformation = () => {
    const { employeeId } = useParams();

    const employee = useSelector((state) => {
        return state.adminEmployeeList.data.employeeList.find((e) => e.id === Number(employeeId));
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: "",
        mobile: '',
        dateOfBirth: '',
        gender: "",
        address: '',
        dateOfJoining: "",
        branchId: '',
        occupation: "",
        education: "",
        photo: "",
        bloodGroup: "",
        marritialStatus: "",
        documents: "",
        personalNo: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (employee) {

            const parts = employee.sanchalak_dob.split('/');
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            console.log("prefilled", employee.sanchalak_dob)
            console.log(formattedDate)

            const part = employee.sanchalak_doj.split('/');
            const formattedDates = `${part[2]}-${part[1]}-${part[0]}`;
            console.log("prefilled", employee.sanchalak_doj)
            console.log(formattedDates)

            setFormData({
                name: employee.sanchalak_name,
                email: employee.sanchalak_email,
                password: employee.sanchalak_password,
                mobile: employee.sanchalak_mob,
                dateOfBirth: formattedDate,
                gender: employee.sanchalak_gender,
                address: employee.sanchalak_address,
                dateOfJoining: formattedDates,
                branchId: employee.sanchalak_branchId.toString(),
                occupation: employee.sanchalak_occupation,
                education: employee.sanchalak_education,
                photo: employee.sanchalak_photo,
                bloodGroup: employee.sanchalak_booldG,
                marritialStatus: employee.sanchalak_marritialStatus,
                documents: employee.sanchalak_otherDocuments,
                personalNo: employee.sanchalak_personalNo,

            });
        }
    }, [employee]);

    const handleEdit = () => {
        setIsEditing(true);
    };

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



    const handleSave = async () => {
        try {
            const dateForSubmission = formData.dateOfBirth.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
            const dateForSubmissions = formData.dateOfJoining.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');

            const updatedEmployeeData = {
                id: employeeId,
                sanchalak_name: formData.name,
                sanchalak_email: formData.email,
                sanchalak_password: formData.password,
                sanchalak_mob: formData.mobile,
                sanchalak_dob: dateForSubmission,
                sanchalak_gender: formData.gender,
                sanchalak_address: formData.address,
                sanchalak_doj: dateForSubmissions,
                sanchalak_branchId: formData.branchId,
                sanchalak_occupation: formData.occupation,
                sanchalak_education: formData.education,
                sanchalak_photo: formData.photo,
                sanchalak_booldG: formData.bloodGroup,
                sanchalak_marritialStatus: formData.marritialStatus,
                sanchalak_otherDocuments: formData.documents,
                sanchalak_personalNo: formData.personalNo,



            };

            await dispatch(updateEmployeeDetails(updatedEmployeeData));

            setIsEditing(false);
            Toast.push(
                <Notification title="Details Updated" type="success">
                    Employee details have been updated successfully.
                </Notification>
            );
        } catch (error) {
            console.error('Error updating employee details:', error);
            Toast.push(
                <Notification title="Update Failed" type="danger">
                    Unable to update employee details. Please try again later.
                </Notification>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">Sanchalak Information</h4>
                <p className="text-gray-500">Basic information for the sanchalak</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Full name of sanchalak:
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
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email:
                    </label>

                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password:
                    </label>

                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                </div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="block font-medium mb-1">
                        Mobile:
                    </label>

                    <Input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />

                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block font-medium mb-1">
                        date of birth
                    </label>
                    <Input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />

                </div>
                
            <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                    Address:
                </label>

                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />

            </div>
            <div className="mb-4">
                    <label htmlFor="dateOfJoining" className="block font-medium mb-1">
                        date of Order
                    </label>
                    <Input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
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
                    value={branchOptions.find(option => option.value === formData.branchId)}

                />

            </div>
            <div className="mb-4">
                <label htmlFor="occupation" className="block font-medium mb-1">
                    Occupation:
                </label>

                <Input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />

            </div>

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


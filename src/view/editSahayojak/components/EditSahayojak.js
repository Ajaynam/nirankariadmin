

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Notification, Toast, Select } from '../../../components/ui';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateSahayojakDetails } from '../store/dataSlice';

const PersonalInformation = () => {
    const { sahayojakId } = useParams();

    const sahayojak = useSelector((state) => {
        return state.adminSahayojakList.data.sahayojakList.find((e) => e.id === Number(sahayojakId));
    });

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        occupation: '',
        mobile: '',
        address: '',
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
        if (sahayojak) {
            setFormData({

                name: sahayojak.sec_sahayojak_name,
                branchId: sahayojak.sec_sahayojak_branch_id.toString(),
                occupation: sahayojak.sec_sahayojak_occupation,
                mobile: sahayojak.sec_sahayojak_mobile,
                address: sahayojak.sec_sahayojak_address,
                // branchId: sahayojak.sec_sahayojak_branch_id.toString(), // Ensure it's a string
            });
        }
    }, [sahayojak]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedSahayojakData = {
                id: sahayojakId,
                sec_sahayojak_name: formData.name,
                sec_sahayojak_branch_id: formData.branchId,
                sec_sahayojak_occupation: formData.occupation,
                sec_sahayojak_mobile: formData.mobile,
                sec_sahayojak_address: formData.address,
                // sec_sahayojak_branch_id: parseInt(formData.branchId, 10), // Parse it back to an integer
            };

            await dispatch(updateSahayojakDetails(updatedSahayojakData));

            setIsEditing(false);
            Toast.push(
                <Notification title="Details Updated" type="success">
                    Sahayojak details have been updated successfully.
                </Notification>
            );
        } catch (error) {
            console.error('Error updating sahayojak details:', error);
            Toast.push(
                <Notification title="Update Failed" type="danger">
                    Unable to update sahayojak details. Please try again later.
                </Notification>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">sahayojak Information</h4>
                <p className="text-gray-500">Basic information for sahayojak</p>
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
            </div>
            <div className="mb-4">
                <label htmlFor="occupation" className="block font-medium mb-1">
                    Email:
                </label>
                <Input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
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


            <div className="flex justify-end mt-4">
                <Button variant="solid" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default PersonalInformation;



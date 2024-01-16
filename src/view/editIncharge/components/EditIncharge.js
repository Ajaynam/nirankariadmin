
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Notification, Toast, Select } from '../../../components/ui';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateInchargeDetails } from '../store/dataSlice';

const PersonalInformation = () => {
    const { inchargeId } = useParams();
 
    const incharge = useSelector((state) => {
        return state.adminInchargeList.data.inchargeList.find((e) => e.id === Number(inchargeId));
    });

    const [formData, setFormData] = useState({
        name: '',
        // email: '',
        mobile: '',
        address: '',
        branchId: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (incharge) {
            setFormData({
                name: incharge.incharg_name,
                // email: incharge.incharg_email,
                mobile: incharge.incharg_mobile,
                address: incharge.incharg_address,
                branchId: incharge.incharge_branch_id,
            });
        }
    }, [incharge]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedInchargeData = {
                id: inchargeId,
                incharg_name: formData.name,
                // incharg_email: formData.email,
                incharg_mobile: formData.mobile,
                incharg_address: formData.address,
                incharge_branch_id: formData.branchId,
            };

            await dispatch(updateInchargeDetails(updatedInchargeData));

            setIsEditing(false);
            Toast.push(
                <Notification title="Details Updated" type="success">
                    Incharge details have been updated successfully.
                </Notification>
            );
        } catch (error) {
            console.error('Error updating incharge details:', error);
            Toast.push(
                <Notification title="Update Failed" type="danger">
                    Unable to update incharge details. Please try again later.
                </Notification>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">Incharge Information</h4>
                <p className="text-gray-500">Basic information for the incharge</p>
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
            {/* <div className="mb-4">
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

            </div> */}
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
                <label htmlFor="branchId" className="block font-medium mb-1">
                    Unit:
                </label>

                <Input
                    type="text"
                    id="branchId"
                    name="branchId"
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
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


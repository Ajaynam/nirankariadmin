


import React, { useState } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; 
import { Button, Input, Notification, Select, Toast } from '../../../components/ui';

const PersonalInformation = () => {
    const [formData, setFormData] = useState({
        sevadalGents_name: '',
        sevadalGents_mob: '',
        sevadalGents_email: '',
        sevadalGents_password: '',
        sevadalGents_gender: '',
        sevadalGents_doj: '',
        sevadalGents_address: '',
        sevadalGents_dob: '',
        sevadalSanchalak_Id: '',
        sevadalGents_occupation: "", sevadalGents_education: "", sevadalGents_photo: "", sevadalGents_booldG: "", sevadalGents_marritialStatus: "", sevadalGents_otherDocument: "",sevadalGents_designation:"",
    });
    const designationOption = [
        { label: 'Sewadal', value: "Sewadal" },
        { label: 'Sanchalika', value: "Sanchalika, " },
        { label: 'Sahayak Sanchalika', value: "Sahayak Sanchalika" },
        { label: 'Shikshika ', value: "Shikshika" },
        { label: 'Sahayak Shikshika', value: "Sahayak Shikshika" },
        { label: 'Incharge', value: "Incharge" },
    ];
    const genderOption = [
        { label: 'Male', value: "male" },
        { label: 'Female', value: "female" },
    ];

    const marritialStatusOption = [
        { label: 'Married', value: "Married" },
        { label: 'Unmarried', value: "Unmarried" },
    ]

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };
    const handleBranchChange = (selectedOption) => {
        setFormData({ ...formData, sevadalGents_branchId: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, sevadalGents_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, sevadalGents_marritialStatus: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://snmsangli.com/api/sevadalGents/new_sevadal_gents', formData);

            if (response.status < 400) {
                console.log( response);
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        Sanchalak created successfully.
                    </Notification>
                );

            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create sanchalak . Please try again later.
                    </Notification>
                );
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="form-container">
            <h4 className="text-lg font-semibold mb-2">Sanchalak Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the sanchalak</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="sevadalGents_name">Full name of sanchalak</label>
                    <Input
                        type="text"
                        name="sevadalGents_name"
                        value={formData.sevadalGents_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadalGents_name">phone </label>
                    <Input
                        type="text"
                        name="sevadalGents_mob"
                        value={formData.sevadalGents_mob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadalGents_email">Email</label>
                    <Input
                        type="text"
                        name="sevadalGents_email"
                        value={formData.sevadalGents_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadalGents_password">Create Password</label>
                    <Input
                        type="password"
                        name="sevadalGents_password"
                        value={formData.sevadalGents_password}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="sevadalGents_gender">Gender</label>

                    <Select handleGenderChange
                        name="sevadalGents_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.sevadalGents_gender)}


                    />

                </div> */}
                <div className="form-group">
                    <label htmlFor="sevadalGents_marritialStatus">Marital Status</label>

                    <Select
                        name="sevadalGents_marritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.sevadalGents_marritialStatus)}


                    />

                </div>
                {/* <div className="form-group">
          <label htmlFor="sevadalGents_doj">Date of Joining</label>
          <input
            type="text"
            name="sevadalGents_doj"
            value={formData.sevadalGents_doj}
            onChange={handleChange}
          />
        </div> */}
                <div className="form-group">
                    <label htmlFor="sevadalGents_address">Address</label>
                    <Input
                        type="text"
                        name="sevadalGents_address"
                        value={formData.sevadalGents_address}
                        onChange={handleChange}
                    />
                </div>
              
                <div className="form-group">
                    <label htmlFor="sevadalGents_booldG">Blood Group</label>
                    <Input
                        type="text"
                        name="sevadalGents_booldG"
                        value={formData.sevadalGents_booldG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadalGents_occupation">Occupation</label>
                    <Input
                        type="text"
                        name="sevadalGents_occupation"
                        value={formData.sevadalGents_occupation}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
          <label htmlFor="sevadalGents_dob">Date of Birth</label>
          <input
            type="text"
            name="sevadalGents_dob"
            value={formData.sevadalGents_dob}
            onChange={handleChange}
          />
        </div> */}
                <div className="form-group">
                    <label htmlFor="sevadalGents_designation">Select Designation</label>
                    <Select
                        type="text"
                        name="sevadalGents_designation"
                        // value={formData.sevadalGents_branchId}
                        options={designationOption}
                        onChange={handleBranchChange}
                        value={designationOption.find(option => option.value === formData.sevadalGents_designation)}

                    />
                </div>
                <div className='mt-6'>
                    <Button variant="solid" className="" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;

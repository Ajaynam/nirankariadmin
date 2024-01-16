
import React, { useState } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, Input, Notification, Select, Toast } from '../../../components/ui';

const PersonalInformation = () => {
    const [formData, setFormData] = useState({
        sec_sahayojak_name: '',
        sec_sahayojak_mobile: '',
        sec_sahayojak_occupation: '',
        sec_sahayojak_education: '',
        sec_sahayojak_gender: '',
        sec_sahayojak_doj: '',
        sec_sahayojak_address: '',
        sec_sahayojak_dob: '',
        sec_sahayojak_branch_id: '',
        sec_sahayojak_photo: null,
        sec_sahayojak_bloodG: "",
        sec_sahayojak_maritialStatus: "",
        sec_sahayojak_otherDocuments: null,
    });
    const branchOptions = [
        { label: 'Sangli', value: 1 },
        { label: 'Tasgaon', value: 2 },
        { label: 'Jath', value: 3 },
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
        const { name, value, type } = e.target;

        if (type === 'file') {
            // For file inputs, set the value to the selected file
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            // For other inputs, set the value as usual
            setFormData({ ...formData, [name]: value });
        }

    };
    const handleBranchChange = (selectedOption) => {
        setFormData({ ...formData, sec_sahayojak_branch_id: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, sec_sahayojak_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, sec_sahayojak_maritialStatus: selectedOption.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        // Create a FormData object to handle file uploads
        const form = new FormData();


        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://snmsangli.com/api/sahayojak/new_sec_sahayojak', form, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type for file uploads
                },
            });


            if (response.status < 400) {
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        sahayojak created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create sahayojak. Please try again later.
                    </Notification>
                );
            }
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('Network Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="form-container">
            <h4 className="text-lg font-semibold mb-2">sahayojak Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the sahayojak</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_name">Full name of sahayojak</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_name"
                        value={formData.sec_sahayojak_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_mobile">phone </label>
                    <Input
                        type="text"
                        name="sec_sahayojak_mobile"
                        value={formData.sec_sahayojak_mobile}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_occupation">Occoupatation</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_occupation"
                        value={formData.sec_sahayojak_occupation}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="sec_sahayojak_maritialStatus">Marritial status</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_maritialStatus"
                        value={formData.sec_sahayojak_maritialStatus}
                        onChange={handleChange}
                    />
                </div> */}

                <div className="form-group">
                    <label htmlFor="sec_sahayojak_maritialStatus">Marital Status</label>

                    <Select
                        name="sec_sahayojak_maritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.sec_sahayojak_maritialStatus)}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="sec_sahayojak_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="sec_sahayojak_photo"
                        multiple={true}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_bloodG">blood Group</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_bloodG"
                        value={formData.sec_sahayojak_bloodG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_education">education</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_education"
                        value={formData.sec_sahayojak_education}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_gender">Gender</label>

                    <Select
                        name="sec_sahayojak_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.sec_sahayojak_gender)}


                    />

                </div>
                {/* <div className="form-group">
          <label htmlFor="sec_sahayojak_doj">Date of Joining</label>
          <input
            type="text"
            name="sec_sahayojak_doj"
            value={formData.sec_sahayojak_doj}
            onChange={handleChange}
          />
        </div> */}
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_address">Address</label>
                    <Input
                        type="text"
                        name="sec_sahayojak_address"
                        value={formData.sec_sahayojak_address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_otherDocuments">Other Documents</label>
                    <Input
                        type="file"
                        name="sec_sahayojak_otherDocuments"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection

                    />
                </div>
                {/* <div className="form-group">
          <label htmlFor="sec_sahayojak_dob">Date of Birth</label>
          <input
            type="text"
            name="sec_sahayojak_dob"
            value={formData.sec_sahayojak_dob}
            onChange={handleChange}
          />
        </div> */}
                <div className="form-group">
                    <label htmlFor="sec_sahayojak_branch_id">Branch Name</label>
                    <Select
                        type="text"
                        name="sec_sahayojak_branch_id"
                        options={branchOptions}
                        onChange={handleBranchChange}
                        value={branchOptions.find(option => option.value === formData.sec_sahayojak_branch_id)}

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

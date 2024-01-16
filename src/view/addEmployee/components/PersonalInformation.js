
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, DatePicker, Input, Notification, Select, Toast } from '../../../components/ui';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'

const PersonalInformation = () => {
    const [pwInputType, setPwInputType] = useState('password')
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [branchOptions, setBranchOptions] = useState([]);
    const [formData, setFormData] = useState({
        sanchalak_name: '',
        sanchalak_mob: '',
        sanchalak_email: '',
        sanchalak_password: '',
        sanchalak_gender: '',
        sanchalak_doj: '',
        sanchalak_address: '',
        sanchalak_photo: null,
        sanchalak_otherDocuments: null,
        sanchalak_dob: '',
        sanchalak_branchId: '',
        sanchalak_occupation: "", sanchalak_education: "", sanchalak_photo: "", sanchalak_booldG: "", sanchalak_marritialStatus: "", sanchalak_personalNo: "",
    });

    const onPasswordVisibleClick = (e) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const inputIcon = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    const genderOption = [
        { label: 'Male', value: "male" },
        { label: 'Female', value: "female" },
    ];

    const marritialStatusOption = [
        { label: 'Married', value: "Married" },
        { label: 'Unmarried', value: "Unmarried" },
    ]




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
        setFormData({ ...formData, sanchalak_branchId: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, sanchalak_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, sanchalak_marritialStatus: selectedOption.value });
    };
    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB')
        setFormData({ ...formData, sanchalak_dob: formattedDate });
    };
    const handleDojChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy" format
        setFormData({ ...formData, sanchalak_doj: formattedDate });
    };

    useEffect(() => {
        // Fetch the unit data from the API
        axios.get('http://snmsangli.com/api/unit/get_unit')
            .then((response) => {
                // Assuming the response data is an array of units with properties 'label' and 'value'
                const branchOptions = response.data.map((unit) => ({
                    value: unit.id, // Assuming 'id' is the value
                    label: unit.unit_name, // Assuming 'name' is the label
                }));
                setBranchOptions(branchOptions);
                console.log(branchOptions)
            })
            .catch((error) => {
                console.error('Error fetching unit data:', error);
            });
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create a FormData object to handle file uploads
        const form = new FormData();


        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {

            const selectedBranch = branchOptions.find((option) => option.value === formData.sanchalak_branchId);
            formData.sanchalak_branchId = selectedBranch ? selectedBranch.label : '';
            console.log(selectedBranch)


            const response = await axios.post('http://snmsangli.com/api/sanchalak/new_sanchalak', form, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type for file uploads
                },
            });

            if (response.status < 400) {
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        sanchalak created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create sanchalak. Please try again later.
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
                    <label htmlFor="sanchalak_name">Full name of sanchalak</label>
                    <Input
                        type="text"
                        name="sanchalak_name"
                        value={formData.sanchalak_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_mob">phone </label>
                    <Input
                        type="text"
                        name="sanchalak_mob"
                        value={formData.sanchalak_mob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_personalNo">personal number </label>
                    <Input
                        type="text"
                        name="sanchalak_personalNo"
                        value={formData.sanchalak_personalNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_email">Email</label>
                    <Input
                        type="text"
                        name="sanchalak_email"
                        value={formData.sanchalak_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_password">Create Password</label>
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        placeholder="Password"
                        name="sanchalak_password"
                        value={formData.sanchalak_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_gender">Gender</label>

                    <Select handleGenderChange
                        name="sanchalak_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.sanchalak_gender)}


                    />

                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_dob">Date of Birth</label>
                    <DatePicker
                        value={formData.sanchalak_dob}
                        onChange={handleDateChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_doj">Date of Order</label>
                    <DatePicker
                        value={formData.sanchalak_doj}
                        onChange={handleDojChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_marritialStatus">Marital Status</label>


                    <Select
                        name="sanchalak_marritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.sanchalak_marritialStatus)}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="sanchalak_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="sanchalak_photo"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_otherDocuments">Upload Other Documents</label>
                    <Input
                        type="file"
                        name="sanchalak_otherDocuments"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sanchalak_address">Address</label>
                    <Input
                        type="text"
                        name="sanchalak_address"
                        value={formData.sanchalak_address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sanchalak_booldG">Blood Group</label>
                    <Input
                        type="text"
                        name="sanchalak_booldG"
                        value={formData.sanchalak_booldG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanchalak_occupation">Occupation</label>
                    <Input
                        type="text"
                        name="sanchalak_occupation"
                        value={formData.sanchalak_occupation}
                        onChange={handleChange}
                    />
                </div>  <div className="form-group">
                    <label htmlFor="sanchalak_education">Education</label>
                    <Input
                        type="text"
                        name="sanchalak_education"
                        value={formData.sanchalak_education}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="sanchalak_branchId">Branch Name</label>
                    <Select
                        type="text"
                        name="sanchalak_branchId"
                        // value={formData.sanchalak_branchId}
                        options={branchOptions}
                        onChange={handleBranchChange}
                        value={branchOptions.find((option) => option.value === formData.sanchalak_branchId)}

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

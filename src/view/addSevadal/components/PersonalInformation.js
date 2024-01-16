
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, DatePicker, Input, Notification, Select, Toast } from '../../../components/ui';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'

const PersonalInformation = () => {
    const [pwInputType, setPwInputType] = useState('password')

    const [branchOptions, setBranchOptions] = useState([]);
    const [formData, setFormData] = useState({
        sevadal_type: '',
        sevadal_name: '',
        sevadal_mob: '',
        sevadal_email: '',
        sevadal_password: '',
        sevadal_gender: '',
        sevadal_doj: '',
        sevadal_address: '',
        sevadal_photo: null,
        sevadal_otherDocuments: null,
        sevadal_dob: '',
        sevadal_branchId: '',
        sevadal_designation: '',
        sevadal_occupation: "", sevadal_education: "", sevadal_photo: "", sevadal_booldG: "", sevadal_marritialStatus: "", sevadal_personalNo: "",
    });
    // const branchOptions = [
    //     { label: 'Sangli', value: 1 },
    //     { label: 'Tasgaon', value: 2 },
    //     { label: 'Jath', value: 3 },
    // ];
    const genderOption = [
        { label: 'Male', value: "male" },
        { label: 'Female', value: "female" },
    ];
    const sevadaltypeOption = [
        { label: 'Gents', value: "Gents" },
        { label: 'Ladies', value: "Ladies" },
    ];

    const marritialStatusOption = [
        { label: 'Married', value: "Married" },
        { label: 'Unmarried', value: "Unmarried" },
    ]
    const designationOption = [
        { label: 'Sewadal', value: "Sewadal" },
        { label: 'Sanchalika', value: "Sanchalika, " },
        { label: 'Sahayak Sanchalika', value: "Sahayak Sanchalika" },
        { label: 'Shikshika ', value: "Shikshika" },
        { label: 'Sahayak Shikshika', value: "Sahayak Shikshika" },
        { label: 'Incharge', value: "Incharge" },
    ];
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
        setFormData({ ...formData, sevadal_branchId: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, sevadal_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, sevadal_marritialStatus: selectedOption.value });
    };
    const handleTypeChange = (selectedOption) => {
        setFormData({ ...formData, sevadal_type: selectedOption.value });
    };
    const handleDesignationChange = (selectedOption) => {
        setFormData({ ...formData, sevadal_designation: selectedOption.value });
    };
    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB')
        setFormData({ ...formData, sevadal_dob: formattedDate });
    };
    const handleDojChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy" format
        setFormData({ ...formData, sevadal_doj: formattedDate });
    };

    useEffect(() => {
        axios.get('http://snmsangli.com/api/unit/get_unit')
            .then((response) => {
                const branchOptions = response.data.map((unit) => ({
                    value: unit.id, 
                    label: unit.unit_name, 
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

            const selectedBranch = branchOptions.find((option) => option.value === formData.sevadal_branchId);
            formData.sevadal_branchId = selectedBranch ? selectedBranch.label : '';
            console.log(selectedBranch)


            const response = await axios.post('http://snmsangli.com/api/sevadal/new_sevadal', form, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            if (response.status < 400) {
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        sevadal created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create sevadal. Please try again later.
                    </Notification>
                );
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


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



    const onPasswordVisibleClick = (e) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }
    return (
        <div className="form-container">
            <h4 className="text-lg font-semibold mb-2">sevadal Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the sevadal</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="sevadal_type">Sevadal Type </label>
                    <Select
                        name="sevadal_type"
                        options={sevadaltypeOption}
                        onChange={handleTypeChange}
                        value={sevadaltypeOption.find(option => option.value === formData.sevadal_type)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_name">Full name of sevadal</label>
                    <Input
                        type="text"
                        name="sevadal_name"
                        value={formData.sevadal_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_mob">phone </label>
                    <Input
                        type="text"
                        name="sevadal_mob"
                        value={formData.sevadal_mob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_personalNo">personal number </label>
                    <Input
                        type="text"
                        name="sevadal_personalNo"
                        value={formData.sevadal_personalNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_email">Email</label>
                    <Input
                        type="text"
                        name="sevadal_email"
                        value={formData.sevadal_email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sanchalak_password">Create Password</label>
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        placeholder="Password"
                        name="sevadal_password"
                        value={formData.sevadal_password}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="sevadal_password">Create Password</label>
                    <Input
                        type="password"
                        name="sevadal_password"
                        value={formData.sevadal_password}
                        onChange={handleChange}
                    />
                </div> */}
                {/* <div className="form-group">
                    <label htmlFor="sevadal_gender">Gender</label>

                    <Select handleGenderChange
                        name="sevadal_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.sevadal_gender)}


                    />

                </div> */}
                <div className="form-group">
                    <label htmlFor="sevadal_dob">Date of Birth</label>
                    <DatePicker
                        value={formData.sevadal_dob}
                        onChange={handleDateChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_doj">Date of Order</label>
                    <DatePicker
                        value={formData.sevadal_doj}
                        onChange={handleDojChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_marritialStatus">Marital Status</label>
                    <Select
                        name="sevadal_marritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.sevadal_marritialStatus)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sevadal_designation">Designation Status</label>
                    <Select
                        name="sevadal_designation"
                        options={designationOption}
                        onChange={handleDesignationChange}
                        value={designationOption.find(option => option.value === formData.sevadal_designation)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sevadal_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="sevadal_photo"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_otherDocuments">Upload Other Documents</label>
                    <Input
                        type="file"
                        name="sevadal_otherDocuments"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sevadal_address">Address</label>
                    <Input
                        type="text"
                        name="sevadal_address"
                        value={formData.sevadal_address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sevadal_booldG">Blood Group</label>
                    <Input
                        type="text"
                        name="sevadal_booldG"
                        value={formData.sevadal_booldG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sevadal_occupation">Occupation</label>
                    <Input
                        type="text"
                        name="sevadal_occupation"
                        value={formData.sevadal_occupation}
                        onChange={handleChange}
                    />
                </div>  <div className="form-group">
                    <label htmlFor="sevadal_education">Education</label>
                    <Input
                        type="text"
                        name="sevadal_education"
                        value={formData.sevadal_education}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="sevadal_branchId">Branch Name</label>
                    <Select
                        type="text"
                        name="sevadal_branchId"
                        // value={formData.sevadal_branchId}
                        options={branchOptions}
                        onChange={handleBranchChange}
                        value={branchOptions.find((option) => option.value === formData.sevadal_branchId)}

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

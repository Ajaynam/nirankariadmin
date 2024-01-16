
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, DatePicker, Input, Notification, Select, Toast } from '../../../components/ui';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'

const PersonalInformation = () => {
    const [pwInputType, setPwInputType] = useState('password')

    const [branchOptions, setBranchOptions] = useState([]);
    const [formData, setFormData] = useState({
        incharge_name: '',
        incharge_mob: '',
        incharge_email: '',
        incharge_password: '',
        incharge_gender: '',
        incharge_doj: '',
        incharge_address: '',
        incharge_photo: null,
        incharge_otherDocuments: null,
        incharge_dob: '',
        incharge_branchId: '',
        incharge_occupation: "", incharge_education: "", incharge_photo: "", incharge_booldG: "", incharge_marritialStatus: "", incharge_personalNo: "",
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
        setFormData({ ...formData, incharge_branchId: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, incharge_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, incharge_marritialStatus: selectedOption.value });
    };
    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB')
        setFormData({ ...formData, incharge_dob: formattedDate });
    };
    const handleDojChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy" format
        setFormData({ ...formData, incharge_doj: formattedDate });
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

        const form = new FormData();


        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {

            const selectedBranch = branchOptions.find((option) => option.value === formData.incharge_branchId);
            formData.incharge_branchId = selectedBranch ? selectedBranch.label : '';
            console.log(selectedBranch)


            const response = await axios.post('http://snmsangli.com/api/incharge/new_incharge', form, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            if (response.status < 400) {
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        incharge created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create incharge. Please try again later.
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
            <h4 className="text-lg font-semibold mb-2">incharge Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the incharge</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="incharge_name">Full name of incharge</label>
                    <Input
                        type="text"
                        name="incharge_name"
                        value={formData.incharge_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_mob">phone </label>
                    <Input
                        type="text"
                        name="incharge_mob"
                        value={formData.incharge_mob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_personalNo">personal number </label>
                    <Input
                        type="text"
                        name="incharge_personalNo"
                        value={formData.incharge_personalNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_email">Email</label>
                    <Input
                        type="text"
                        name="incharge_email"
                        value={formData.incharge_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_password">Create Password</label>
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        name="incharge_password"
                        value={formData.incharge_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_gender">Gender</label>

                    <Select handleGenderChange
                        name="incharge_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.incharge_gender)}


                    />

                </div>
                <div className="form-group">
                    <label htmlFor="incharge_dob">Date of Birth</label>
                    <DatePicker
                        value={formData.incharge_dob}
                        onChange={handleDateChange} 
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_doj">Date of Order</label>
                    <DatePicker
                        value={formData.incharge_doj}
                        onChange={handleDojChange} 
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_marritialStatus">Marital Status</label>


                    <Select
                        name="incharge_marritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.incharge_marritialStatus)}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="incharge_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="incharge_photo"
                        onChange={handleChange}
                        multiple={true} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_otherDocuments">Upload Other Documents</label>
                    <Input
                        type="file"
                        name="incharge_otherDocuments"
                        onChange={handleChange}
                        multiple={true} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="incharge_address">Address</label>
                    <Input
                        type="text"
                        name="incharge_address"
                        value={formData.incharge_address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="incharge_booldG">Blood Group</label>
                    <Input
                        type="text"
                        name="incharge_booldG"
                        value={formData.incharge_booldG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incharge_occupation">Occupation</label>
                    <Input
                        type="text"
                        name="incharge_occupation"
                        value={formData.incharge_occupation}
                        onChange={handleChange}
                    />
                </div>  <div className="form-group">
                    <label htmlFor="incharge_education">Education</label>
                    <Input
                        type="text"
                        name="incharge_education"
                        value={formData.incharge_education}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="incharge_branchId">Branch Name</label>
                    <Select
                        type="text"
                        name="incharge_branchId"
                        // value={formData.incharge_branchId}
                        options={branchOptions}
                        onChange={handleBranchChange}
                        value={branchOptions.find((option) => option.value === formData.incharge_branchId)}

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

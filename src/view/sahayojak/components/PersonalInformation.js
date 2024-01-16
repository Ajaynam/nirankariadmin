
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, DatePicker, Input, Notification, Select, Toast } from '../../../components/ui';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'

const PersonalInformation = () => {
    const [pwInputType, setPwInputType] = useState('password')


    const [branchOptions, setBranchOptions] = useState([]);
    const [formData, setFormData] = useState({
        sahayojak_name: '',
        sahayojak_mob: '',
        sahayojak_email: '',
        sahayojak_password: '',
        sahayojak_gender: '',
        sahayojak_doj: '',
        sahayojak_address: '',
        sahayojak_photo: null,
        sahayojak_otherDocuments: null,
        sahayojak_dob: '',
        sahayojak_branchId: '',
        sahayojak_occupation: "", sahayojak_education: "", sahayojak_photo: "", sahayojak_booldG: "", sahayojak_marritialStatus: "", sahayojak_personalNo: "",
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
        setFormData({ ...formData, sahayojak_branchId: selectedOption.value });
    };
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, sahayojak_gender: selectedOption.value });
    };
    const handleMarriedChange = (selectedOption) => {
        setFormData({ ...formData, sahayojak_marritialStatus: selectedOption.value });
    };
    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB')
        setFormData({ ...formData, sahayojak_dob: formattedDate });
    };
    const handleDojChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB'); // "dd/mm/yyyy" format
        setFormData({ ...formData, sahayojak_doj: formattedDate });
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

            const selectedBranch = branchOptions.find((option) => option.value === formData.sahayojak_branchId);
            formData.sahayojak_branchId = selectedBranch ? selectedBranch.label : '';
            console.log(selectedBranch)


            const response = await axios.post('http://snmsangli.com/api/sahayojaks/new_sahayojaks', form, {
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
            <h4 className="text-lg font-semibold mb-2">sahayojak Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the sahayojak</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="sahayojak_name">Full name of sahayojak</label>
                    <Input
                        type="text"
                        name="sahayojak_name"
                        value={formData.sahayojak_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_mob">phone </label>
                    <Input
                        type="text"
                        name="sahayojak_mob"
                        value={formData.sahayojak_mob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_personalNo">personal number </label>
                    <Input
                        type="text"
                        name="sahayojak_personalNo"
                        value={formData.sahayojak_personalNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_email">Email</label>
                    <Input
                        type="text"
                        name="sahayojak_email"
                        value={formData.sahayojak_email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_password">Create Password</label>
                    <Input
                        type={pwInputType}
                        suffix={inputIcon}
                        placeholder="Password"
                        name="sahayojak_password"
                        value={formData.sahayojak_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_gender">Gender</label>

                    <Select handleGenderChange
                        name="sahayojak_gender"
                        options={genderOption}
                        onChange={handleGenderChange}
                        value={genderOption.find(option => option.value === formData.sahayojak_gender)}


                    />

                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_dob">Date of Birth</label>
                    <DatePicker
                        value={formData.sahayojak_dob}
                        onChange={handleDateChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_doj">Date of Order</label>
                    <DatePicker
                        value={formData.sahayojak_doj}
                        onChange={handleDojChange} // Add the onChange event
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_marritialStatus">Marital Status</label>


                    <Select
                        name="sahayojak_marritialStatus"
                        options={marritialStatusOption}
                        onChange={handleMarriedChange}
                        value={marritialStatusOption.find(option => option.value === formData.sahayojak_marritialStatus)}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="sahayojak_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="sahayojak_photo"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_otherDocuments">Upload Other Documents</label>
                    <Input
                        type="file"
                        name="sahayojak_otherDocuments"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sahayojak_address">Address</label>
                    <Input
                        type="text"
                        name="sahayojak_address"
                        value={formData.sahayojak_address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sahayojak_booldG">Blood Group</label>
                    <Input
                        type="text"
                        name="sahayojak_booldG"
                        value={formData.sahayojak_booldG}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sahayojak_occupation">Occupation</label>
                    <Input
                        type="text"
                        name="sahayojak_occupation"
                        value={formData.sahayojak_occupation}
                        onChange={handleChange}
                    />
                </div>  <div className="form-group">
                    <label htmlFor="sahayojak_education">Education</label>
                    <Input
                        type="text"
                        name="sahayojak_education"
                        value={formData.sahayojak_education}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="sahayojak_branchId">Branch Name</label>
                    <Select
                        type="text"
                        name="sahayojak_branchId"
                        // value={formData.sahayojak_branchId}
                        options={branchOptions}
                        onChange={handleBranchChange}
                        value={branchOptions.find((option) => option.value === formData.sahayojak_branchId)}

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

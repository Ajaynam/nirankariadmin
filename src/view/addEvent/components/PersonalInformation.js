


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import dayjs from 'dayjs';

import './PersonalInformation.css'; // Import the CSS file
import { Button, DatePicker, Input, Notification, Select, Toast } from '../../../components/ui';

const PersonalInformation = () => {

    const [branchOptions, setBranchOptions] = useState([]);

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

    const handleSubmit = async (values) => {
        try {

            const selectedBranch = branchOptions.find((option) => option.value === values.event_branch);
            values.event_branch = selectedBranch ? selectedBranch.value : '';
            console.log(values.event_branch)

            const response = await axios.post('http://snmsangli.com/api/event/new_event', values);

            if (response.status < 400) {
                console.log(response);
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        Event created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create an event. Please try again later.
                    </Notification>
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        event_name: Yup.string().required('Event name is required'),
        event_date: Yup.string().matches(
            /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[0-2])[-][0-9]{4}$/,
            'Date should be in DD/MM/YYYY format'
        ),
        event_purpuse: Yup.string().required('Event purpuse is required'),
        event_description: Yup.string().required('Event description is required'),
        event_branch: Yup.number().required('Event branch is required'),
    });

    const formik = useFormik({
        initialValues: {
            event_name: '',
            event_date: '',
            event_purpuse: '',
            event_description: '',
            event_branch: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });



    return (
        <div className="form-container">
            <h4 className="text-lg font-semibold mb-2">Event Information</h4>
            <p className="text-gray-500 mb-6">Basic information for creating an event</p>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                    <label htmlFor="event_name">Name of event</label>
                    <Input
                        type="text"
                        name="event_name"
                        value={formik.values.event_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.event_name && formik.errors.event_name && (
                        <div className="error text-red-400">{formik.errors.event_name}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="event_date">Date of event</label>
                    <DatePicker
                        value={formik.values.event_date}
                        onChange={(date) => {
                            formik.setFieldValue('event_date', dayjs(date).format('DD-MM-YYYY'));
                        }}
                        dateFormatter="DD-MM-YYYY"
                        yearLabelFormat="YYYY"
                    />
                    {formik.touched.event_date && formik.errors.event_date && (
                        <div className="error text-red-400">{formik.errors.event_date}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="event_purpuse">Purpose</label>
                    <Input
                        type="text"
                        name="event_purpuse"
                        value={formik.values.event_purpuse}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.event_purpuse && formik.errors.event_purpuse && (
                        <div className="error text-red-400">{formik.errors.event_purpuse}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="event_description">Description</label>
                    <Input
                        type="text"
                        name="event_description"
                        value={formik.values.event_description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.event_description && formik.errors.event_description && (
                        <div className="error text-red-400">{formik.errors.event_description}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="event_branch">Unit</label>
                 
                    <Select
                        name="event_branch"
                        options={branchOptions}
                        onChange={(selectedOption) => {
                            formik.setFieldValue("event_branch", selectedOption.value);
                        }}
                        value={branchOptions.find((option) => option.value === formik.values.event_branch)}
                    />
                    {formik.touched.event_branch && formik.errors.event_branch && (
                        <div className="error text-red-400">{formik.errors.event_branch}</div>
                    )}
                </div>


                <div className="mt-6">
                    <Button variant="solid" className="" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? 'Submitting...' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;

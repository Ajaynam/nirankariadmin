


import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import './PersonalInformation.css'; // Import the CSS file
// import {  } from '../../../components/ui';
import { Button , Input, Notification,  Toast} from '../../../../components/ui';

const PersonalInformation = () => {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://snmsangli.com/api/unit/new_unit', values);

            if (response.status < 400) {
                console.log(response);
                Toast.push(
                    <Notification title="Details Updated" type="success">
                        Unit created successfully.
                    </Notification>
                );
            } else {
                Toast.push(
                    <Notification title="Update Failed" type="danger">
                        Unable to create an unit. Please try again later.
                    </Notification>
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        unit_name: Yup.string().required('Unit name is required'),
        unit_number: Yup.string().required('Unit number is required'),
    });

    const formik = useFormik({
        initialValues: {
            unit_name: '',
            unit_number: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

   
    return (
        <div className="form-container">
            <h4 className="text-lg font-semibold mb-2">Unit Information</h4>
            <p className="text-gray-500 mb-6">Basic information for creating an unit</p>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                    <label htmlFor="unit_name">Unit name</label>
                    <Input
                        type="text"
                        name="unit_name"
                        value={formik.values.unit_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.unit_name && formik.errors.unit_name && (
                        <div className="error text-red-400">{formik.errors.unit_name}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="unit_number">Unit number</label>
                    <Input
                        type="text"
                        name="unit_number"
                        value={formik.values.unit_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.unit_number && formik.errors.unit_number && (
                        <div className="error text-red-400">{formik.errors.unit_number}</div>
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

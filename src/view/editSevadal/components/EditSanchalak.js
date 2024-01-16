// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { updateEmployee } from '../store/dataSlice';

// const EditEmployee = () => {
//     const { employeeId } = useParams(); // Get the employeeId from the URL
//     const dispatch = useDispatch();
//     const employee = useSelector((state) => {
//         // Replace with your selector to get the employee by ID
//         return state.adminEmployeeList.data.employeeList.find(e => e.id === Number(employeeId));
//     });

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         address: '',
//     });

//     useEffect(() => {
//         // Populate the form with the employee data if available
//         if (employee) {
//             setFormData({
//                 name: employee.chet_san_name,
//                 email: employee.chet_san_email,
//                 mobile: employee.chet_san_mob,
//                 address: employee.chet_san_address,
//             });
//         }
//     }, [employee]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = () => {
//         // Dispatch an action to update the employee data
//         dispatch(updateEmployee({ id: employeeId, ...formData }));
//     };

//     return (
//         <div className='border '> 
//             <h2 className='text-lg'>Edit Employee</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="text"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Mobile:</label>
//                     <input
//                         type="text"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Address:</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit">Save</button>
//             </form>
//         </div>
//     );
// };

// export default EditEmployee;



// import {
//     Input,
//     Button,
//     FormItem,
//     FormContainer,
//     Notification,
//     Toast,
//     Card,
//     Select
// } from '../../../components/ui'
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { Field, Form, Formik } from 'formik'
// import * as Yup from 'yup'
// import { PasswordInput } from '../../../components/shared'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// // import { addEmployee } from '../store/dataSlice'
// import ProductImages from '../../ProductForm/ProductImages'

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name Required'),
//     email: Yup.string().email('Invalid email'),
//     mobile: Yup.string().required('Please enter your phone number'),
//     state: Yup.string().required('Please enter your state'),
//     block: Yup.string().required('Please enter your block'),
//     district: Yup.string().required('Please enter your district'),
//     target: Yup.number().required('Monthly target is required'),
//     village: Yup.string(),
//     password: Yup.string().required('Please enter your password'),
//     image: Yup.string(),
//     cpassword: Yup.string().oneOf(
//         [Yup.ref('password'), null],
//         'Your passwords do not match'
//     ).required('Password required'),
// })

// const data = {
//     name: '',
//     email: '',
//     password: '',
//     cpassword: '',
//     state: '',
//     district: '',
//     mobile: '',
//     village: '',
//     block: '',
//     image: '',
//     target: ''
// }

// const PersonalInformation = () => {
//     const { employeeId } = useParams();
//     const employee = useSelector((state) => {
//         // Replace with your selector to get the employee by ID
//         return state.adminEmployeeList.data.employeeList.find(e => e.id === Number(employeeId));
//     });

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         address: '',
//     });
//     useEffect(() => {
//         //         // Populate the form with the employee data if available
//         if (employee) {
//             setFormData({
//                 name: employee.chet_san_name,
//                 email: employee.chet_san_email,
//                 mobile: employee.chet_san_mob,
//                 address: employee.chet_san_address,
//             });
//         }
//     }, [employee]);
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     return (
//         <>
//             <Formik
//                 initialValues={formData}  // Use formData to pre-fill the form
//                 enableReinitialize={true}
//                 validationSchema={validationSchema}
//                 onSubmit={async (values, { setSubmitting }) => {
//                     // Your form submission logic
//                     try {
//                         setSubmitting(true);

//                         // Make an API request to update the employee data
//                         const response = await fetch(`http://localhost:7000/chet_sanch/update_che_sach/${employeeId}`, {
//                             method: 'PUT',  // Use the appropriate HTTP method (PUT or POST) for updating data
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(values), // Send the form data as JSON
//                         });

//                         if (response.status >= 200 && response.status < 300) {
//                             // Request was successful, you can show a success message here
//                             Toast.push('Employee data updated successfully');
//                         } else {
//                             // Request failed, you can show an error message here
//                             Toast.push('Failed to update employee data');
//                         }
//                     } catch (error) {
//                         // Handle any exceptions or errors that may occur during the API request
//                         console.error('API request error:', error);
//                         Toast.push('An error occurred while updating employee data');
//                     } finally {
//                         setSubmitting(false);
//                     }

//                 }}
//             >
//                 {({ touched, errors, isSubmitting, values, type, setFieldValue }) => {
//                     return (
//                         <Form>
//                             <FormContainer>
//                                 {/* ... other form elements ... */}
//                                 <div className="md:grid grid-cols-2 gap-4">
//                                     <FormItem
//                                         label="Full name of sanchalak"
//                                         invalid={errors.name && touched.name}
//                                         errorMessage={errors.name}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="name"
//                                             placeholder="Full name"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="emai"
//                                         invalid={errors.email && touched.email}
//                                         errorMessage={errors.email}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="email"
//                                             placeholder="emai"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                     <FormItem
//                                         label="Mobile"
//                                         invalid={errors.mobile && touched.mobile}
//                                         errorMessage={errors.mobile}
//                                     >
//                                         <Field
//                                             type="text"
//                                             autoComplete="off"
//                                             name="mobile"
//                                             placeholder="Mobile"
//                                             component={Input}
//                                         />
//                                     </FormItem>
//                                 </div>
//                                 <div className="flex justify-end gap-2 mt-4">
//                                     <Button
//                                         loading={isSubmitting}
//                                         variant="solid"
//                                         type="submit"
//                                     >
//                                         {isSubmitting ? 'Please wait' : 'Save'}
//                                     </Button>
//                                 </div>
//                                 {/* ... other form elements ... */}
//                             </FormContainer>
//                         </Form>
//                     )
//                 }}
//             </Formik>

//         </>
//     )
// }

// export default PersonalInformation


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Notification, Toast, Select } from '../../../components/ui';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateEmployeeDetails } from '../store/dataSlice';

const PersonalInformation = () => {
    const { employeeId } = useParams();
 
    const employee = useSelector((state) => {
        return state.adminEmployeeList.data.employeeList.find((e) => e.id === Number(employeeId));
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        branchId: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.chet_san_name,
                email: employee.chet_san_email,
                mobile: employee.chet_san_mob,
                address: employee.chet_san_address,
                branchId: employee.chet_san_branchId,
            });
        }
    }, [employee]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedEmployeeData = {
                id: employeeId,
                chet_san_name: formData.name,
                chet_san_email: formData.email,
                chet_san_mob: formData.mobile,
                chet_san_address: formData.address,
                chet_san_branchId: formData.branchId,
            };

            await dispatch(updateEmployeeDetails(updatedEmployeeData));

            setIsEditing(false);
            Toast.push(
                <Notification title="Details Updated" type="success">
                    Employee details have been updated successfully.
                </Notification>
            );
        } catch (error) {
            console.error('Error updating employee details:', error);
            Toast.push(
                <Notification title="Update Failed" type="danger">
                    Unable to update employee details. Please try again later.
                </Notification>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">Sanchalak Information</h4>
                <p className="text-gray-500">Basic information for the sanchalak</p>
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
                <label htmlFor="branchId" className="block font-medium mb-1">
                    Branch ID:
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


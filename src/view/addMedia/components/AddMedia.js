
import React, { useState } from 'react';
import axios from 'axios';
import './PersonalInformation.css'; // Import the CSS file
import { Button, Input, Notification, Select, Toast } from '../../../components/ui';

const AddMedia = () => {
    const [formData, setFormData] = useState({
        media_title: '',
        media_description: '',
        media_photo: null,
        media_video: null,
    });

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


    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);
        // Create a FormData object to handle file uploads
        const form = new FormData();


        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://snmsangli.com/api/media/new_media', form, {
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
            <h4 className="text-lg font-semibold mb-2">media Information</h4>
            <p className="text-gray-500 mb-6">Basic information for the media</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className="form-group">
                    <label htmlFor="media_title">Tile</label>
                    <Input
                        type="text"
                        name="media_title"
                        value={formData.media_title}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="media_description">Description </label>
                    <Input
                        type="text"
                        name="media_description"
                        value={formData.media_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="media_photo">Upload Photo</label>
                    <Input
                        type="file"
                        name="media_photo"
                        multiple={true}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="media_video">upload video</label>
                    <Input
                        type="file"
                        name="media_video"
                        onChange={handleChange}
                        multiple={true} // Allow multiple file selection

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

export default AddMedia;

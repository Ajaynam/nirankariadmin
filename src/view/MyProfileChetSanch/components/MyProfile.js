// UserProfile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../store/auth/userSlice';
import {apiSignInRequest} from '../../../services/AuthService';


const MyProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
          const authToken = apiSignInRequest.getAuthToken(); // Replace with your actual method to get the auth token
          const response = await fetch('http://snmsangli.com/api/get_chet_sanch_profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data)); // Dispatch the user data to Redux store
        } else {
          console.error('Error fetching profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, [dispatch, userId]);

  const user = useSelector((state) => state.auth);

  if (!user._id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      {/* Render profile data here */}
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add other profile fields as needed */}
      </div>
    </div>
  );
};

export default MyProfile;

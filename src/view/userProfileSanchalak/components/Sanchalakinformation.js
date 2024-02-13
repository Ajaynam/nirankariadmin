
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from '../store/dataSlice';

const Sanchalakinformation = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  console.log('ID from URL:', userId)

  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.adminuserinformation.data.user);
  const loading = useSelector((state) => state.adminuserinformation.loading);
  console.log(user)

 

  if (!user) {
    return (
      <div className=" p-10 mx-auto">
        <p>User information not found.</p>
      </div>
    );
  }
  if (user)
   {
    return (
     

      <div className="border">
      <div><h4 className='px-8 py-2 '>{user.role} information</h4></div>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className=" w-6/12 border md:mx-2">
            <div className="bg-white  p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
              <img
                  className="h-auto w-28 mx-auto"
                  src={`data:image/png;base64,${user.sanchalak_photo}`}
                  alt=""
                />
              
              </div>
              <h1 className="text-gray-900 font-bold text-xl text-center leading-8 my-1">{user.sanchalak_name}</h1>
            
              <ul className="bg-gray-100 text-gray-800  py-2 px-3 mt-3  rounded shadow-sm">
                
                <li className=" text-center py-1">
                  <p>Member since</p>
                  <span className="ml-6">{user.sanchalak_doj}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className=" w-full  border mx-2 ">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-blue-500">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">User name</div>
                    <div className="px-4 py-2">{user.username}</div>
                  </div>
                 
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{user.sanchalak_gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Date of Birth</div>
                    <div className="px-4 py-2">{user.sanchalak_dob}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Marritial Status</div>
                    <div className="px-4 py-2">{user.sanchalak_marritialStatus}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Personal No.</div>
                    <div className="px-4 py-2">{user.sanchalak_personalNo}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{user.sanchalak_mob}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Current Address</div>
                    <div className="px-4 py-2">{user.sanchalak_address}</div>
                  </div>
                 
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href={`mailto:${user.sanchalak_email}`}>
                       {user.sanchalak_email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Blood Group</div>
                    <div className="px-4 py-2">{user.sanchalak_booldG}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Education</div>
                    <div className="px-4 py-2">{user.sanchalak_education}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Occupation</div>
                    <div className="px-4 py-2">{user.sanchalak_occupation}</div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
   }
    else{
        return <div>user not found....</div>
    }
};

export default Sanchalakinformation;


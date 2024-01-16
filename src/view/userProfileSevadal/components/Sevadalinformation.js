
// Userinformation.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from '../store/dataSlice';

const Sevadalinformation = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  // console.log('ID from URL:', userId)
  const [showDatesTable, setShowDatesTable] = useState(false);

  // Toggle function to show/hide the dates table
  const toggleDatesTable = () => {
    setShowDatesTable(!showDatesTable);
  };

  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.adminuserinformation.data.user);

  console.log(user)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-IN', options);
    return formattedDate;
  };

  if (!user) {
    return (
      <div className=" p-10 mx-auto">
        <p>User information not found.</p>
      </div>
    );
  }
  if (user) {
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
                    src={`http://snmsangli.com/api/uploads/${encodeURIComponent(user.sevadal_photo)}`}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl text-center leading-8 my-1">{user.sevadal_name}</h1>

                <ul className="bg-gray-100 text-gray-800  py-2 px-3 mt-3  rounded shadow-sm">

                  <li className=" text-center py-1">
                    <p>Member since</p>
                    <span className="ml-6">{user.sevadal_doj}</span>
                  </li>
                </ul>

              </div>

            </div>

            {/* user info */}

            <div className=" w-full   mx-2 ">
              <div className="bg-white p-3 border shadow-sm rounded-sm">
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
                      <div className="px-4 py-2 font-semibold">Sevadal Type</div>
                      <div className="px-4 py-2">{user.sevadal_type}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Designation</div>
                      <div className="px-4 py-2">{user.sevadal_designation}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Date of Birth</div>
                      <div className="px-4 py-2">{user.sevadal_dob}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Marritial Status</div>
                      <div className="px-4 py-2">{user.sevadal_marritialStatus}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Personal No.</div>
                      <div className="px-4 py-2">{user.sevadal_personalNo}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{user.sevadal_mob}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Current Address</div>
                      <div className="px-4 py-2">{user.sevadal_address}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href={`mailto:${user.sevadal_email}`}>
                          {user.sevadal_email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Blood Group</div>
                      <div className="px-4 py-2">{user.sevadal_booldG}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Education</div>
                      <div className="px-4 py-2">{user.sevadal_education}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Occupation</div>
                      <div className="px-4 py-2">{user.sevadal_occupation}</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* attandacne */}

        <div className=' w-4/12 mx-4 text-gray-700  border'>
          {/* <div><h6 className='mx-4'>attandacne in this month</h6></div> */}
          <div className=' mx-2' >
            <div className=" flex">
              <div className="px-4 py-2 font-semibold">Total Present in this month :</div>
              <div className="px-4 py-2">{user.totalPresent}</div>
            </div>
            <div className="grid grid-cols-2 ">
              <div className="px-4 py-2 font-semibold">Attendance Dates</div>
              <div className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleDatesTable}
                >
                  {showDatesTable ? 'Hide Dates' : 'Show Dates'}
                </button>
                {showDatesTable && (
                  <table className="border-collapse w-full mt-2">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.attendanceDates.map((date, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatDate(date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
  else {
    return <div>user not found....</div>
  }
};

export default Sevadalinformation;


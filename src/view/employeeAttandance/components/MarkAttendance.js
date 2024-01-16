import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarkAttendance() {
  const [attendanceData, setAttendanceData] = useState(new Map());
  const [employees, setEmployees] = useState([]);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('/employeeData.json');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const updateAttendance = (day, employeeId, value) => {
    const updatedData = new Map(attendanceData);
    if (!updatedData.has(employeeId)) {
      updatedData.set(employeeId, Array(30).fill(''));
    }
    const attendanceArray = updatedData.get(employeeId);
    attendanceArray[day] = value;
    updatedData.set(employeeId, attendanceArray);
    setAttendanceData(updatedData);
  };

  const getAttendanceSymbol = (status) => {
    if (status === 'present') {
      return <span className="text-green-500">&#10004;</span>;
    } else if (status === 'absent') {
      return <span className="text-red-500">&#10008;</span>;
    } else {
      return ''; // Empty cell
    }
  };

  const submitAttendance = (employeeId) => {
    const employeeAttendance = attendanceData.get(employeeId);
    console.log(`Submitted attendance for Employee ${employeeId}:`, employeeAttendance);
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 p-2">Employee</th>
            {Array.from({ length: 30 }, (_, day) => (
              <th key={day + 1} className="bg-gray-200 p-2">
                {day + 1}
              </th>
            ))}
            <th className="bg-gray-200 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="p-2">{employee.name}</td>
              {Array.from({ length: 30 }, (_, day) => (
                <td key={day} className="p-2">
                  <select
                    value={(attendanceData.get(employee.id) || [])[day] || ''}
                    onChange={(e) => updateAttendance(day, employee.id, e.target.value)}
                    disabled={day + 1 !== currentDay}
                    className="block w-full border rounded px-2 py-1"
                  >
                    <option value="">Select</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                  {getAttendanceSymbol((attendanceData.get(employee.id) || [])[day])}
                </td>
              ))}
              <td className="p-2">
                <button
                  onClick={() => submitAttendance(employee.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkAttendance;

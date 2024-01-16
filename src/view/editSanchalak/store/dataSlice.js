// // employeeDataSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Create an async thunk to update employee data
// export const updateEmployee = createAsyncThunk('employee/update', async (employeeData) => {
//   try {
//     // Replace this with your API call to update employee data
//     const response = await fetch(`/update_che_sach/${employeeData.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(employeeData),
//     });
//     const updatedEmployee = await response.json();
//     return updatedEmployee;
//   } catch (error) {
//     throw error;
//   }
// });

// const employeeDataSlice = createSlice({
//   name: 'updateSanchalakData',
//   initialState: {
//     loading: false,
//     error: null,
//     data: [], // Define employeeList in the initial state
//   },
 
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateEmployee.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(updateEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Export the async thunk
// // export { updateEmployee };

// export default employeeDataSlice.reducer;

// employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUpdateEmployeeDetails } from '../../../services/EmployeeService'; // Import your API function for updating employee details

// Create an async thunk for updating employee details
export const updateEmployeeDetails = createAsyncThunk(
  'employee/updateDetails',
  async (employeeData) => {
    try {
      const response = await apiUpdateEmployeeDetails(employeeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the initial state
const initialState = {
  updating: false,
  error: null,
};

// Create the employee slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeDetails.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateEmployeeDetails.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateEmployeeDetails.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;

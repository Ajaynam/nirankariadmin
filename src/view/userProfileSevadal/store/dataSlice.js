
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSevadalDetailsBySevadalId } from '../../../services/SevadalService';

export const getUserInformation = createAsyncThunk(
  'userInformation/get',
  async (employeeId) => {
    try {
      const response = await apiSevadalDetailsBySevadalId(employeeId);
    console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userInformationSlice = createSlice({
  name: 'userInformation',
  initialState: {
    loading: false,
    user: null,
    attendance: null, 
  },
  reducers: {
  },
  extraReducers: {
    [getUserInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.attendance = action.payload.attendance; // Assuming your API response includes attendance data
console.log(state.attendance)
    },
    [getUserInformation.pending]: (state) => {
      state.loading = true;
    },
    [getUserInformation.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default userInformationSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUpdateInchargeDetails } from '../../../services/InchargeService'; // Import your API function for updating incharge details

// Create an async thunk for updating incharge details
export const updateInchargeDetails = createAsyncThunk(
  'incharge/updateDetails',
  async (inchargeData) => {
    try {
      const response = await apiUpdateInchargeDetails(inchargeData);
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

// Create the incharge slice
const inchargeSlice = createSlice({
  name: 'incharge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateInchargeDetails.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateInchargeDetails.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateInchargeDetails.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default inchargeSlice.reducer;

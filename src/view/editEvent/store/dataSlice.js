

// eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUpdateEventsDetails } from '../../../services/EventsService'; // Import your API function for updating event details

// Create an async thunk for updating event details
export const updateEventDetails = createAsyncThunk(
  'event/updateDetails',
  async (eventData) => {
    try {
      const response = await apiUpdateEventsDetails(eventData);
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

// Create the event slice
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEventDetails.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateEventDetails.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateEventDetails.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;

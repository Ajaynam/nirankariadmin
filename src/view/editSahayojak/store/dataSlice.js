// // sahayojakDataSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Create an async thunk to update sahayojak data
// export const updateSahayojak = createAsyncThunk('sahayojak/update', async (sahayojakData) => {
//   try {
//     // Replace this with your API call to update sahayojak data
//     const response = await fetch(`/update_che_sach/${sahayojakData.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(sahayojakData),
//     });
//     const updatedSahayojak = await response.json();
//     return updatedSahayojak;
//   } catch (error) {
//     throw error;
//   }
// });

// const sahayojakDataSlice = createSlice({
//   name: 'updateSanchalakData',
//   initialState: {
//     loading: false,
//     error: null,
//     data: [], // Define sahayojakList in the initial state
//   },
 
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateSahayojak.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateSahayojak.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(updateSahayojak.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Export the async thunk
// // export { updateSahayojak };

// export default sahayojakDataSlice.reducer;

// sahayojakSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUpdateSahayojakDetails } from '../../../services/SahayokakService'; // Import your API function for updating sahayojak details

// Create an async thunk for updating sahayojak details
export const updateSahayojakDetails = createAsyncThunk(
  'sahayojak/updateDetails',
  async (sahayojakData) => {
    try {
      const response = await apiUpdateSahayojakDetails(sahayojakData);
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

// Create the sahayojak slice
const sahayojakSlice = createSlice({
  name: 'sahayojak',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSahayojakDetails.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSahayojakDetails.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateSahayojakDetails.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default sahayojakSlice.reducer;

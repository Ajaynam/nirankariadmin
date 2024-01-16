
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSahayojakDetailsBySahayojakId } from '../../../services/SahayokakService';

export const getUserInformation = createAsyncThunk(
  'userInformation/get',
  async (employeeId) => {
    try {
      const response = await apiSahayojakDetailsBySahayojakId(employeeId);
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
  },
  reducers: {
  },
  extraReducers: {
    [getUserInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
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

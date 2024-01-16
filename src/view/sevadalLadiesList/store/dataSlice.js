import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllSevadalList ,apiDeleteSevadal} from '../../../services/SevadalService'


export const getSevadal = createAsyncThunk(
    'sevadal/data/get',
    async (data) => {
        try {
            const response = await apiAllSevadalList(data)
            console.log(response.data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteSevadal = createAsyncThunk(
    'sevadal/data/delete',
    async (sevadalId) => {
      try {
        // Call the delete API function to delete the sevadal
        await apiDeleteSevadal(sevadalId);
        return sevadalId; // Return the deleted sevadal's ID
      } catch (error) {
        throw error;
      }
    }
  );


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}


export const initialFilterData = {
    status: ''
}

const dataSlice = createSlice({
    name: 'sevadal/data',
    initialState: {
        loading: false,
        sevadalList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {

        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [deleteSevadal.fulfilled]: (state, action) => {
            // Remove the deleted sevadal from the state
            state.sevadalList = state.sevadalList.filter((sevadal) => sevadal.id !== action.payload);
          },

       
        [getSevadal.fulfilled]: (state, action) => {
            state.loading = false;
            state.sevadalList = action.payload?.data || [];
            
            state.sevadalList = state.sevadalList.filter((sevadal) => sevadal.sevadal_type === 'Ladies');
            console.log( state.sevadalList)
            state.tableData.total = state.sevadalList.length;
        },
        [getSevadal.pending]: (state) => {
            state.loading = true
        },
        [getSevadal.rejected]: (state, action) => {
            state.loading = false
            state.sevadalList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData,  } =
    dataSlice.actions

export default dataSlice.reducer

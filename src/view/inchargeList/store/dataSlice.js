import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllInchargeList ,apiDeleteIncharge} from '../../../services/InchargeService'


export const getIncharge = createAsyncThunk(
    'incharge/data/get',
    async (data) => {
        try {
            const response = await apiAllInchargeList(data)
            console.log(response.data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteIncharge = createAsyncThunk(
    'incharge/data/delete',
    async (inchargeId) => {
      try {
        // Call the delete API function to delete the incharge
        await apiDeleteIncharge(inchargeId);
        return inchargeId; // Return the deleted incharge's ID
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
    name: 'incharge/data',
    initialState: {
        loading: false,
        inchargeList: [],
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

        [deleteIncharge.fulfilled]: (state, action) => {
            // Remove the deleted incharge from the state
            state.inchargeList = state.inchargeList.filter((incharge) => incharge.id !== action.payload);
          },

        [getIncharge.fulfilled]: (state, action) => {
            state.loading = false
            state.inchargeList = action.payload?.data || []
            console.log( state.inchargeList)
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getIncharge.pending]: (state) => {
            state.loading = true
        },
        [getIncharge.rejected]: (state, action) => {
            state.loading = false
            state.inchargeList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData,  } =
    dataSlice.actions

export default dataSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllSahayojakList ,apiDeleteSahayojak} from '../../../services/SahayokakService'


export const getSahayojak = createAsyncThunk(
    'sahayojak/data/get',
    async (data) => {
        try {
            const response = await apiAllSahayojakList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteSahayojak = createAsyncThunk(
    'sahayojak/data/delete',
    async (sahayojakId) => {
      try {
        // Call the delete API function to delete the sahayojak
        await apiDeleteSahayojak(sahayojakId);
        return sahayojakId; // Return the deleted sahayojak's ID
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
    name: 'sahayojak/data',
    initialState: {
        loading: false,
        sahayojakList: [],
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

        [deleteSahayojak.fulfilled]: (state, action) => {
            // Remove the deleted sahayojak from the state
            state.sahayojakList = state.sahayojakList.filter((sahayojak) => sahayojak.id !== action.payload);
          },

        [getSahayojak.fulfilled]: (state, action) => {
            state.loading = false
            state.sahayojakList = action.payload?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getSahayojak.pending]: (state) => {
            state.loading = true
        },
        [getSahayojak.rejected]: (state, action) => {
            state.loading = false
            state.sahayojakList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData,  } =
    dataSlice.actions

export default dataSlice.reducer

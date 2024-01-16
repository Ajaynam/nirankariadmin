import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllUnitsList ,apiDeleteUnits} from '../../../services/UnitService'


export const getUnits = createAsyncThunk(
    'unit/data/get',
    async (data) => {
        try {
            const response = await apiAllUnitsList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteUnits = createAsyncThunk(
    'unit/data/delete',
    async (unitsId) => {
      try {
        // Call the delete API function to delete the units
        await apiDeleteUnits(unitsId);
        return unitsId; // Return the deleted units's ID
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
    name: 'unit/data',
    initialState: {
        loading: false,
        unitsList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        isEmployeeEditDialogOpen: false,
    },
    reducers: {

        setEmployeeEditDialogVisibility: (state, action) => {
            state.isEmployeeEditDialogOpen = action.payload;
          },

        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [deleteUnits.fulfilled]: (state, action) => {
            // Remove the deleted units from the state
            state.unitsList = state.unitsList.filter((units) => units.id !== action.payload);
          },

        [getUnits.fulfilled]: (state, action) => {
            state.loading = false
            state.unitsList = action.payload?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getUnits.pending]: (state) => {
            state.loading = true
        },
        [getUnits.rejected]: (state, action) => {
            state.loading = false
            state.unitsList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData, setEmployeeEditDialogVisibility , } =
    dataSlice.actions

export default dataSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllEventsList ,apiDeleteEvents} from '../../../services/EventsService'


export const getEvents = createAsyncThunk(
    'sevadal-gents/data/get',
    async (data) => {
        try {
            const response = await apiAllEventsList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteEvents = createAsyncThunk(
    'sevadal-gents/data/delete',
    async (eventsId) => {
      try {
        // Call the delete API function to delete the events
        await apiDeleteEvents(eventsId);
        return eventsId; // Return the deleted events's ID
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
    name: 'sevadal-gents/data',
    initialState: {
        loading: false,
        eventsList: [],
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

        [deleteEvents.fulfilled]: (state, action) => {
            // Remove the deleted events from the state
            state.eventsList = state.eventsList.filter((events) => events.id !== action.payload);
          },

        [getEvents.fulfilled]: (state, action) => {
            state.loading = false
            state.eventsList = action.payload?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getEvents.pending]: (state) => {
            state.loading = true
        },
        [getEvents.rejected]: (state, action) => {
            state.loading = false
            state.eventsList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData,  } =
    dataSlice.actions

export default dataSlice.reducer

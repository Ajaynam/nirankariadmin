import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllMediaList ,apiDeleteMedia} from '../../../services/MediaService'


export const getMedia = createAsyncThunk(
    'media/data/get',
    async (data) => {
        try {
            const response = await apiAllMediaList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const deleteMedia = createAsyncThunk(
    'media/data/delete',
    async (mediaId) => {
      try {
        // Call the delete API function to delete the media
        await apiDeleteMedia(mediaId);
        return mediaId; // Return the deleted media's ID
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
    name: 'media/data',
    initialState: {
        loading: false,
        mediaList: [],
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

        [deleteMedia.fulfilled]: (state, action) => {
            // Remove the deleted media from the state
            state.mediaList = state.mediaList.filter((media) => media.id !== action.payload);
          },

        [getMedia.fulfilled]: (state, action) => {
            state.loading = false
            state.mediaList = action.payload?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getMedia.pending]: (state) => {
            state.loading = true
        },
        [getMedia.rejected]: (state, action) => {
            state.loading = false
            state.mediaList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData,  } =
    dataSlice.actions

export default dataSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiChartData } from '../../../services/DashboardService'
// import { apiGetSalesDashboardData } from 'services/SalesService'

export const getSalesDashboardData = createAsyncThunk(
    'salesDashboard/data/getSalesDashboardData',
    async (data) => {
        // const response = await apiGetSalesDashboardData(data)
        const response = { data: '' }
        return response.data
    }
)


// export const getChartData = createAsyncThunk(
//     'dashboard/chart',
//     async (data) => {
//         try {
//             const response = await apiChartData(data)
//             return response
//         } catch (error) {
//             return error?.response || error.toString()
//         }
//     }
// )
export const getChartData = createAsyncThunk(
    'sachalak/chart',
    async (data) => {
        try {
            const response = await apiChartData(data);
           
            return response.data;
            
        } catch (error) {
            return error?.response || error.toString();
        }
    }
);


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'salesDashboard',
    initialState: {
        loading: true,
        dashboardData: {},
        chartData: {},
    },
    reducers: {},
    extraReducers: {

        // [getSalesDashboardData.fulfilled]: (state, action) => {
        //     state.dashboardData = action.payload
        //     state.loading = false
        // },
        // [getSalesDashboardData.pending]: (state) => {
        //     state.loading = true
        // },


        [getChartData.fulfilled]: (state, action) => {
            state.chartData = action.payload; // Store the data in chartData
            // console.log(state.chartData)
            state.loading = false;
            
        },
        [getChartData.pending]: (state) => {
            state.loading = true
        },
    },

    
})

export default dataSlice.reducer

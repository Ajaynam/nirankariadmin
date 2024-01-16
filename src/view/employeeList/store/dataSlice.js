import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAllEmployeeList ,apiDeleteEmployee ,apiEmployeeDetailsByEmployeeId} from '../../../services/EmployeeService'


export const getEmployee = createAsyncThunk(
    'employee/data/get',
    async (data) => {
        try {
            const response = await apiAllEmployeeList(data)
            return response
        } catch (error) {
            return error?.response || error.toString()
        }
    }
)

export const getCustomer = createAsyncThunk(
    'crmCustomerDetails/data/getCustomer',
    async (data) => {
        try{
            const response = await apiEmployeeDetailsByEmployeeId(data)
            return response.data
        }catch (error){
            throw error;

        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employee/data/delete',
    async (employeeId) => {
      try {
        // Call the delete API function to delete the employee
        await apiDeleteEmployee(employeeId);
        return employeeId; // Return the deleted employee's ID
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
    name: 'employee/data',
    initialState: {
        loading: false,
        employeeList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setSelectedEmployee: (state, action) => {
            state.selectedEmployee = action.payload;
          },
   

        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [deleteEmployee.fulfilled]: (state, action) => {
            // Remove the deleted employee from the state
            state.employeeList = state.employeeList.filter((employee) => employee.id !== action.payload);
          },

        [getEmployee.fulfilled]: (state, action) => {
            state.loading = false
            state.employeeList = action.payload?.data || []
            state.tableData.total = action.payload?.data?.total || 0
        },
        [getEmployee.pending]: (state) => {
            state.loading = true
        },
        [getEmployee.rejected]: (state, action) => {
            state.loading = false
            state.employeeList = []
            state.tableData.total = 0
        },
    },
})

export const { setTableData, setFilterData, setSelectedEmployee } =
    dataSlice.actions

export default dataSlice.reducer

import ApiService from "./ApiService";

export async function apiAllEmployeeList(data) {
    return ApiService.fetchData({
        url: '/sanchalak/get_sanchalak',
        method: 'get',
        data
    })
}



export async function apiEmployeeDetailsByEmployeeId(employeeId) {
    return ApiService.fetchData({
        url: `/sanchalak/get_sanchalak/${employeeId}`,
        method: 'get',
        // data:employeeId
    })
}


export async function apiEmployeeRegister(data) {
    return ApiService.fetchData({
        url: '/sanchalak/new_sanchalak',
        method: 'post',
        data
    })
}

export async function apiDeleteEmployee(employeeId) {
    return ApiService.fetchData({
      url: `/sanchalak/remove_sanchalak/${employeeId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateEmployeeDetails(employeeData) {
    return ApiService.fetchData({
      url: `/sanchalak/update_sanchalak/${employeeData.id}`,
      method: 'put',
      data: employeeData,
    });
  }
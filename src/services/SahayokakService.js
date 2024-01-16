import ApiService from "./ApiService";

export async function apiAllSahayojakList(data) {
    return ApiService.fetchData({
        url: '/sahayojaks/get_sahayojaks',
        method: 'get',
        data
    })
}



export async function apiSahayojakDetailsBySahayojakId(employeeId) {
    return ApiService.fetchData({
      url: `/sahayojaks/get_sahayojaks/${employeeId}`,
      method: 'get',
        
    })
}



export async function apiSahayojakRegister(data) {
    return ApiService.fetchData({
        url: '/sahayojaks/new_sahayojaks',
        method: 'post',
        data
    })
}

export async function apiDeleteSahayojak(employeeId) {
    return ApiService.fetchData({
      url: `/sahayojaks/remove_sahayojaks/${employeeId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateSahayojakDetails(employeeData) {
    return ApiService.fetchData({
      url: `/sahayojaks/update_sahayojaks/${employeeData.id}`,
      method: 'put',
      data: employeeData,
    });
  }